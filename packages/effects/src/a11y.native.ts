/** Spread onto purely decorative native layers so screen readers skip them. */
export const decorative = {
  'aria-hidden': true,
  accessibilityElementsHidden: true,
  importantForAccessibility: 'no-hide-descendants',
  pointerEvents: 'none',
} as const;
