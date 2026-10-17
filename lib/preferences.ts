/**
 * Per-device appearance preferences. They live in localStorage and are applied as
 * data attributes on <html>, so CSS can react without any React state. The same
 * keys are read by the inline script in app/layout.tsx to avoid a flash on load.
 */
export const PREFS_KEY = "quote-prefs";

export const FONT_OPTIONS = [
  { id: "poppins", label: "Poppins", sample: "Geometric and friendly" },
  { id: "geist", label: "Geist", sample: "Neutral and technical" },
  { id: "serif", label: "Serif", sample: "Editorial and calm" },
  { id: "mono", label: "Mono", sample: "Plain and precise" },
] as const;

export const SIZE_OPTIONS = [
  { id: "compact", label: "Compact" },
  { id: "default", label: "Default" },
  { id: "comfortable", label: "Comfortable" },
] as const;

export const THEME_OPTIONS = [
  { id: "graphite", label: "Graphite", swatch: "#191919" },
  { id: "midnight", label: "Midnight", swatch: "#0d0d0e" },
] as const;

export const WIDTH_OPTIONS = [
  { id: "standard", label: "Standard" },
  { id: "wide", label: "Wide" },
] as const;

export interface Preferences {
  font: (typeof FONT_OPTIONS)[number]["id"];
  size: (typeof SIZE_OPTIONS)[number]["id"];
  theme: (typeof THEME_OPTIONS)[number]["id"];
  width: (typeof WIDTH_OPTIONS)[number]["id"];
  reduceMotion: boolean;
}

export const DEFAULT_PREFERENCES: Preferences = {
  font: "poppins",
  size: "default",
  theme: "graphite",
  width: "standard",
  reduceMotion: false,
};

export function readPreferences(): Preferences {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    return raw ? { ...DEFAULT_PREFERENCES, ...JSON.parse(raw) } : DEFAULT_PREFERENCES;
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

export function applyPreferences(prefs: Preferences) {
  const root = document.documentElement;
  root.dataset.font = prefs.font;
  root.dataset.size = prefs.size;
  root.dataset.theme = prefs.theme;
  root.dataset.width = prefs.width;
  root.dataset.motion = prefs.reduceMotion ? "reduce" : "full";
}

export function savePreferences(prefs: Preferences) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {
    // Storage can be blocked; the choice still applies for this session.
  }
  applyPreferences(prefs);
}

/** Static script run before first paint. Contains no user-controlled content. */
export const PREFS_BOOT_SCRIPT = `try{var p=JSON.parse(localStorage.getItem("${PREFS_KEY}")||"{}"),r=document.documentElement;r.dataset.font=p.font||"poppins";r.dataset.size=p.size||"default";r.dataset.theme=p.theme||"graphite";r.dataset.width=p.width||"standard";r.dataset.motion=p.reduceMotion?"reduce":"full"}catch(e){}`;
