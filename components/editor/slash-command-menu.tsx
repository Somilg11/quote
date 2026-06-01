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
    title: "Divider",
    description: "Visually divide blocks.",
    icon: SeparatorHorizontal,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run();
    },
  },
];

export const SlashCommandMenu = ({ editor, isOpen, onClose, position }: { editor: any; isOpen: boolean; onClose: () => void; position: { x: number; y: number } }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [query, setQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedIndexRef = useRef(selectedIndex);
  const filteredItemsRef = useRef<CommandItem[]>([]);
  const items = getSuggestionItems();

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  // Update refs when values change
  useEffect(() => {
    selectedIndexRef.current = selectedIndex;
  }, [selectedIndex]);

  useEffect(() => {
    filteredItemsRef.current = filteredItems;
  }, [filteredItems]);

  const executeCommand = useCallback((item: CommandItem) => {
    const { state } = editor;
    const { from } = state.selection;
    const $from = state.doc.resolve(from);
    
    // Find the start of the "/" command
    const lineStart = $from.start($from.depth);
    const lineText = state.doc.textBetween(lineStart, from);
    
    // Find the position of "/" in the line
    const slashIndex = lineText.lastIndexOf('/');
    if (slashIndex !== -1) {
      const slashPos = lineStart + slashIndex;
      // Delete from "/" to cursor
      editor.chain().focus().deleteRange({ from: slashPos, to: from }).run();
    }
    
    // Execute the command
    item.command({ editor, range: { from, to: from } });
    onClose();
  }, [editor, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
    setQuery("");
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItemsRef.current.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItemsRef.current.length) % filteredItemsRef.current.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filteredItemsRef.current[selectedIndexRef.current];
        if (item) {
          executeCommand(item);
        }
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, executeCommand, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-72 rounded-lg border border-[#3f3f3f] bg-[#252525] p-2 shadow-xl"
      style={{ top: position.y, left: position.x }}
    >
      <div className="max-h-80 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="px-2 py-3 text-sm text-[#858585]">No results found</div>
        ) : (
          filteredItems.map((item, index) => {
            const Icon = item.icon;
            const isSelected = index === selectedIndex;

            return (
              <button
                key={item.title}
                type="button"
                className={`flex w-full items-center gap-3 rounded-md px-2 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-[#333333] text-white"
                    : "text-[#d4d4d4] hover:bg-[#2f2f2f]"
                }`}
                onClick={() => executeCommand(item)}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <div className="flex-1">
                  <div className="font-medium">{item.title}</div>
                  <div className="text-xs text-[#858585]">{item.description}</div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
