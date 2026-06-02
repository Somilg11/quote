"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Image } from "@tiptap/extension-image";

interface ReadOnlyEditorProps {
  initialContent?: string;
}

export function ReadOnlyEditor({
  initialContent = "",
}: ReadOnlyEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
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
    editable: false,
    content: initialContent,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-96 rounded-md bg-[#191919] animate-fade-in">
      <EditorContent 
        editor={editor} 
        className="quote-editor max-w-none focus:outline-none text-[#f1f1ef]"
      />
    </div>
  );
}
