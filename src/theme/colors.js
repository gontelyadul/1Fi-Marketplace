// Central design tokens.
// Open the real 1Fi app, inspect the Shop page, and tweak these values
// (colors, spacing, radius) so your Marketplace matches it exactly.
// This file existing at all is what makes "consistency across the app" easy —
// every screen pulls from here instead of hardcoding random hex values.

export const colors = {
  primary: '#5B4FE8',      // <-- replace with 1Fi's actual brand color
  primaryLight: '#EDEBFF',
  background: '#FFFFFF',
  surface: '#F7F7FA',
  textPrimary: '#1A1A2E',
  textSecondary: '#6B6B80',
  border: '#E5E5EC',
  success: '#1FAA59',
  error: '#E5484D',
  white: '#FFFFFF',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const typography = {
  h1: { fontSize: 24, fontWeight: '700' },
  h2: { fontSize: 18, fontWeight: '600' },
  body: { fontSize: 14, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
  price: { fontSize: 16, fontWeight: '700' },
};
