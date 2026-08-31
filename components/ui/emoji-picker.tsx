"use client";

import { useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Shuffle, Trash2 } from "lucide-react";

const EMOJIS = [
  "📄", "📝", "📋", "📌", "📎", "✏️", "🖊️", "🖋️", "✒️", "📚",
  "📖", "📕", "📗", "📘", "📙", "📓", "📒", "📃", "📜", "📰",
  "🎯", "💡", "🔥", "⭐", "💎", "🚀", "🎨", "🎬", "🎵", "🎮",
  "💻", "📱", "🌐", "🔧", "⚙️", "🛠️", "🔨", "📊", "📈", "📉",
  "🏠", "🏢", "🏗️", "🏭", "🌍", "🌎", "🌏", "🗺️", "🧭", "📍",
  "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔",
  "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "😊",
  "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋",
  "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐",
  "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌",
  "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
  "🥵", "🥶", "🥴", "😵", "🤯", "🤠", "🥳", "🥸", "😎", "🤓",
  "🧐", "😕", "😟", "🙁", "☹️", "😮", "😯", "😲", "😳", "🥺",
  "😦", "😧", "😨", "😰", "😥", "😢", "😭", "😱", "😖", "😣",
  "😞", "😓", "😩", "😫", "🥱", "😤", "😡", "😠", "🤬", "👍",
  "👎", "👊", "✊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝",
  "🙏", "✍️", "💪", "🦵", "🦶", "👂", "👃", "🧠", "🦷", "🦴",
  "👀", "👁️", "👅", "👄", "💋", "🩸", "👶", "🧒", "👦", "👧",
  "👩", "👨", "🧑", "👴", "👵", "👱", "👨‍🦰", "👩‍🦰", "👱‍♀️", "👨‍🦱",
  "👩‍🦱", "👨‍🦳", "👩‍🦳", "🦲", "🦳", "🧔", "", "👳",
  "🧕", "👼", "🎅", "🤶", "🦸", "🦹", "🧙", "🧚", "🧛", "🧜",
  "🧝", "🧞", "🧟", "💆", "💇", "🚶", "🏃", "💃", "🕺", "👯",
  "🧖", "🧘", "🧗", "🤺", "🏇", "⛷️", "🏂", "🏌️", "🏄", "🚣",
  "🏊", "⛹️", "🏋️", "🚴", "🚵", "🛹", "🛼", "🤸", "🤼", "🤽",
  "🤾", "🤹", "🛀", "🛌", "👭", "👫", "👬", "💏", "💑", "👪",
  "🗣️", "👤", "👥", "👣", "🐵", "🐒", "🦍", "🦧", "🐶", "🐕",
  "🦮", "🐕‍🦺", "🐩", "🐺", "🦊", "🦝", "🐱", "🐈", "🐈‍⬛", "🦁",
  "🐯", "🐅", "🐆", "🐴", "🐎", "🦄", "🦓", "🦌", "🐮", "🐂",
  "🐃", "🐄", "🐷", "🐖", "🐗", "🐽", "🐏", "🐑", "🐐", "🐪",
  "🐫", "🦙", "🦒", "🐘", "🦣", "🦏", "🦛", "🐭", "🐁", "🐀",
  "🐹", "🐰", "🐇", "🐿️", "🦫", "🦔", "🦇", "🐻", "🐻‍❄️", "🐨",
  "🐼", "🦥", "🦦", "🦨", "🦘", "🦡", "🐾", "🦃", "🐔", "🐓",
  "🐣", "🐤", "🐥", "🐦", "🐧", "🕊️", "🦅", "🦆", "🦢", "🦉",
  "🦤", "🪶", "🦩", "🦚", "🦜", "🐸", "🐊", "🐢", "🦎", "🐍",
  "🐲", "🐉", "🦕", "🦖", "🐳", "🐋", "🐬", "🦭", "🐟", "🐠",
  "🐡", "🦈", "🐙", "🐚", "🐌", "🦋", "🐛", "🐜", "🐝", "🪲",
  "🐞", "🦗", "🪳", "🕷️", "🦂", "🦟", "🪰", "🪱", "🦠", "💐",
  "🌸", "💮", "🏵️", "🌹", "🥀", "🌺", "🌻", "🌼", "🌷", "🌱",
  "🪴", "🌲", "🌳", "🌴", "🌵", "🌾", "🌿", "☘️", "🍀", "🍁",
  "🍂", "🍃", "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭",
  "🍎", "🍏", "🍐", "🍑", "🍒", "🍓", "🫐", "🥝", "🍅", "🫒",
  "🥥", "🥑", "🍆", "🥔", "🥕", "🌽", "🌶️", "🫑", "🥒", "🥬",
  "🥦", "🧄", "🧅", "🍄", "🥜", "🌰", "🍞", "🥐", "🥖", "🥨",
  "🥯", "🥞", "🧇", "🧀", "🍖", "🍗", "🥩", "🥓", "🍔", "🍟",
  "🍕", "🌭", "🥪", "🌮", "🌯", "🫔", "🥙", "🧆", "🥚", "🍳",
  "🥘", "🍲", "🫕", "🥣", "🥗", "🍿", "🧈", "🧂", "🥫", "🍱",
  "🍘", "🍙", "🍚", "🍛", "🍜", "🍝", "🍠", "🍢", "🍣", "🍤",
  "🍥", "🥮", "🍡", "🥟", "🥠", "🥡", "🦀", "🦞", "🦐", "🦑",
  "🦪", "🍦", "🍧", "🍨", "🍩", "🍪", "🎂", "🍰", "🧁", "🥧",
  "🍫", "🍬", "🍭", "🍮", "🍯", "🍼", "🥛", "☕", "🫖", "🍵",
  "🍶", "🍾", "🍷", "🍸", "🍹", "🍺", "🍻", "🥂", "🥃", "🥤",
  "🧋", "🧃", "🧉", "🧊", "🥢", "🍽️", "🍴", "🥄", "🔪", "🏺",
];

