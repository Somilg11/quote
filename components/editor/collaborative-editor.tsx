"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import LinkExtension from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Collaboration from "@tiptap/extension-collaboration";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Image } from "@tiptap/extension-image";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote as QuoteIcon,
  Redo2,
  Strikethrough,
  Table as TableIcon,
  Underline as UnderlineIcon,
  Undo2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { SlashCommandMenu } from "./slash-command-menu";
import { useCollab } from "./use-collab";
import { CollabStatusBar } from "./collab-status";
import { EditorSkeleton } from "./editor-skeleton";

interface CollaborativeEditorProps {
  pageId: string;
  /** HTML stored on the page row, used to seed an empty collaborative document. */
  initialContent?: string;
  initialVersion?: number;
  onContentChange?: (content: string) => void;
}

/** Autosave delay for the HTML mirror kept on `Page.content`. */
const HTML_SAVE_DEBOUNCE_MS = 1500;

export function CollaborativeEditor({
  pageId,
  initialContent = "",
  initialVersion = 0,
  onContentChange,
}: CollaborativeEditorProps) {
  const { doc, status, peers, ready, remoteVersion } = useCollab({ pageId, initialVersion });

  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState<{
    x: number;
    top?: number;
    bottom?: number;
  }>({ x: 0 });

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seededRef = useRef(false);
  const knownVersionRef = useRef(initialVersion);
  const [externalChange, setExternalChange] = useState(false);

  const editor = useEditor(
    {
      extensions: [
        // History lives in the Yjs document, so StarterKit's own must be off.
        StarterKit.configure({ link: false, underline: false, undoRedo: false }),
        Collaboration.configure({ document: doc }),
        Placeholder.configure({ placeholder: "Write, or press '/' for commands…" }),
        LinkExtension.configure({ openOnClick: false, autolink: true }),
        Underline,
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
        Image.configure({ inline: false, allowBase64: true }),
      ],
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: "focus:outline-none",
          spellcheck: "true",
        },
      },
      onUpdate: ({ editor }) => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = setTimeout(() => {
          onContentChange?.(editor.getHTML());
        }, HTML_SAVE_DEBOUNCE_MS);
      },
    },
    [doc]
  );

  /**
   * Seed the collaborative document from the stored HTML exactly once, and only
   * when the server confirmed it has no state for this page. Without both checks
   * a second client would duplicate the content.
   */
  useEffect(() => {
    if (!editor || !ready || seededRef.current) return;
    if (status !== "synced") return;
    if (!initialContent.trim()) {
      seededRef.current = true;
      return;
    }

    const fragment = doc.getXmlFragment("default");
    if (fragment.length > 0 || peers.length > 0) {
      seededRef.current = true;
      return;
    }

    seededRef.current = true;
    editor.commands.setContent(initialContent, { emitUpdate: true });
  }, [editor, ready, status, initialContent, doc, peers.length]);

  // A write from the API or MCP bumps the version; offer to pull it in rather
  // than silently overwriting what the person is typing.
  useEffect(() => {
    if (remoteVersion > knownVersionRef.current) setExternalChange(true);
  }, [remoteVersion]);

  const loadExternalChanges = useCallback(async () => {
    if (!editor) return;
    try {
      const response = await fetch(`/api/pages/${pageId}`);
      const data = await response.json();
      if (data.page?.content) {
        editor.commands.setContent(data.page.content, { emitUpdate: true });
        knownVersionRef.current = data.page.version ?? remoteVersion;
        setExternalChange(false);
        toast.success("Loaded changes made outside the editor");
      }
    } catch {
      toast.error("Could not load the latest version");
    }
  }, [editor, pageId, remoteVersion]);

  // Flush the HTML mirror when the editor goes away mid-edit.
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        if (editor) onContentChange?.(editor.getHTML());
      }
    };
  }, [editor, onContentChange]);

  // Track the "/" trigger and place the command menu next to the caret.
  useEffect(() => {
    if (!editor) return;

    const handleTransaction = () => {
      const { state, view } = editor;
      const { from } = state.selection;
      const $from = state.doc.resolve(from);
      const lineText = state.doc.textBetween($from.start($from.depth), from);

      if (lineText.startsWith("/")) {
        const coords = view.coordsAtPos(from);
        const nearBottom = window.innerHeight - coords.bottom < 320;
        setSlashMenuPosition({
          x: coords.left,
          top: nearBottom ? undefined : coords.bottom + 8,
          bottom: nearBottom ? window.innerHeight - coords.top + 8 : undefined,
        });
        setSlashMenuOpen(true);
      } else {
        setSlashMenuOpen(false);
      }
    };

    editor.on("transaction", handleTransaction);
    return () => {
      editor.off("transaction", handleTransaction);
    };
  }, [editor]);

  const promptForLink = useCallback(() => {
    if (!editor) return;
    const previous = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  const promptForImage = useCallback(() => {
    if (!editor) return;
    const url = window.prompt("Image URL");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const groups = editor
    ? [
        [
          { label: "Undo", hint: "⌘Z", icon: Undo2, onClick: () => editor.chain().focus().undo().run() },
          { label: "Redo", hint: "⇧⌘Z", icon: Redo2, onClick: () => editor.chain().focus().redo().run() },
        ],
        [
          { label: "Text", icon: Pilcrow, active: editor.isActive("paragraph"), onClick: () => editor.chain().focus().setParagraph().run() },
          { label: "Heading 1", icon: Heading1, active: editor.isActive("heading", { level: 1 }), onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run() },
          { label: "Heading 2", icon: Heading2, active: editor.isActive("heading", { level: 2 }), onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run() },
          { label: "Heading 3", icon: Heading3, active: editor.isActive("heading", { level: 3 }), onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run() },
        ],
        [
          { label: "Bold", hint: "⌘B", icon: Bold, active: editor.isActive("bold"), onClick: () => editor.chain().focus().toggleBold().run() },
          { label: "Italic", hint: "⌘I", icon: Italic, active: editor.isActive("italic"), onClick: () => editor.chain().focus().toggleItalic().run() },
          { label: "Underline", hint: "⌘U", icon: UnderlineIcon, active: editor.isActive("underline"), onClick: () => editor.chain().focus().toggleUnderline().run() },
          { label: "Strikethrough", icon: Strikethrough, active: editor.isActive("strike"), onClick: () => editor.chain().focus().toggleStrike().run() },
          { label: "Link", hint: "⌘K", icon: LinkIcon, active: editor.isActive("link"), onClick: promptForLink },
        ],
        [
          { label: "Bullet list", icon: List, active: editor.isActive("bulletList"), onClick: () => editor.chain().focus().toggleBulletList().run() },
          { label: "Numbered list", icon: ListOrdered, active: editor.isActive("orderedList"), onClick: () => editor.chain().focus().toggleOrderedList().run() },
          { label: "Quote", icon: QuoteIcon, active: editor.isActive("blockquote"), onClick: () => editor.chain().focus().toggleBlockquote().run() },
          { label: "Code block", icon: Code, active: editor.isActive("codeBlock"), onClick: () => editor.chain().focus().toggleCodeBlock().run() },
          { label: "Divider", icon: Minus, onClick: () => editor.chain().focus().setHorizontalRule().run() },
        ],
        [
          { label: "Table", icon: TableIcon, active: editor.isActive("table"), onClick: () => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
          { label: "Image", icon: ImageIcon, onClick: promptForImage },
        ],
      ]
    : [];

  return (
    <div className="animate-fade-in">
      <div className="sticky top-0 z-20 -mx-1 mb-5 flex flex-wrap items-center gap-1 rounded-lg border border-[#2f2f2f] bg-[#202020]/95 p-1 backdrop-blur supports-[backdrop-filter]:bg-[#202020]/80">
        {groups.map((group, groupIndex) => (
          <div key={groupIndex} className="flex items-center gap-0.5">
            {groupIndex > 0 && <span className="mx-1 h-5 w-px bg-[#3a3a3a]" />}
            {group.map((item) => {
              const Icon = item.icon;
              const active = "active" in item ? item.active : false;
              return (
                <Button
                  key={item.label}
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  title={"hint" in item && item.hint ? `${item.label} · ${item.hint}` : item.label}
                  aria-label={item.label}
                  aria-pressed={active || undefined}
                  disabled={!editor}
                  onClick={item.onClick}
                  className={`h-8 w-8 rounded-md text-[#c4c4c4] transition-colors duration-150 hover:bg-[#333333] hover:text-white ${
                    active ? "bg-[#3a3a3a] text-white" : ""
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              );
            })}
          </div>
        ))}

        <div className="ml-auto pr-1">
          <CollabStatusBar status={status} peers={peers} />
        </div>
      </div>

      {externalChange && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#4a4326] bg-[#2a2718] px-4 py-3 text-sm text-[#e8dfae] animate-fade-in">
          <span>This page was changed outside the editor.</span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-[#c9c2a0] hover:bg-white/5 hover:text-white"
              onClick={() => setExternalChange(false)}
            >
              Dismiss
            </Button>
            <Button
              size="sm"
              className="h-7 bg-[#e8dfae] text-[#2a2718] hover:bg-[#f2ecc8]"
              onClick={loadExternalChanges}
            >
              Load changes
            </Button>
          </div>
        </div>
      )}

      {!editor || !ready ? (
        <EditorSkeleton />
      ) : (
        <EditorContent
          editor={editor}
          className="quote-editor max-w-none text-[#f1f1ef]
            [&_table]:my-6 [&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-md
            [&_th]:relative [&_th]:border [&_th]:border-[#3f3f3f] [&_th]:bg-[#252525] [&_th]:p-3 [&_th]:text-left [&_th]:font-semibold
            [&_td]:relative [&_td]:border [&_td]:border-[#3f3f3f] [&_td]:p-3 [&_td]:align-top
            [&_table_p]:m-0
            [&_.column-resize-handle]:absolute [&_.column-resize-handle]:-right-1 [&_.column-resize-handle]:top-0 [&_.column-resize-handle]:bottom-0 [&_.column-resize-handle]:z-20 [&_.column-resize-handle]:w-2 [&_.column-resize-handle]:cursor-col-resize [&_.column-resize-handle]:bg-transparent hover:[&_.column-resize-handle]:bg-[#6f6f6f]"
        />
      )}

      {editor && (
        <SlashCommandMenu
          editor={editor}
          isOpen={slashMenuOpen}
          onClose={() => setSlashMenuOpen(false)}
          position={slashMenuPosition}
        />
      )}
    </div>
  );
}
