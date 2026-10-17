"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SettingsSection } from "@/components/settings/settings-section";
import {
  DEFAULT_PREFERENCES,
  FONT_OPTIONS,
  SIZE_OPTIONS,
  THEME_OPTIONS,
  WIDTH_OPTIONS,
  readPreferences,
  savePreferences,
  type Preferences,
} from "@/lib/preferences";

function Option({ active, onClick, children, className }: { active: boolean; onClick: () => void; children: React.ReactNode; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-xl border px-4 py-3 text-left text-sm transition-colors",
        active ? "border-white/40 bg-white/[0.06] text-zinc-100" : "border-white/[0.08] text-zinc-400 hover:border-white/20 hover:text-zinc-200",
        className
      )}
    >
      {children}
    </button>
  );
}

export function AppearanceSettings() {
  const [prefs, setPrefs] = useState<Preferences>(DEFAULT_PREFERENCES);

  useEffect(() => setPrefs(readPreferences()), []);

  const update = (patch: Partial<Preferences>) => {
    const next = { ...prefs, ...patch };
    setPrefs(next);
    savePreferences(next);
  };

  return (
    <div>
      <SettingsSection title="Font" hint="Used across the app, including your pages.">
        <div className="grid gap-2 sm:grid-cols-2">
          {FONT_OPTIONS.map((font) => (
            <Option key={font.id} active={prefs.font === font.id} onClick={() => update({ font: font.id })}>
              <span className="block text-base text-zinc-100">
                {font.label}
              </span>
              <span className="mt-0.5 block text-xs text-zinc-500">{font.sample}</span>
            </Option>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Theme" hint="Both are dark. Midnight is a deeper black.">
        <div className="flex gap-2">
          {THEME_OPTIONS.map((theme) => (
            <Option key={theme.id} active={prefs.theme === theme.id} onClick={() => update({ theme: theme.id })} className="flex items-center gap-3">
              <span className="h-5 w-5 rounded-md border border-white/20" style={{ background: theme.swatch }} />
              {theme.label}
            </Option>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Text size" hint="Scales the whole interface.">
        <div className="flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((size) => (
            <Option key={size.id} active={prefs.size === size.id} onClick={() => update({ size: size.id })}>
              {size.label}
            </Option>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Page width" hint="How wide the editor column is.">
        <div className="flex gap-2">
          {WIDTH_OPTIONS.map((width) => (
            <Option key={width.id} active={prefs.width === width.id} onClick={() => update({ width: width.id })}>
              {width.label}
            </Option>
          ))}
        </div>
      </SettingsSection>

      <SettingsSection title="Motion" hint="Turn off transitions and animations.">
        <Option active={prefs.reduceMotion} onClick={() => update({ reduceMotion: !prefs.reduceMotion })}>
          Reduce motion
        </Option>
      </SettingsSection>

      <p className="border-t border-white/[0.07] px-5 py-6 text-xs text-zinc-600 sm:px-14">Saved on this device only.</p>
    </div>
  );
}
