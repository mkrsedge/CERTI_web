// Website Color Scheme
export const websiteColors = {
  primary: '#ffedaca',    // Light cream/beige
  secondary: '#3e2723',   // Dark brown
} as const

// Color variants for different use cases
export const colorVariants = {
  primary: {
    50: '#ffedaca',
    100: '#ffe8b3',
    200: '#ffe3c0',
    300: '#ffdecd',
    400: '#ffd9da',
    500: '#ffedaca', // Base primary
    600: '#f5e2a0',
    700: '#ebd794',
    800: '#e1cc88',
    900: '#d7c17c',
  },
  secondary: {
    50: '#8b6b68',
    100: '#7a5d5a',
    200: '#694f4c',
    300: '#58413e',
    400: '#473330',
    500: '#3e2723', // Base secondary
    600: '#351f1b',
    700: '#2c1713',
    800: '#230f0b',
    900: '#1a0703',
  }
} as const

// Semantic color mappings
export const semanticColors = {
  text: {
    primary: websiteColors.secondary,
    secondary: websiteColors.secondary + 'cc', // 80% opacity
    muted: websiteColors.secondary + '99',    // 60% opacity
  },
  background: {
    primary: websiteColors.primary,
    secondary: websiteColors.primary + 'f2',  // 95% opacity
    muted: websiteColors.primary + 'e6',      // 90% opacity
  },
  accent: {
    primary: websiteColors.secondary,
    secondary: websiteColors.primary,
  },
  border: {
    primary: websiteColors.secondary + '33',  // 20% opacity
    secondary: websiteColors.primary + '66',  // 40% opacity
  }
} as const

// Export types for TypeScript
export type WebsiteColor = typeof websiteColors[keyof typeof websiteColors]
export type ColorVariant = typeof colorVariants.primary[keyof typeof colorVariants.primary]
