// Centralized descriptions for propmover fields (FlyFF)
// Add or refine as you learn more specifics.

export const MONSTER_FIELD_DESCRIPTIONS: Record<string, string> = {
  // Identity / naming
  dwid: "Monster unique identifier (internal ID used by game data).",
  szname: "Resource key/name for this monster (used to look up translations).",
  szcomment: "Developer note or comment about this monster.",

  // Basic stats
  dwai: "Artificial Intelligence level of the monster.",
  dwstr: "Strength stat of the monster.",
  dwsta: "Stamina stat of the monster.",
  dwdex: "Dexterity stat of the monster.",
  dwint: "Intelligence stat of the monster.",
  dwhr: "Hit Rate stat of the monster.",
  dwer: "Evasion Rate stat of the monster.",

  // Classification
  dwrace: "Race/type of the monster (e.g., RACE_HUMAN, RACE_ANIMAL).",
  dwbelligerence: "Aggression level of the monster.",
  dwgender: "Gender of the monster (GENDER_MALE, GENDER_FEMALE, etc.).",
  dwlevel: "Level of the monster.",
  dwfilghtlevel: "Flight level requirement for the monster.",
  dwsize: "Size category of the monster (SIZE_SMALL, SIZE_LARGE, etc.).",
  dwclass: "Class/category of the monster (CLASS_NORMAL, CLASS_BOSS, etc.).",
  bifpart: "Whether the monster has multiple parts.",
  dwkarma: "Karma value of the monster.",
  dwuseable: "Whether this monster can be used/summoned (1) or not (0).",

  // Combat stats
  dwactionradius: "Action/attack radius of the monster.",
  dwatkmin: "Minimum attack damage.",
  dwatkmax: "Maximum attack damage.",
  dwatk1: "Primary attack type.",
  dwatk2: "Secondary attack type.",
  dwatk3: "Tertiary attack type.",

  // Hit rates for different body parts
  dwhorizontalrate: "Horizontal attack hit rate.",
  dwverticalrate: "Vertical attack hit rate.",
  dwdiagonalrate: "Diagonal attack hit rate.",
  dwthrustrate: "Thrust attack hit rate.",
  dwchestrate: "Chest attack hit rate.",
  dwheadrate: "Head attack hit rate.",
  dwarmrate: "Arm attack hit rate.",
  dwlegrate: "Leg attack hit rate.",

  // Combat timing
  dwattackspeed: "Attack speed of the monster.",
  dwreattackdelay: "Re-attack delay time.",
  dwadjatkdelay: "Adjusted attack delay.",

  // Health and mana
  dwaddhp: "Additional HP bonus.",
  dwaddmp: "Additional MP bonus.",

  // Defense stats
  dwnaturealarmor: "Natural armor value.",
  nabrasion: "Abrasion resistance.",
  nhardness: "Hardness value.",

  // Elemental properties
  eelementtype: "Elemental type of the monster.",
  welementatk: "Elemental attack power.",

  // Movement and behavior
  dwhidelevel: "Hide/stealth level.",
  fspeed: "Movement speed.",
  dwshelter: "Shelter/cover value.",
  bflying: "Whether the monster can fly (1) or not (0).",
  dwjumping: "Jumping ability.",
  dwairjump: "Air jumping ability.",
  btaming: "Whether the monster can be tamed (1) or not (0).",

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