/**
 * The list above is already ordered by theme, so categories are index ranges
 * rather than a per-emoji tag map.
 */
const CATEGORIES = [
  { label: "Docs", start: 0, end: 40 },
  { label: "Ideas", start: 40, end: 100 },
  { label: "People", start: 100, end: 270 },
  { label: "Nature", start: 270, end: 400 },
  { label: "Food", start: 400, end: 500 },
  { label: "Objects", start: 500, end: Number.MAX_SAFE_INTEGER },
] as const;

/** A few keyword hints so search finds the common ones by name. */
const KEYWORDS: Record<string, string> = {
  "📄": "page doc file document",
  "📝": "note write memo",
  "📋": "clipboard list tasks",
  "📌": "pin",
  "📚": "books library docs",
  "🎯": "target goal okr",
  "💡": "idea lightbulb",
  "🔥": "fire hot urgent",
  "⭐": "star favourite favorite",
  "🚀": "rocket launch ship",
  "💻": "laptop code dev engineering",
  "📊": "chart bar analytics data",
  "📈": "chart growth up metrics",
  "🐛": "bug issue",
  "🏠": "home house",
  "🌍": "world globe earth",
  "❤️": "heart love",
  "✅": "check done complete",
  "🗓": "calendar schedule",
  "🎨": "design art",
};

interface EmojiPickerProps {
  value?: string;
  onChange: (emoji: string) => void;
  /** Called when the icon is cleared. Omit to hide the remove action. */
  onRemove?: () => void;
  /** Custom trigger. Defaults to a button showing the current icon. */
  children?: React.ReactNode;
  align?: "start" | "center" | "end";
}

export function EmojiPicker({
  value,
  onChange,
  onRemove,
  children,
  align = "start",
}: EmojiPickerProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();

    if (needle) {
      return EMOJIS.filter(
        (emoji) => emoji === needle || (KEYWORDS[emoji] ?? "").includes(needle)
      );
    }

    if (category) {
      const range = CATEGORIES.find((entry) => entry.label === category);
      if (range) return EMOJIS.slice(range.start, range.end);
    }

    return EMOJIS;
  }, [query, category]);

  const pick = (emoji: string) => {
    onChange(emoji);
    setOpen(false);
    setQuery("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children ?? (
          <button
            type="button"
            aria-label="Change page icon"
            className="grid h-8 w-8 place-items-center rounded text-2xl transition-colors hover:bg-[#2f2f2f]"
          >
            {value || "📄"}
          </button>
        )}
      </PopoverTrigger>

      <PopoverContent
        align={align}
        className="w-[332px] border-[#3f3f3f] bg-[#252525] p-0 text-[#f1f1ef] shadow-2xl"
      >
        <div className="flex items-center gap-2 border-b border-[#3a3a3a] p-2">
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter…"
            className="h-8 min-w-0 flex-1 rounded-md bg-[#1f1f1f] px-2.5 text-sm outline-none ring-1 ring-transparent transition placeholder:text-[#6f6f6f] focus:ring-[#4a4a4a]"
          />
          <button
            type="button"
            title="Random icon"
            aria-label="Pick a random icon"
            onClick={() => pick(EMOJIS[Math.floor(Math.random() * EMOJIS.length)])}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-[#9b9b9b] transition-colors hover:bg-[#333333] hover:text-white"
          >
            <Shuffle className="h-4 w-4" />
          </button>
          {onRemove && (
            <button
              type="button"
              title="Remove icon"
              aria-label="Remove icon"
              onClick={() => {
                onRemove();
                setOpen(false);
              }}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-[#9b9b9b] transition-colors hover:bg-[#3a2928] hover:text-[#ff8a82]"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        {!query && (
          <div className="flex gap-1 overflow-x-auto border-b border-[#3a3a3a] px-2 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={`shrink-0 rounded-md px-2 py-1 text-[11px] transition-colors ${
                category === null ? "bg-[#3a3a3a] text-white" : "text-[#9b9b9b] hover:text-white"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((entry) => (
              <button
                key={entry.label}
                type="button"
                onClick={() => setCategory(entry.label)}
                className={`shrink-0 rounded-md px-2 py-1 text-[11px] transition-colors ${
                  category === entry.label
                    ? "bg-[#3a3a3a] text-white"
                    : "text-[#9b9b9b] hover:text-white"
                }`}
              >
                {entry.label}
              </button>
            ))}
          </div>
        )}

        <div className="max-h-64 overflow-y-auto p-2">
          {visible.length === 0 ? (
            <p className="px-1 py-6 text-center text-sm text-[#8f8f8f]">No icons match that.</p>
          ) : (
            <div className="grid grid-cols-8 gap-1">
              {visible.map((emoji, index) => (
                <button
                  key={`${emoji}-${index}`}
                  type="button"
                  onClick={() => pick(emoji)}
                  title={emoji}
                  className={`grid h-8 w-8 place-items-center rounded text-xl transition-colors hover:bg-[#333333] ${
                    emoji === value ? "bg-[#3a3a3a]" : ""
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
