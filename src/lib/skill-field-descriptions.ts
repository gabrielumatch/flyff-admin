// Centralized descriptions for propskill fields (FlyFF)
// Add or refine as you learn more specifics.

export const SKILL_FIELD_DESCRIPTIONS: Record<string, string> = {
  // Identity / naming
  dwid: "Skill unique identifier (internal ID used by game data).",
  szname: "Resource key/name for this skill (used to look up translations).",
  szicon: "Icon asset identifier for the skill.",
  sztextfile: "Text file reference for the skill (legacy content linkage).",
  szcomment: "Developer note or comment about this skill.",

  // Classification
  dwskilltype: "Skill category/type (e.g., attack, buff, debuff).",
  dwitemjob: "Required job/class to use the skill (e.g., JOB_MERCENARY).",
  dwitemlv: "Minimum character level required to use the skill.",
  dwitemsex: "Gender restriction for the skill, if any.",
  dwuseable: "Whether this skill can be used/learned (1) or not (0).",
  dwexclusive: "Exclusive flag: skill restricted by special conditions.",
  bpermanence: "Whether the skill is permanent/persisting in effect.",

  // Costs / requirements
  dwreqmp: "MP (mana) required to cast the skill.",
  dwrepfp: "FP (stamina) required to use the skill.",
  dwcost: "General cost value (used by some systems for balance/economy).",
  dwendurance: "Endurance/durability consumed or required.",

  // Progression / mastery
  dwexpertlv: "Expert level requirement for using the skill.",
  expertmax: "Maximum expert mastery for this skill.",
  dwexp: "Experience awarded or needed related to the skill.",

  // Timing / duration
  dwloadingtime: "Cast time or load time before the skill activates.",
  dwskilltime: "Duration of the skill effect after activation.",
  dwcircletime: "Interval or tick time related to periodic effects.",

  // Ranges / targeting
  dwskillrange: "Effective range of the skill from the caster to target.",
  dwattackrange: "Attack range (used by attack-type skills/behaviors).",
  dwexetarget: "Execution target type (self, enemy, area, etc.).",
  dwspellregion: "Region/area shape used by the skill (e.g., AoE).",

  // Chance / probability
  dwusechance: "Chance to successfully use/apply the skill.",
  dwprobability: "Base probability for random effects within the skill.",

  // Adjustments / parameters
  dwdestparam1: "Primary destination parameter affected (stat/effect ID).",
  dwdestparam2: "Secondary destination parameter affected.",
  dwdestparam3: "Tertiary destination parameter affected.",
  nadjparamval1: "Primary adjustment value applied to destination param 1.",
  nadjparamval2: "Secondary adjustment value applied to destination param 2.",
  nadjparamval3: "Tertiary adjustment value applied to destination param 3.",
  dwchgparamval1: "Primary change value used by scripted skill logic.",
  dwchgparamval2: "Secondary change value used by scripted skill logic.",
  dwchgparamval3: "Tertiary change value used by scripted skill logic.",
  dwdestdata1: "Auxiliary data for destination param 1 (mode/index/etc.).",
  dwdestdata2: "Auxiliary data for destination param 2.",
  dwdestdata3: "Auxiliary data for destination param 3.",

  // Effects / visuals / sounds
  dwsfxelemental: "Elemental visual effect used by the skill.",
  dwsfxobj: "Primary SFX object reference.",
  dwsfxobj2: "Secondary SFX object reference.",
  dwsfxobj3: "Tertiary SFX object reference.",
  dwsfxobj4: "Quaternary SFX object reference.",
  dwsfxobj5: "Quinary SFX object reference.",
  dwsndattack1: "Primary sound effect for attack/cast.",
  dwsndattack2: "Secondary sound effect for attack/cast.",

  // Prerequisites / linking
  dwreskill1: "Required skill 1 to unlock/use this skill.",
  dwreskilllevel1: "Required level of skill 1.",
  dwreskill2: "Required skill 2 to unlock/use this skill.",
  dwreskilllevel2: "Required level of skill 2.",

  // Combat stats / behavior
  dwaddskillmin: "Minimum added skill power/bonus.",
  dwaddskillmax: "Maximum added skill power/bonus.",
  dwatkstyle: "Attack style used (melee, ranged, magic, etc.).",
  dwweapontype: "Required weapon type to use the skill.",
  dwitematkorder1: "Attack order or animation segment 1.",
  dwitematkorder2: "Attack order or animation segment 2.",
  dwitematkorder3: "Attack order or animation segment 3.",
  dwitematkorder4: "Attack order or animation segment 4.",
  nadjhitrate: "Adjustment to hit rate/accuracy.",
  dwattackspeed: "Attack speed or action speed multiplier.",
  dwdmgshift: "Damage conversion/shift parameter.",

  // Linking / bullets (for certain skill types)
  dwlinkkindbullet: "Bullet/link kind used for ranged/projectile skills.",
  dwlinkkind: "General link kind identifier.",

  // Motion / animation
  dwusemotion: "Motion/animation used when casting the skill.",

  // Misc / flags
  blog: "Log/debug flag.",
  bcharged: "Whether the skill can be charged or has charge levels.",
  dwquestid: "Quest link identifier, if this skill ties to a quest.",
  dwbuffticktype: "Buff ticking mode (how periodic effects apply).",
};

export function getSkillFieldDescription(field: string): string {
  return (
    SKILL_FIELD_DESCRIPTIONS[field] ||
    "No description yet. You can still edit the value."
  );
}
