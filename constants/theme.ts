/**
 * Design system : couleurs sémantiques, espacements, rayons.
 * Utiliser ces tokens partout pour une UX cohérente.
 */

import { Platform } from 'react-native';

// ——— Palette sémantique (mode clair) ———
const light = {
  // Primaire : vert industriel (header, boutons principaux)
  primary: '#1a4d2e',
  primaryLight: '#215229',
  primaryDark: '#0f3320',
  textOnPrimary: '#f8faf8',
  // Secondaire : bleu (liens, onglets, actions secondaires)
  secondary: '#0a7ea4',
  secondaryLight: '#0d96c4',
  textOnSecondary: '#fff',
  // Sémantiques
  success: '#15803d',
  successLight: '#16a34a',
  warning: '#b45309',
  danger: '#b91c1c',
  // Surfaces
  background: '#f8faf9',
  surface: '#ffffff',
  surfaceMuted: '#f1f5f4',
  border: '#e2e8e6',
  borderLight: '#eef2f0',
  // Texte
  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#64748b',
  textInverse: '#fff',
};

// ——— Mode sombre (optionnel) ———
const dark = {
  primary: '#2d6a4f',
  primaryLight: '#40916c',
  primaryDark: '#1b4332',
  textOnPrimary: '#f8faf8',
  secondary: '#0ea5e9',
  secondaryLight: '#38bdf8',
  textOnSecondary: '#fff',
  success: '#22c55e',
  successLight: '#4ade80',
  warning: '#f59e0b',
  danger: '#ef4444',
  background: '#0f1419',
  surface: '#1a2228',
  surfaceMuted: '#24302a',
  border: '#2d3d36',
  borderLight: '#1e2d26',
  text: '#f1f5f9',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',
  textInverse: '#0f172a',
};

// ——— Exports pour composants ———
export const Palette = { light, dark };

const tintColorLight = light.secondary;
const tintColorDark = dark.secondary;

export const Colors = {
  light: {
    ...light,
    text: light.text,
    background: light.background,
    tint: tintColorLight,
    icon: light.textSecondary,
    tabIconDefault: light.textMuted,
    tabIconSelected: tintColorLight,
  },
  dark: {
    ...dark,
    text: dark.text,
    background: dark.background,
    tint: tintColorDark,
    icon: dark.textSecondary,
    tabIconDefault: dark.textMuted,
    tabIconSelected: tintColorDark,
  },
};

// ——— Espacements (scale 4px) ———
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

// ——— Rayons de bordure ———
export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

// ——— Ombres légères (iOS / Android) ———
export const Shadows = Platform.select({
  ios: {
    card: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.06,
      shadowRadius: 4,
    },
    cardPressed: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.04,
      shadowRadius: 2,
    },
  },
  default: {
    card: {
      elevation: 2,
    },
    cardPressed: {
      elevation: 1,
    },
  },
});

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
