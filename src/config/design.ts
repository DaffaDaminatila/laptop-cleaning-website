// DESIGN TOKENS — Single source of truth
// DAFFA LAPTOP CLEANING SERVICE

export const colors = {
  // Base
  white: "#FFFFFF",
  light: "#F8FAFC",      // slate-50
  medium: "#E2E8F0",     // slate-200
  dark: "#0F172A",       // slate-900
  
  // Text
  textPrimary: "#0F172A",
  textSecondary: "#475569",  // slate-600
  textMuted: "#94A3B8",      // slate-400
  
  // Accent
  accent: "#1E40AF",        // blue-800
  accentLight: "#DBEAFE",   // blue-100
  
  // WhatsApp / Success
  wa: "#059669",            // emerald-600
  waLight: "#D1FAE5",       // emerald-100
  
  // Warning / Notice
  warning: "#D97706",       // amber-600
  warningLight: "#FEF3C7",  // amber-100
  
  // Error
  error: "#DC2626",         // red-600
  errorLight: "#FEE2E2",    // red-100
} as const;

export const spacing = {
  1: "4px",
  2: "8px",
  3: "12px",
  4: "16px",
  5: "24px",
  6: "32px",
  8: "48px",
  10: "64px",
  12: "96px",
} as const;

export const container = {
  max: "1152px",  // max-w-6xl
  padding: "16px",
  paddingSm: "24px",
  paddingLg: "32px",
} as const;

export const radius = {
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "20px",
  full: "9999px",
} as const;

export const shadow = {
  none: "none",
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  card: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  cardHover: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

export const transition = {
  fast: "150ms ease",
  base: "200ms ease",
  slow: "300ms ease",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
} as const;

// Typography scale (CSS custom properties friendly)
export const typography = {
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  fontMono: "'JetBrains Mono', 'Fira Code', monospace",
  
  display: {
    fontSize: "clamp(36px, 5vw, 56px)",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontSize: "clamp(28px, 4vw, 40px)",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.01em",
  },
  h3: {
    fontSize: "18px",
    fontWeight: 600,
    lineHeight: 1.4,
  },
  bodyLg: {
    fontSize: "18px",
    fontWeight: 400,
    lineHeight: 1.7,
  },
  body: {
    fontSize: "16px",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  bodySm: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: 1.5,
  },
  caption: {
    fontSize: "13px",
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  },
  button: {
    fontSize: "15px",
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: "0.02em",
  },
  price: {
    fontSize: "24px",
    fontWeight: 700,
    lineHeight: 1,
    fontVariantNumeric: "tabular-nums",
  },
  priceRange: {
    fontSize: "16px",
    fontWeight: 500,
    lineHeight: 1,
    fontVariantNumeric: "tabular-nums",
  },
} as const;

export const zIndex = {
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
  tooltip: 500,
} as const;
