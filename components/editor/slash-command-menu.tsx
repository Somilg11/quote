"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Text,
  List,
  ListOrdered,
  Quote,
  Code,
  SeparatorHorizontal,
  Table as TableIcon,
  Image as ImageIcon,
} from "lucide-react";

export interface CommandItem {
  title: string;
  description: string;
  icon: any;
  command: ({ editor, range }: { editor: any; range: any }) => void;
}

const getSuggestionItems = (): CommandItem[] => [
  {
    title: "Text",
    description: "Just start writing with plain text.",
    icon: Text,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    icon: Heading1,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    icon: Heading2,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    icon: Heading3,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    icon: List,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    icon: ListOrdered,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    icon: Quote,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    icon: Code,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run();
    },
  },
  {
    title: "Table",
    description: "Insert a table.",
    icon: TableIcon,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
    },
  },
  {
    title: "Image",
    description: "Insert an image from URL.",
    icon: ImageIcon,
    command: ({ editor, range }) => {
      const url = window.prompt("Enter image URL:");
      if (url) {
        editor.chain().focus().deleteRange(range).setImage({ src: url }).run();
      }
    },
  },
  {
    title: "Divider",
    description: "Visually divide blocks.",
    icon: SeparatorHorizontal,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
];

export const SlashCommandMenu = ({ 
  editor, 
  isOpen, 
  onClose, 
  position 
}: { 
  editor: any; 
  isOpen: boolean; 
  onClose: () => void; 
  position: { x: number; y?: number; top?: number; bottom?: number } 
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedIndexRef = useRef(selectedIndex);
  const filteredItemsRef = useRef<CommandItem[]>([]);
  const items = getSuggestionItems();

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    filteredItemsRef.current = filteredItems;
  }, [filteredItems]);

  useEffect(() => {
    if (!isOpen || !editor) return;

    const extractQuery = () => {
      const { state } = editor;
      const { from } = state.selection;
      const $from = state.doc.resolve(from);
      const lineStart = $from.start($from.depth);
      const lineText = state.doc.textBetween(lineStart, from);

      if (lineText.startsWith("/")) {
        setQuery(lineText.slice(1));
        setSelectedIndex(0);
      } else {
        onClose();
      }
    };

    editor.on("update", extractQuery);
    editor.on("selectionUpdate", extractQuery);
    
    extractQuery();

    return () => {
      editor.off("update", extractQuery);
      editor.off("selectionUpdate", extractQuery);
    };
  }, [editor, isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const selectedElement = menuRef.current?.querySelector('[data-selected="true"]');
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex, isOpen]);

  const executeCommand = useCallback((item: CommandItem) => {
    const { state } = editor;
    const { from } = state.selection;
    const $from = state.doc.resolve(from);
    const lineStart = $from.start($from.depth);
    
    // Pass the full range to the command so it executes in a single chain
    item.command({ editor, range: { from: lineStart, to: from } });
    onClose();
  }, [editor, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(0);
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        e.stopPropagation(); // Block Tiptap from seeing the event
        setSelectedIndex((prev) => (prev + 1) % filteredItemsRef.current.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex((prev) => (prev - 1 + filteredItemsRef.current.length) % filteredItemsRef.current.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        e.stopPropagation(); // Critical fix: Stops the newline insertion
        const item = filteredItemsRef.current[selectedIndexRef.current];
        if (item) {
          executeCommand(item);
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    // Use { capture: true } to intercept the keys BEFORE ProseMirror handles them
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, executeCommand, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-72 rounded-lg border border-zinc-700 bg-zinc-900 p-2 shadow-xl"
      style={{ 
        left: position.x, 
        top: position.top ?? position.y, 
        bottom: position.bottom 
      }}
    >
      <div className="max-h-80 overflow-y-auto custom-scrollbar">
        {filteredItems.length === 0 ? (
          <div className="px-2 py-3 text-sm text-zinc-400">No results found</div>
        ) : (
          filteredItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = index === selectedIndex;

            return (
              <button
                key={item.title}
                type="button"
                data-selected={isSelected}
                className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-zinc-800 text-zinc-100"
                    : "text-zinc-300 hover:bg-zinc-800/50"
                }`}
                onClick={() => executeCommand(item)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-zinc-500">{item.description}</div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};