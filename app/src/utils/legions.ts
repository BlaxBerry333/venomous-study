/**
 * Legion domain constants and data.
 * Single source of truth for legion metadata consumed by UI components.
 *
 * NOTE: Color schemes are defined in `app/src/styles/tokens.css` under
 * `[data-legion="<id>"]` selectors. This module only handles legion identity,
 * display names, and logo assets. The id list here MUST match the id list in
 * tokens.css (the `validateLegionIds` export can be used in dev for sanity).
 */

// ==================== Domain constants ====================

/** Default legion applied on first visit or when localStorage is empty. */
export const DEFAULT_LEGION: LegionId = "dark-angels";

/** localStorage key for persisting user's legion + era selection. */
export const LEGION_STORAGE_KEY = "venomous-legion";

/** Era values for traitor legions. */
export type Era = "crusade" | "heresy";

// ==================== Legion data ====================

export interface LoyalLegion {
  /** Stable identifier. Used as `[data-legion]` CSS hook and localStorage value. */
  id: string;
  /** Short name for sidebar trigger (no roman numeral). */
  name: string;
  /** Full label for modal option (with roman numeral). */
  label: string;
  /** Logo file basename (without `.avif`). Resolved at render time with base URL. */
  logoName: string;
}

export interface TraitorLegion extends LoyalLegion {
  /** Short name displayed after switching to Heresy era (may equal `name`). */
  heresyName: string;
  /** Full modal label for Heresy era (god · legion name format). */
  heresyLabel: string;
  /** Heresy-era logo file basename. */
  heresyLogoName: string;
}

export const LOYAL_LEGIONS: readonly LoyalLegion[] = [
  {
    id: "dark-angels",
    name: "Dark Angels",
    label: "I. Dark Angels",
    logoName: "imperial--dark-angels",
  },
  {
    id: "white-scars",
    name: "White Scars",
    label: "V. White Scars",
    logoName: "imperial--white-scars",
  },
  {
    id: "space-wolves",
    name: "Space Wolves",
    label: "VI. Space Wolves",
    logoName: "imperial--space-wolves",
  },
  {
    id: "imperial-fists",
    name: "Imperial Fists",
    label: "VII. Imperial Fists",
    logoName: "imperial--imperial-fists",
  },
  {
    id: "blood-angels",
    name: "Blood Angels",
    label: "IX. Blood Angels",
    logoName: "imperial--blood-angels",
  },
  {
    id: "iron-hands",
    name: "Iron Hands",
    label: "X. Iron Hands",
    logoName: "imperial--iron-hands",
  },
  {
    id: "ultramarines",
    name: "Ultramarines",
    label: "XIII. Ultramarines",
    logoName: "imperial--ultramarines",
  },
  {
    id: "salamanders",
    name: "Salamanders",
    label: "XVIII. Salamanders",
    logoName: "imperial--salamanders",
  },
  {
    id: "raven-guard",
    name: "Raven Guard",
    label: "XIX. Raven Guard",
    logoName: "imperial--raven-guard",
  },
] as const;

export const TRAITOR_LEGIONS: readonly TraitorLegion[] = [
  {
    id: "emperors-children",
    name: "Emperor's Children",
    heresyName: "Emperor's Children",
    label: "III. Emperor's Children",
    heresyLabel: "Slaanesh · Emperor's Children",
    logoName: "imperial--emperor's-children",
    heresyLogoName: "chaos--emperor's-children",
  },
  {
    id: "iron-warriors",
    name: "Iron Warriors",
    heresyName: "Iron Warriors",
    label: "IV. Iron Warriors",
    heresyLabel: "Chaos Undivided · Iron Warriors",
    logoName: "imperial--iron-warriors",
    heresyLogoName: "chaos--iron-warriors",
  },
  {
    id: "night-lords",
    name: "Night Lords",
    heresyName: "Night Lords",
    label: "VIII. Night Lords",
    heresyLabel: "Chaos Undivided · Night Lords",
    logoName: "imperial--night-lords",
    heresyLogoName: "chaos--night-lords",
  },
  {
    id: "world-eaters",
    name: "World Eaters",
    heresyName: "World Eaters",
    label: "XII. World Eaters",
    heresyLabel: "Khorne · World Eaters",
    logoName: "imperial--world-eaters",
    heresyLogoName: "chaos--world-eaters",
  },
  {
    id: "death-guard",
    name: "Death Guard",
    heresyName: "Death Guard",
    label: "XIV. Death Guard",
    heresyLabel: "Nurgle · Death Guard",
    logoName: "imperial--death-guard",
    heresyLogoName: "chaos--death-guard",
  },
  {
    id: "thousand-sons",
    name: "Thousand Sons",
    heresyName: "Thousand Sons",
    label: "XV. Thousand Sons",
    heresyLabel: "Tzeentch · Thousand Sons",
    logoName: "imperial--thousand-sons",
    heresyLogoName: "chaos--thousand-sons",
  },
  {
    id: "sons-of-horus",
    name: "Sons of Horus",
    heresyName: "Black Legion",
    label: "XVI. Sons of Horus",
    heresyLabel: "Chaos Undivided · Black Legion",
    logoName: "imperial--sons-of-horus",
    heresyLogoName: "chaos--black-legion",
  },
  {
    id: "word-bearers",
    name: "Word Bearers",
    heresyName: "Word Bearers",
    label: "XVII. Word Bearers",
    heresyLabel: "Chaos Undivided · Word Bearers",
    logoName: "imperial--word-bearers",
    heresyLogoName: "chaos--word-bearers",
  },
  {
    id: "alpha-legion",
    name: "Alpha Legion",
    heresyName: "Alpha Legion",
    label: "XX. Alpha Legion",
    heresyLabel: "Alpharius · Alpha Legion",
    logoName: "imperial--alpha-legion",
    heresyLogoName: "chaos--alpha-legion",
  },
] as const;

/** Union of all legion ids (derived from data above). */
export type LegionId =
  | (typeof LOYAL_LEGIONS)[number]["id"]
  | (typeof TRAITOR_LEGIONS)[number]["id"];

/** Resolve a logo file name to an absolute URL given the app's base path. */
export function legionLogoUrl(base: string, logoName: string): string {
  return `${base}legions/${logoName}.avif`;
}
