import type { TPropJob } from "@/types/database";

// Define which fields should be rendered as each type
export const SELECT_FIELDS: Array<keyof TPropJob> = [
  'jobname', // Job name - will have static options
];

export const NUMBER_FIELDS: Array<keyof TPropJob> = [
  // All scale and weapon fields are numeric
  'attackspeed', 'maxhpscale', 'maxmpscale', 'maxfpscale', 'defensescale',
  'hprecoveryscale', 'mprecoveryscale', 'fprecoveryscale',
  'swd', 'axe', 'staff', 'stick', 'knuckle', 'wand', 'blocking', 'yoyo', 'critical'
];

export const HIDDEN_FIELDS: Array<keyof TPropJob> = [
  'created_at', 'updated_at', 'deleted_at'
];

// Helper functions
export function isSelectField(field: keyof TPropJob): boolean {
  return SELECT_FIELDS.includes(field);
}

export function isNumberField(field: keyof TPropJob): boolean {
  return NUMBER_FIELDS.includes(field);
}

export function isHiddenField(field: keyof TPropJob): boolean {
  return HIDDEN_FIELDS.includes(field);
}

// Number field constraints
export function getNumberFieldConstraints(field: keyof TPropJob): { 
  min: number; max: number; step: number; 
} | null {
  const constraints = {
    // Attack speed: 50-150 range
    attackspeed: { min: 50, max: 150, step: 1 },
    
    // Scale fields: 0.1-10.0 range with 0.1 step
    maxhpscale: { min: 0.1, max: 10.0, step: 0.1 },
    maxmpscale: { min: 0.1, max: 10.0, step: 0.1 },
    maxfpscale: { min: 0.1, max: 10.0, step: 0.1 },
    defensescale: { min: 0.1, max: 10.0, step: 0.1 },
    hprecoveryscale: { min: 0.1, max: 10.0, step: 0.1 },
    mprecoveryscale: { min: 0.1, max: 10.0, step: 0.1 },
    fprecoveryscale: { min: 0.1, max: 10.0, step: 0.1 },
    
    // Weapon proficiency: 0-10 range
    swd: { min: 0, max: 10, step: 0.1 },
    axe: { min: 0, max: 10, step: 0.1 },
    staff: { min: 0, max: 10, step: 0.1 },
    stick: { min: 0, max: 10, step: 0.1 },
    knuckle: { min: 0, max: 10, step: 0.1 },
    wand: { min: 0, max: 10, step: 0.1 },
    blocking: { min: 0, max: 10, step: 0.1 },
    yoyo: { min: 0, max: 10, step: 0.1 },
    critical: { min: 0, max: 10, step: 0.1 },
  };
  return constraints[field as keyof typeof constraints] || null;
}
