// Centralized descriptions for propmover fields (FlyFF)
// Add or refine as you learn more specifics.

export const MONSTER_FIELD_DESCRIPTIONS: Record<string, string> = {
  // Identity / naming
  dwid: "Monster unique identifier (internal ID used by game data).",
  szname: "Resource key/name for this monster (used to look up translations).",
  szcomment: "Developer note or comment about this monster.",

  // Basic stats
  dwai: "Artificial Intelligence type of the monster (e.g., AII_MONSTER, AII_PET, AII_AGGRO_NORMAL).",
  dwstr: "Strength stat of the monster.",
  dwsta: "Stamina stat of the monster.",
  dwdex: "Dexterity stat of the monster.",
  dwint: "Intelligence stat of the monster.",
  dwhr: "Hit Rate stat of the monster.",
  dwer: "Evasion Rate stat of the monster.",

  // Classification
  dwrace: "Race/type of the monster (e.g., = for default).",
  dwbelligerence: "Aggression level of the monster (BELLI_MELEE, BELLI_PEACEFUL, etc.).",
  dwgender: "Gender of the monster (e.g., = for default).",
  dwlevel: "Level of the monster.",
  dwfilghtlevel: "Flight level requirement for the monster.",
  dwsize: "Size category of the monster (e.g., = for default).",
  dwclass: "Class/category of the monster (RANK_NORMAL, RANK_BOSS, etc.).",
  bifpart: "Whether the monster has multiple parts (0 = no, 1 = yes).",
  dwkarma: "Karma value of the monster (-2000, =, 2000).",
  dwuseable: "Whether this monster can be used/summoned (=, 1).",

  // Combat stats
  dwactionradius: "Action/attack radius of the monster (= for default).",
  dwatkmin: "Minimum attack damage.",
  dwatkmax: "Maximum attack damage.",
  dwatk1: "Primary attack type (weapon/item ID for monster attacks).",
  dwatk2: "Secondary attack type (weapon/item ID for monster attacks).",
  dwatk3: "Tertiary attack type (weapon/item ID for monster attacks).",

  // Hit rates for different body parts
  dwhorizontalrate: "Horizontal attack hit rate (weapon/item ID or = for default).",
  dwverticalrate: "Vertical attack hit rate (0.35 to 9.0 or = for default).",
  dwdiagonalrate: "Diagonal attack hit rate (= or 0).",
  dwthrustrate: "Thrust attack hit rate (= for default).",
  dwchestrate: "Chest attack hit rate (= for default).",
  dwheadrate: "Head attack hit rate (= for default).",
  dwarmrate: "Arm attack hit rate (= for default).",
  dwlegrate: "Leg attack hit rate (= for default).",

  // Combat timing
  dwattackspeed: "Attack speed of the monster (50 to 1500 or = for default).",
  dwreattackdelay: "Re-attack delay time (60 to 6000ms or = for default).",
  dwadjatkdelay: "Adjusted attack delay.",

  // Health and mana
  dwaddhp: "Additional HP bonus.",
  dwaddmp: "Additional MP bonus (=, 1, 20, 50, 100, 120, 185, 400, 1300, 10000).",

  // Defense stats
  dwnaturealarmor: "Natural armor value.",
  nabrasion: "Abrasion resistance (=, 1, 130).",
  nhardness: "Hardness value (=, 0).",

  // Elemental properties
  eelementtype: "Elemental type of the monster (0-5).",
  welementatk: "Elemental attack power (0-18).",

  // Movement and behavior
  dwhidelevel: "Hide/stealth level (=, 1).",
  fspeed: "Movement speed (0 to 0.25).",
  dwshelter: "Shelter/cover value (= for default).",
  bflying: "Whether the monster can fly (0 = no, 1 = yes).",
  dwjumping: "Jumping ability (= for default).",
  dwairjump: "Air jumping ability (= for default).",
  btaming: "Whether the monster can be tamed (= for default).",

  // Resistance stats
  dwresismagic: "Magic resistance.",
  fresistelecricity: "Electricity resistance.",
  fresistfire: "Fire resistance.",
  fresistwind: "Wind resistance.",
  fresistwater: "Water resistance.",
  fresistearth: "Earth resistance.",

  // Economy and drops
  dwcash: "Cash value when killed.",
  dwsourcematerial: "Source material ID.",
  dwmaterialamount: "Amount of material dropped.",
  dwcohesion: "Cohesion value.",
  dwholdingtime: "Holding time for drops.",
  dwcorrectionvalue: "Correction value for drops.",

  // Experience and progression
  dwexpvalue: "Experience value when killed.",
  nfxpvalue: "Flying experience value.",
  nbodystate: "Body state value.",
  dwaddability: "Additional ability value.",

  // Combat flags
  bkillable: "Whether the monster can be killed (1) or not (0).",

  // Virtual items (drops)
  dwvirtitem1: "Virtual item 1 ID.",
  dwvirttype1: "Virtual item 1 type.",
  dwvirtitem2: "Virtual item 2 ID.",
  dwvirttype2: "Virtual item 2 type.",
  dwvirtitem3: "Virtual item 3 ID.",
  dwvirttype3: "Virtual item 3 type.",

  // Sound effects
  dwsndatk1: "Primary attack sound effect.",
  dwsndatk2: "Secondary attack sound effect.",
  dwsnddie1: "Primary death sound effect.",
  dwsnddie2: "Secondary death sound effect.",
  dwsnddmg1: "Primary damage sound effect.",
  dwsnddmg2: "Secondary damage sound effect.",
  dwsnddmg3: "Tertiary damage sound effect.",
  dwsndidle1: "Primary idle sound effect.",
  dwsndidle2: "Secondary idle sound effect.",
};

export function getMonsterFieldDescription(field: string): string {
  return (
    MONSTER_FIELD_DESCRIPTIONS[field] ||
    "No description yet. You can still edit the value."
  );
}
