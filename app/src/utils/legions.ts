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

/** Era values for traitor legions. */
export type Era = "crusade" | "heresy";

/** Default legion applied on first visit or when localStorage is empty. */
export const DEFAULT_LEGION: LegionId = "sons-of-horus";

/** Default era applied on first visit. `heresy` so that the default
 *  (Sons of Horus) shows up under its Black Legion identity. */
export const DEFAULT_ERA: Era = "heresy";

/** localStorage key for persisting user's legion + era selection. */
export const LEGION_STORAGE_KEY = "venomous-legion";

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
  /** Primarch's name (public GW lore fact). */
  primarch: string;
  /** Homeworld / chapter planet (public GW lore fact). */
  homeworld: string;
  /** Common epithet or byname (e.g. "The Unforgiven"). */
  epithet: string;
  /** 2–3 sentence original summary of the legion's character,
   *  combat doctrine, and place in the setting. Not a quote of any
   *  official text. English only by design (lore names are English). */
  description: string;
}

export interface TraitorLegion extends LoyalLegion {
  /** Short name displayed after switching to Heresy era (may equal `name`). */
  heresyName: string;
  /** Full modal label for Heresy era (god · legion name format). */
  heresyLabel: string;
  /** Heresy-era logo file basename. */
  heresyLogoName: string;
  /** Chaos patron (e.g. "Slaanesh", "Khorne", "Chaos Undivided"). */
  patron: string;
  /** 2–3 sentence original summary of the legion's fate after falling
   *  to Chaos — again not quoting any official text. */
  heresyDescription: string;
}

