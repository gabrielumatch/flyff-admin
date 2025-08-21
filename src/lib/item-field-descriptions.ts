// Centralized descriptions for propitem fields (FlyFF Items)

export const ITEM_FIELD_DESCRIPTIONS: Record<string, string> = {
  // Identity / naming
  dwid: "Item unique identifier (internal ID used by game data).",
  szname: "Resource key/name for this item (used to look up translations).",
  szicon: "Icon asset identifier for the item.",
  sztextfilename: "Linked text filename (legacy content linkage).",
  szcommand: "Special command string for behavior (dev/ops usage).",

  // Classification
  eitemtype: "Item type/category (weapon, armor, consumable, etc.).",
  dwitemjob: "Required job/class to equip or use the item.",
  dwitemlv: "Minimum character level required to use/equip the item.",
  dwitemrare: "Rarity tier of the item.",
  dwweapontype: "Weapon subtype (if applicable).",
  dwatkstyle: "Attack style influenced by the item.",

  // Limits / stacking
  dwpackmax: "Maximum stack size for this item.",
  nmaxduplication: "Maximum duplication count allowed by rules.",

  // Usability / flags
  dwuseable: "Whether the item can be used (1) or not (0).",
  bpermanence: "Whether the item is permanent (consumables are not).",
  dwitemsex: "Gender restriction for this item, if any.",
  dwexclusive: "Exclusive item flag (special restrictions).",
  dwshopable: "Whether the item is available in shops.",
  bcharged: "Whether the item can be charged/has charges.",

  // Requirements / costs
  dwcost: "Base cost value used by economy/balance systems.",
  dwendurance: "Endurance/durability value (for equipment).",
  nmaxrepair: "Maximum number of repairs allowed.",

  // Basic combat stats
  witemeatk: "Base attack value contributed by the item.",
  dwparry: "Parry chance/related defensive stat.",
  dwblockrating: "Block rating for the item.",
  fattackspeed: "Attack speed modifier provided by the item.",

  // Effects and parameters
  dwdestparam0: "Primary destination parameter affected (stat/effect ID).",
  dwdestparam1: "Secondary destination parameter affected.",
  dwdestparam2: "Tertiary destination parameter affected.",
  nadjparamval0: "Adjustment value for destination param 0.",
  nadjparamval1: "Adjustment value for destination param 1.",
  nadjparamval2: "Adjustment value for destination param 2.",
  dwchgparamval0: "Change value used by item scripts (slot 0).",
  dwchgparamval1: "Change value used by item scripts (slot 1).",
  dwchgparamval2: "Change value used by item scripts (slot 2).",

  // Triggered skills
  dwactiveskill: "Active skill linked to this item.",
  dwactiveskilllv: "Level of the active skill.",
  dwactiveskillrate: "Activation rate of the active skill.",
  dwhitactiveskillid: "Skill triggered on hit: ID.",
  dwhitactiveskilllv: "Skill triggered on hit: level.",
  dwhitactiveskillprob: "Skill triggered on hit: probability.",
  dwhitactiveskilltarget: "Skill triggered on hit: target type.",
  dwdamageactiveskillid: "Skill triggered on damage: ID.",
  dwdamageactiveskilllv: "Skill triggered on damage: level.",
  dwdamageactiveskillprob: "Skill triggered on damage: probability.",
  dwdamageactiveskilltarget: "Skill triggered on damage: target type.",
  dwequipactiveskillid: "Skill triggered on equip: ID.",
  dwequipactiveskilllv: "Skill triggered on equip: level.",

  // Ranges / timings
  _dwskillrange: "Skill range value stored with the item (legacy).",
  dwloadingtime: "Time required before item action completes.",
  dwattackrange: "Effective attack range granted by the item.",

  // Elements / visuals / sounds
  dwsfxelemental: "Elemental visual effect.",
  dwsfxobj: "Primary SFX object.",
  dwsfxobj2: "Secondary SFX object.",
  dwsfxobj3: "Tertiary SFX object.",
  dwsfxobj4: "Quaternary SFX object.",
  dwsfxobj5: "Quinary SFX object.",
  dwsndattack1: "Primary sound effect on attack/use.",
  dwsndattack2: "Secondary sound effect on attack/use.",

  // Resistances
  nitemresistelecricity: "Electric resistance provided by the item.",
  nitemresistfire: "Fire resistance provided by the item.",
  nitemresistwind: "Wind resistance provided by the item.",
  nitemresistwater: "Water resistance provided by the item.",
  nitemresistearth: "Earth resistance provided by the item.",

  // Misc
  dwquestid: "Quest link identifier (if item ties to a quest).",
  dwexp: "Experience related to this item (gain/use).",
  dwcombostyle: "Combo style flag, used in advanced systems.",
};

export function getItemFieldDescription(field: string): string {
  return (
    ITEM_FIELD_DESCRIPTIONS[field] ||
    "No description yet. You can still edit the value."
  );
}
