"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Collaboration from "@tiptap/extension-collaboration";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Image } from "@tiptap/extension-image";
import { useRoom, useUpdateMyPresence } from "@liveblocks/react";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Pilcrow,
  Quote,
  UnderlineIcon,
  RefreshCw,
  Table as TableIcon,
  Image as ImageIcon,
} from "lucide-react";
import * as Y from "yjs";
import { SlashCommandMenu } from "./slash-command-menu";

interface CollaborativeEditorProps {
  initialContent?: string;
  onContentChange?: (content: string) => void;
  pageId?: string;
}

export function CollaborativeEditor({
  initialContent = "",
  onContentChange,
  pageId,
}: CollaborativeEditorProps) {
  const room = useRoom();
  const updateMyPresence = useUpdateMyPresence();
  const [slashMenuOpen, setSlashMenuOpen] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState<{ x: number, top?: number, bottom?: number }>({ x: 0 });
  const [isSyncing, setIsSyncing] = useState(false);
  const [hasRemoteContent, setHasRemoteContent] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialContentLoadedRef = useRef(false);

  const yDoc = useMemo(() => new Y.Doc(), []);
  const yProvider = useMemo(
    () => new LiveblocksYjsProvider(room, yDoc),
    [room, yDoc]
  );

  useEffect(() => {
    return () => {
      yProvider.destroy();
      yDoc.destroy();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [yProvider, yDoc]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
      }),
      Collaboration.configure({
        document: yDoc,
      }),
      Placeholder.configure({
        placeholder: "Press '/' for commands...",
      }),
      Link.configure({
        openOnClick: false,
      }),
      Underline,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
    ],
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      const fragment = yDoc.getXmlFragment("prosemirror");
      
      const hasContent = fragment.length > 0;
      setHasRemoteContent(hasContent);

      console.log("[editor] onCreate - hasRemoteContent:", hasContent, "initialContent length:", initialContent?.length);
      console.log("[editor] Automatic initial content loading DISABLED to prevent duplication");
      console.log("[editor] Use the sync button to load content from database");
    },
    onUpdate: ({ editor }) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        const content = editor.getHTML();
        onContentChange?.(content);
      }, 3000); 
    },
  });

  useEffect(() => {
    if (!editor) return;

    const updatePresence = () => {
      updateMyPresence({
        cursor: editor.state.selection.$anchor.pos,
      });
    };

    const handleTransaction = () => {
      const { state } = editor;
      const { from } = state.selection;
      const $from = state.doc.resolve(from);
      
      const lineStart = $from.start($from.depth);
      const lineText = state.doc.textBetween(lineStart, from);
      
      if (lineText.startsWith("/")) {
        const { view } = editor;
        const coords = view.coordsAtPos(from);
        
        const isNearBottom = window.innerHeight - coords.bottom < 320;
        
        setSlashMenuPosition({ 
          x: coords.left, 
          top: isNearBottom ? undefined : coords.bottom + 8,
          bottom: isNearBottom ? window.innerHeight - coords.top + 8 : undefined
        });
        
        if (!slashMenuOpen) setSlashMenuOpen(true);
      } else {
        setSlashMenuOpen(false);
      }
    };

    editor.on("update", updatePresence);
    editor.on("selectionUpdate", updatePresence);
    editor.on("transaction", handleTransaction);

    return () => {
      editor.off("update", updatePresence);
      editor.off("selectionUpdate", updatePresence);
      editor.off("transaction", handleTransaction);
    };
  }, [editor, updateMyPresence, slashMenuOpen]);

  const handleSync = useCallback(async () => {
    if (!pageId || !editor) return;
    
    setIsSyncing(true);
    try {
      const response = await fetch(`/api/pages/${pageId}`);
      const data = await response.json();
      
      if (data.page?.content) {
        const fragment = yDoc.getXmlFragment("prosemirror");
        fragment.delete(0, fragment.length);
        
        editor.commands.setContent(data.page.content);
        initialContentLoadedRef.current = true;
      }
    } catch (error) {
      console.error("Failed to sync:", error);
    } finally {
      setIsSyncing(false);
    }
  }, [pageId, editor, yDoc]);

  const toolbarItems = [
    {
      label: "Text",
      icon: Pilcrow,
      active: editor?.isActive("paragraph"),
      onClick: () => editor?.chain().focus().setParagraph().run(),
    },
    {
      label: "H1",
      icon: Heading1,
      active: editor?.isActive("heading", { level: 1 }),
      onClick: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
    {
      label: "H2",
      icon: Heading2,
      active: editor?.isActive("heading", { level: 2 }),
      onClick: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      label: "Bold",
      icon: Bold,
      active: editor?.isActive("bold"),
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      label: "Italic",
      icon: Italic,
      active: editor?.isActive("italic"),
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      label: "Underline",
      icon: UnderlineIcon,
      active: editor?.isActive("underline"),
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
    },
    {
      label: "Bullets",
      icon: List,
      active: editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Numbers",
      icon: ListOrdered,
      active: editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
    {
      label: "Quote",
      icon: Quote,
      active: editor?.isActive("blockquote"),
      onClick: () => editor?.chain().focus().toggleBlockquote().run(),
    },
    {
      label: "Code",
      icon: Code,
      active: editor?.isActive("codeBlock"),
      onClick: () => editor?.chain().focus().toggleCodeBlock().run(),
    },
    {
      label: "Table",
      icon: TableIcon,
      active: editor?.isActive("table"),
      onClick: () => {
        if (!editor?.isActive("table")) {
          editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
        }
      },
    },
    {
      label: "Image",
      icon: ImageIcon,
      active: false,
      onClick: () => {
        const url = window.prompt("Enter image URL:");
        if (url) {
          editor?.chain().focus().setImage({ src: url }).run();
        }
      },
    },
    {
      label: "Sync",
      icon: RefreshCw,
      active: false,
      onClick: handleSync,
      disabled: isSyncing,
    },
  ];

  return (
    <div className="min-h-96 rounded-md bg-[#191919] transition-colors duration-200 animate-fade-in">
      <div className="sticky top-0 z-10 mb-5 flex flex-wrap gap-1 rounded-md border border-[#2f2f2f] bg-[#202020]/95 p-1 backdrop-blur transition-all duration-200">
        {toolbarItems.map((item) => {
          const Icon = item.icon;

          return (
            <Button
              key={item.label}
              type="button"
              variant="ghost"
              size="icon-sm"
              title={item.label}
              aria-label={item.label}
              disabled={!editor}
              onClick={item.onClick}
              className={`h-8 w-8 rounded text-[#d4d4d4] hover:bg-[#333333] hover:text-white transition-all duration-200 hover:scale-110 active:scale-95 ${
                item.active ? "bg-[#3a3a3a] text-white scale-105" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>
      <EditorContent 
        editor={editor} 
        className="quote-editor max-w-none focus:outline-none text-[#f1f1ef]
          [&_table]:border-collapse [&_table]:table-fixed [&_table]:w-full [&_table]:my-6 [&_table]:rounded-md [&_table]:overflow-hidden
          [&_th]:border [&_th]:border-[#3f3f3f] [&_th]:bg-[#252525] [&_th]:p-3 [&_th]:font-semibold [&_th]:relative [&_th]:text-left
          [&_td]:border [&_td]:border-[#3f3f3f] [&_td]:p-3 [&_td]:relative [&_td]:align-top
          [&_table_p]:m-0
          [&_.column-resize-handle]:absolute [&_.column-resize-handle]:-right-1 [&_.column-resize-handle]:top-0 [&_.column-resize-handle]:bottom-0 [&_.column-resize-handle]:w-2 [&_.column-resize-handle]:bg-[#555] [&_.column-resize-handle]:cursor-col-resize [&_.column-resize-handle]:z-20 hover:[&_.column-resize-handle]:bg-blue-500"
      />
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