export const LOYAL_LEGIONS: readonly LoyalLegion[] = [
  {
    id: "dark-angels",
    name: "Dark Angels",
    label: "I. Dark Angels",
    logoName: "imperial--dark-angels",
    primarch: "Lion El'Jonson",
    homeworld: "Caliban (destroyed) / The Rock",
    epithet: "The Unforgiven",
    description:
      "The First Legion — veteran knights of a lost forest world, famed for discipline, cold precision, and hooded robes over power armour. Behind their honour lies a hidden shame: the hunt for the Fallen, brothers who turned on the Lion in the closing days of the Heresy and escaped into the galaxy.",
  },
  {
    id: "white-scars",
    name: "White Scars",
    label: "V. White Scars",
    logoName: "imperial--white-scars",
    primarch: "Jaghatai Khan",
    homeworld: "Chogoris (Mundus Planus)",
    epithet: "Stormseers of Chogoris",
    description:
      "Horse-lords of the steppe reforged as lightning-fast sky hunters. The Scars strike from nowhere on jetbike and assault speeder, break a foe's spine, and are gone before the guns can answer. Speed, freedom and the Khan's pursuit of truth are the soul of the V Legion.",
  },
  {
    id: "space-wolves",
    name: "Space Wolves",
    label: "VI. Space Wolves",
    logoName: "imperial--space-wolves",
    primarch: "Leman Russ",
    homeworld: "Fenris",
    epithet: "Vlka Fenryka — The Wolves of Fenris",
    description:
      "Feral warriors raised on a death-world of ice and ash, counting saga, boast and blood-oath above any codex. The Wolves answer only to their own packs and their Great Wolf, and when the Emperor names a foe beyond redemption they are the blade He reaches for — the Executioners of Terra.",
  },
  {
    id: "imperial-fists",
    name: "Imperial Fists",
    label: "VII. Imperial Fists",
    logoName: "imperial--imperial-fists",
    primarch: "Rogal Dorn",
    homeworld: "Inwit / Phalanx (mobile fortress)",
    epithet: "The Emperor's Praetorians",
    description:
      "Masters of the siege, the wall and the unyielding line. The Fists once held the walls of the Imperial Palace against Horus himself, and every son of Dorn learns that duty outlives pain. Where the enemy cannot be broken, the VII Legion simply endures longer.",
  },
  {
    id: "blood-angels",
    name: "Blood Angels",
    label: "IX. Blood Angels",
    logoName: "imperial--blood-angels",
    primarch: "Sanguinius",
    homeworld: "Baal (secundus)",
    epithet: "The Angels of Baal",
    description:
      "Beautiful, artistic and aristocratic — and cursed. The IX Legion carry their gene-father's nobility and his flaw: the Red Thirst and the Black Rage, a creeping madness that turns poet and painter into a screaming, bloodied angel in the closing moments of a charge.",
  },
  {
    id: "iron-hands",
    name: "Iron Hands",
    label: "X. Iron Hands",
    logoName: "imperial--iron-hands",
    primarch: "Ferrus Manus",
    homeworld: "Medusa",
    epithet: "Sons of Medusa",
    description:
      "Flesh is weak. The Iron Hands meet that belief with the knife and the bionic, replacing limb and organ with machine until little remains of the man. Cold, clannish and unforgiving since the death of their primarch at Isstvan V, they trust only the certainty of steel.",
  },
  {
    id: "ultramarines",
    name: "Ultramarines",
    label: "XIII. Ultramarines",
    logoName: "imperial--ultramarines",
    primarch: "Roboute Guilliman",
    homeworld: "Macragge (Ultramar)",
    epithet: "Guardians of the Imperium",
    description:
      "The exemplar Legion — the Codex Astartes given flesh. From the five hundred worlds of Ultramar, Guilliman's sons fight by the doctrine he wrote, and in the 41st millennium their returned primarch leads the Imperium's last great counter-offensive against the encroaching dark.",
  },
  {
    id: "salamanders",
    name: "Salamanders",
    label: "XVIII. Salamanders",
    logoName: "imperial--salamanders",
    primarch: "Vulkan",
    homeworld: "Nocturne",
    epithet: "Firedrakes of Nocturne",
    description:
      "Smiths and protectors, fewer in number than any other Chapter but unmatched in their care for the common folk of the Imperium. The Salamanders forge their own wargear at the anvil, fight with flame and hammer at close range, and will break a battle-line to shield a single civilian.",
  },
  {
    id: "raven-guard",
    name: "Raven Guard",
    label: "XIX. Raven Guard",
    logoName: "imperial--raven-guard",
    primarch: "Corvus Corax",
    homeworld: "Deliverance / Kiavahr",
    epithet: "Liberators of Deliverance",
    description:
      "Ambushers and liberators, raised by a primarch who led a slave-uprising and never forgot it. The Raven Guard favour the silent drop, the severed supply line and the killing shot from cover, rather than the open field of honour. Victory is quiet, and its price is always paid by the tyrant.",
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
    primarch: "Fulgrim",
    homeworld: "Chemos",
    epithet: "The Phoenician's Chosen",
    description:
      "The only Legion granted the Emperor's own aquila, the III once pursued perfection in every form — mastery of weapons, of music, of war itself. Fulgrim's sons drilled until discipline became art, and art became worship. It was their greatest strength, and the seed of their fall.",
    patron: "Slaanesh",
    heresyDescription:
      "Perfection soured into appetite. Sworn to Slaanesh, the Phoenician's sons now chase sensation past the edge of flesh and sanity — sonic screams, bladed ecstasies, parades of mutilation. Every battle is a performance in which only the most extreme survivors claim they have truly felt anything at all.",
  },
  {
    id: "iron-warriors",
    name: "Iron Warriors",
    heresyName: "Iron Warriors",
    label: "IV. Iron Warriors",
    heresyLabel: "Chaos Undivided · Iron Warriors",
    logoName: "imperial--iron-warriors",
    heresyLogoName: "chaos--iron-warriors",
    primarch: "Perturabo",
    homeworld: "Olympia",
    epithet: "Lords of Iron",
    description:
      "The Emperor's siege hammer — kept from glory, handed every hopeless fortress, every thankless drag-out war of attrition. The IV Legion learned geometry, minefield and trench by a thousand grinding victories, and carried an equal weight of resentment for a father who never said well done.",
    patron: "Chaos Undivided",
    heresyDescription:
      "Resentment froze into hatred. Perturabo's sons still break fortresses — the Imperial Palace, Tallarn, a hundred lost worlds — only now each siege is an answered grudge. The Iron Warriors are the slow, patient mathematicians of spite, and the wall has not been built that can keep them out forever.",
  },
  {
    id: "night-lords",
    name: "Night Lords",
    heresyName: "Night Lords",
    label: "VIII. Night Lords",
    heresyLabel: "Chaos Undivided · Night Lords",
    logoName: "imperial--night-lords",
    heresyLogoName: "chaos--night-lords",
    primarch: "Konrad Curze (Night Haunter)",
    homeworld: "Nostramo (destroyed)",
    epithet: "Terror Incarnate",
    description:
      "Raised on a sunless hive-world and ruled by a primarch who hunted criminals as murdered ghosts, the VIII Legion were a blade of fear. Their creed was simple: a civilisation held by terror is cheaper and quieter than a civilisation held by armies. The Emperor used them, then disowned them.",
    patron: "Chaos Undivided",
    heresyDescription:
      "With the Haunter dead, his sons kept the sermon. Painted in skull-and-lightning, they cull, flay and broadcast the screaming so that the next world submits before the drop-pods land. They worship no god in full — only the effect they have on the living.",
  },
  {
    id: "world-eaters",
    name: "World Eaters",
    heresyName: "World Eaters",
    label: "XII. World Eaters",
    heresyLabel: "Khorne · World Eaters",
    logoName: "imperial--world-eaters",
    heresyLogoName: "chaos--world-eaters",
    primarch: "Angron",
    homeworld: "Nuceria",
    epithet: "The Butcher's Nails",
    description:
      "Taken from the slave-pits of Nuceria against his will, Angron was already maimed when he found his Legion — brain-spiked with the Butcher's Nails, implants that rewarded him only with rage. His sons followed him under the knife, and from that day the XII Legion never truly came down from the fight.",
    patron: "Khorne",
    heresyDescription:
      "Now the Nails have the whole Legion. Pledged to the Blood God, the World Eaters no longer manoeuvre, no longer plan — they drop, they charge and they feed Khorne's throne one skull at a time. Angron himself, ascended to daemonhood, is a screaming weather system of murder leading them on.",
  },
  {
    id: "death-guard",
    name: "Death Guard",
    heresyName: "Death Guard",
    label: "XIV. Death Guard",
    heresyLabel: "Nurgle · Death Guard",
    logoName: "imperial--death-guard",
    heresyLogoName: "chaos--death-guard",
    primarch: "Mortarion",
    homeworld: "Barbarus",
    epithet: "The Deathshroud",
    description:
      "Grim veterans from a poisoned mountain-world, led by a primarch who had fought sorcery and won. The XIV Legion endured gas, plague and nuclear rain as a point of pride — no foe with a finger on the environment could kill what was already inured to dying.",
    patron: "Nurgle",
    heresyDescription:
      "Mortarion's last pride was broken on the Terminus Est: a sickness he could not out-endure turned the Legion into Nurgle's favoured children. They are slow now, smiling, bloated — patient gardeners of rot, and their tread is the sound of plagues no Apothecary can name.",
  },
  {
    id: "thousand-sons",
    name: "Thousand Sons",
    heresyName: "Thousand Sons",
    label: "XV. Thousand Sons",
    heresyLabel: "Tzeentch · Thousand Sons",
    logoName: "imperial--thousand-sons",
    heresyLogoName: "chaos--thousand-sons",
    primarch: "Magnus the Red",
    homeworld: "Prospero (burned)",
    epithet: "Sons of the Cyclops",
    description:
      "Scholars and psykers, the XV Legion traded blade-drill for library and mirror. Magnus stood a head above his brothers and read the Warp like a book — a gift that cured his Legion's flesh-change but left its gene-father too proud to believe the warnings that came from Terra.",
    patron: "Tzeentch",
    heresyDescription:
      "After Prospero burned, Magnus gave the remnants of his Legion to Tzeentch. The sorcery held, but their bodies dissolved — most Thousand Sons are now only dust inside walking armour, loyal spells animating empty suits, commanded by Rubric and by the Cyclops's endless schemes.",
  },
  {
    id: "sons-of-horus",
    name: "Sons of Horus",
    heresyName: "Black Legion",
    label: "XVI. Sons of Horus",
    heresyLabel: "Chaos Undivided · Black Legion",
    logoName: "imperial--sons-of-horus",
    heresyLogoName: "chaos--black-legion",
    primarch: "Horus Lupercal",
    homeworld: "Cthonia",
    epithet: "The Warmaster's Own",
    description:
      "First found, first favoured: Horus was the brightest of the primarchs and the Emperor named him Warmaster above all others. His Legion, renamed in his honour, were the front rank of the Great Crusade — fast, versatile and utterly certain they served the galaxy's rightful leader.",
    patron: "Chaos Undivided",
    heresyDescription:
      "Horus fell, and his Legion fell with him. After his death the survivors burned the old insignia, repainted their plate black, and under Abaddon the Despoiler they became the Black Legion — unbound from any single god, and the standing spearhead of thirteen Black Crusades against Holy Terra.",
  },
  {
    id: "word-bearers",
    name: "Word Bearers",
    heresyName: "Word Bearers",
    label: "XVII. Word Bearers",
    heresyLabel: "Chaos Undivided · Word Bearers",
    logoName: "imperial--word-bearers",
    heresyLogoName: "chaos--word-bearers",
    primarch: "Lorgar Aurelian",
    homeworld: "Colchis",
    epithet: "The Bearers of the Word",
    description:
      "Lorgar needed to worship. When the Emperor denied him the right to name his father a god and had the XVII Legion's cathedral-cities razed as a lesson, the rebuke did not make the Word Bearers stop praying — it made them find a different congregation, and study its scripture for decades before striking.",
    patron: "Chaos Undivided",
    heresyDescription:
      "The Word Bearers were the first to truly fall, and the architects of the Heresy itself. Where other traitor Legions wage war, the XVII Legion conduct ministry — every battlefield a temple, every enemy's death an offering, every advance a new chapter of the Chaos gospel they refuse to stop preaching.",
  },
  {
    id: "alpha-legion",
    name: "Alpha Legion",
    heresyName: "Alpha Legion",
    label: "XX. Alpha Legion",
    heresyLabel: "Alpharius · Alpha Legion",
    logoName: "imperial--alpha-legion",
    heresyLogoName: "chaos--alpha-legion",
    primarch: "Alpharius Omegon",
    homeworld: "Unknown",
    epithet: "Hydra Dominatus",
    description:
      "The last Legion found, the smallest on paper, and the only one with two primarchs — twins who shared a name and a face and kept the fact hidden. The XX Legion fought through proxies, cells and disinformation, winning battles before the enemy knew a battle had begun.",
    patron: "Alpharius (officially undeclared)",
    heresyDescription:
      "The Alpha Legion's alignment is the galaxy's longest-running argument. They marched with Horus, yet no Alpha Legionnaire will tell you which war they are truly fighting; every agent, every captured document, every confession points a different way. Cut one head off the hydra — two grow back.",
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
