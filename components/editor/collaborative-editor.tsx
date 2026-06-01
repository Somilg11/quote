"use client";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Collaboration from "@tiptap/extension-collaboration";
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
  const [slashMenuPosition, setSlashMenuPosition] = useState({ x: 0, y: 0 });
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
    ],
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      const fragment = yDoc.getXmlFragment("prosemirror");
      
      // Check if there's remote content
      const hasContent = fragment.length > 0;
      setHasRemoteContent(hasContent);

      // COMPLETELY DISABLE automatic initial content loading to prevent duplication
      // Content will ONLY be loaded via sync button
      console.log("[editor] onCreate - hasRemoteContent:", hasContent, "initialContent length:", initialContent?.length);
      console.log("[editor] Automatic initial content loading DISABLED to prevent duplication");
      console.log("[editor] Use the sync button to load content from database");
    },
    onUpdate: ({ editor }) => {
      // Debounce the save to prevent excessive database writes
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        const content = editor.getHTML();
        onContentChange?.(content);
      }, 3000); // Increased to 3 seconds to reduce save frequency
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
      
      // Get the current line text
      const lineStart = $from.start($from.depth);
      const lineText = state.doc.textBetween(lineStart, from);
      
      // Check if the line ends with "/" and it's at the start or after a space
      const lastChar = lineText.slice(-1);
      const secondLastChar = lineText.slice(-2, -1);
      
      if (lastChar === "/" && (lineText.length === 1 || secondLastChar === ' ')) {
        if (!slashMenuOpen) {
          const { view } = editor;
          const coords = view.coordsAtPos(from);
          setSlashMenuPosition({ x: coords.left, y: coords.bottom + 8 });
          setSlashMenuOpen(true);
        }
      } else if (slashMenuOpen && !lineText.endsWith('/')) {
        // Close menu if user continues typing after "/"
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
        // Clear the Yjs document first
        const fragment = yDoc.getXmlFragment("prosemirror");
        fragment.delete(0, fragment.length);
        
        // Set the content from database
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
      label: "Sync",
      icon: RefreshCw,
      active: false,
      onClick: handleSync,
      disabled: isSyncing,
    },
  ];

  return (
    <div className="min-h-96 rounded-md bg-[#191919] transition-colors duration-200">
      <div className="sticky top-0 z-10 mb-5 flex flex-wrap gap-1 rounded-md border border-[#2f2f2f] bg-[#202020]/95 p-1 backdrop-blur">
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
              className={`h-8 w-8 rounded text-[#d4d4d4] hover:bg-[#333333] hover:text-white ${
                item.active ? "bg-[#3a3a3a] text-white" : ""
              }`}
            >
              <Icon className="h-4 w-4" />
            </Button>
          );
        })}
      </div>
      <EditorContent 
        editor={editor} 
        className="quote-editor max-w-none focus:outline-none text-[#f1f1ef]"
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
