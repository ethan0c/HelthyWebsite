export type ThemeKey = "dark" | "light" | "automatic" | "ocean_abyss" | "emerald_forest" | "sunset_orange" | "hello_kitty" | "midnight_aurora";

export interface AppTheme {
  primary: string;
  background: string;
  card: string;
  text: string;
  accent?: string;
  buttonBackground?: string;
  buttonText?: string;
  gradient1?: string;
  gradient2?: string;
}

export const DARK_THEME: AppTheme = {
  primary: "#B8FF6A",
  background: "#000000",
  card: "#111217",
  text: "#B8FF6A",
  accent: "#FF6B6B",
  buttonBackground: "#B8FF6A",
  buttonText: "#07120A",
  gradient1: "#B8FF6A",
  gradient2: "#06B6D4",
};

export const LIGHT_THEME: AppTheme = {
  primary: "#0F172A",
  background: "#FFFFFF",
  card: "#F8FAFC",
  text: "#0B1220",
  accent: "#10B981",
  buttonBackground: "#10B981",
  buttonText: "#FFFFFF",
  gradient1: "#FDE68A",
  gradient2: "#FB923C",
};

export const OCEAN_ABYSS_THEME: AppTheme = {
  primary: "#C7F9FF",
  background: "#071026",
  card: "#0B1220",
  text: "#E6F8FF",
  accent: "#06B6D4",
  buttonBackground: "#06B6D4",
  buttonText: "#041019",
  gradient1: "#06B6D4",
  gradient2: "#7C3AED",
};

export const EMERALD_FOREST_THEME: AppTheme = {
  primary: "#064E3B",
  background: "#F7FFF7",
  card: "#FFFFFF",
  text: "#053725",
  accent: "#2DD4BF",
  buttonBackground: "#10B981",
  buttonText: "#FFFFFF",
  gradient1: "#10B981",
  gradient2: "#34D399",
};

export const SUNSET_ORANGE_THEME: AppTheme = {
  primary: "#FF7A45",
  background: "#FFF7ED",
  card: "#FFFFFF",
  text: "#7C2D12",
  accent: "#FFB454",
  buttonBackground: "#FF7A45",
  buttonText: "#FFFFFF",
  gradient1: "#FF7A45",
  gradient2: "#FFD27A",
};

export const HELLO_KITTY_THEME: AppTheme = {
  primary: "#FF6AB8",
  background: "#FFF1F8",
  card: "#FFF7FB",
  text: "#3C1F2B",
  accent: "#FFB8E6",
  buttonBackground: "#FF6AB8",
  buttonText: "#FFFFFF",
  gradient1: "#FF6AB8",
  gradient2: "#FFD1EC",
};

export const MIDNIGHT_AURORA_THEME: AppTheme = {
  primary: "#7C3AED",
  background: "#0B0426",
  card: "#0E0820",
  text: "#F6F3FF",
  accent: "#8B5CF6",
  buttonBackground: "#7C3AED",
  buttonText: "#FFFFFF",
  gradient1: "#7C3AED",
  gradient2: "#A78BFA",
};

export const THEMES = {
  dark: DARK_THEME,
  light: LIGHT_THEME,
  ocean_abyss: OCEAN_ABYSS_THEME,
  emerald_forest: EMERALD_FOREST_THEME,
  sunset_orange: SUNSET_ORANGE_THEME,
  hello_kitty: HELLO_KITTY_THEME,
  midnight_aurora: MIDNIGHT_AURORA_THEME,
} as const;

export const PREMIUM_THEMES: ThemeKey[] = [
  "ocean_abyss",
  "emerald_forest",
  "sunset_orange",
  "hello_kitty",
  "midnight_aurora",
];

export const getTheme = (themeKey: ThemeKey): AppTheme => {
  if (themeKey === "automatic") {
    return LIGHT_THEME;
  }
  return THEMES[themeKey as keyof typeof THEMES] || LIGHT_THEME;
};

export const isThemePremium = (themeKey: ThemeKey): boolean => {
  return PREMIUM_THEMES.includes(themeKey);
};

export const getAvailableThemes = (isPremium: boolean): ThemeKey[] => {
  const freeThemes: ThemeKey[] = ["dark", "light", "automatic"];
  return isPremium ? [...freeThemes, ...PREMIUM_THEMES] : freeThemes;
};

export const getThemeDisplayName = (themeKey: ThemeKey): string => {
  const displayNames: Record<ThemeKey, string> = {
    dark: "Dark",
    light: "Light",
    automatic: "Automatic",
    ocean_abyss: "Ocean Abyss",
    emerald_forest: "Emerald Forest",
    sunset_orange: "Sunset Orange",
    hello_kitty: "Hello Kitty",
    midnight_aurora: "Midnight Aurora",
  };
  return displayNames[themeKey] || "Unknown";
};

export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

export const isDarkTheme = (theme: AppTheme): boolean => {
  const bg = theme.background;
  const r = parseInt(bg.slice(1, 3), 16);
  const g = parseInt(bg.slice(3, 5), 16);
  const b = parseInt(bg.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
};
