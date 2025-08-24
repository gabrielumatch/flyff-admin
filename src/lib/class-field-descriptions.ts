export const CLASS_FIELD_DESCRIPTIONS: Record<string, string> = {
  jobname: "Job/class name (e.g., JOB_ACROBAT, JOB_ASSIST, JOB_BILLPOSTER).",
  attackspeed: "Attack speed modifier (50-150). Higher values = faster attacks.",
  maxhpscale: "Maximum HP scaling factor (0.1-10.0). Multiplier for base HP.",
  maxmpscale: "Maximum MP scaling factor (0.1-10.0). Multiplier for base MP.",
  maxfpscale: "Maximum FP scaling factor (0.1-10.0). Multiplier for base FP.",
  defensescale: "Defense scaling factor (0.1-10.0). Multiplier for base defense.",
  hprecoveryscale: "HP recovery scaling factor (0.1-10.0). Multiplier for HP recovery rate.",
  mprecoveryscale: "MP recovery scaling factor (0.1-10.0). Multiplier for MP recovery rate.",
  fprecoveryscale: "FP recovery scaling factor (0.1-10.0). Multiplier for FP recovery rate.",
  swd: "Sword weapon proficiency (0-10). Higher values = better sword usage.",
  axe: "Axe weapon proficiency (0-10). Higher values = better axe usage.",
  staff: "Staff weapon proficiency (0-10). Higher values = better staff usage.",
  stick: "Stick weapon proficiency (0-10). Higher values = better stick usage.",
  knuckle: "Knuckle weapon proficiency (0-10). Higher values = better knuckle usage.",
  wand: "Wand weapon proficiency (0-10). Higher values = better wand usage.",
  blocking: "Blocking proficiency (0-10). Higher values = better blocking ability.",
  yoyo: "Yoyo weapon proficiency (0-10). Higher values = better yoyo usage.",
  critical: "Critical hit proficiency (0-10). Higher values = better critical hit chance.",
  created_at: "Timestamp when this job class was created.",
  updated_at: "Timestamp when this job class was last updated.",
  deleted_at: "Timestamp when this job class was soft deleted (if applicable).",
};

export function getClassFieldDescription(field: string): string {
  return CLASS_FIELD_DESCRIPTIONS[field] || `Field: ${field}`;
}
