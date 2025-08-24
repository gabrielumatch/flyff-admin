import type { TPropMover } from '@/types/database';

// Common form field types that should be rendered as select dropdowns
export const SELECT_FIELDS: Array<keyof TPropMover> = [
  // Fields with static options we've created
  'dwlevel',
  'dwrace',
  'dwgender',
  'dwsize',
  'dwclass',
  'dwuseable',
  'bflying',
  'btaming',
  'bkillable',
  'dwai',
  'dwbelligerence',
  'bifpart',
  'dwkarma',
  'dwactionradius',
  'dwatk1',
  'dwatk2',
  'dwatk3',
  'dwhorizontalrate',
  'dwverticalrate',
  'dwdiagonalrate',
  'dwthrustrate',
  'dwchestrate',
  'dwheadrate',
  'dwarmrate',
  'dwlegrate',
  'dwattackspeed',
  'dwreattackdelay',
  // Additional fields that should be select dropdowns
  'dwer',
  'dwfilghtlevel',
  'dwatkmin',
  'dwatkmax',
  'dwaddhp',
  'dwaddmp',
  'dwnaturealarmor',
  'nabrasion',
  'nhardness',
  'dwadjatkdelay',
  'eelementtype',
  'welementatk',
  'dwhidelevel',
  'fspeed',
  'dwshelter',
  'dwjumping',
  'dwairjump',
  'dwresismagic',
  'fresistelecricity',
  'fresistfire',
  'fresistwind',
  'fresistwater',
  'fresistearth',
  'dwcash',
  'dwsourcematerial',
  'dwmaterialamount',
  'dwcohesion',
  'dwholdingtime',
  'dwcorrectionvalue',
  'dwexpvalue',
  'nfxpvalue',
  'nbodystate',
  'dwaddability',
  'dwvirtitem1',
  'dwvirttype1',
  'dwvirtitem2',
  'dwvirttype2',
  'dwvirtitem3',
  'dwvirttype3',
  'dwsndatk1',
  'dwsndatk2',
  'dwsnddie1',
  'dwsnddie2',
  'dwsnddmg1',
  'dwsnddmg2',
  'dwsnddmg3',
  'dwsndidle1',
  'dwsndidle2',
];

// Fields that should be rendered as number inputs with specific ranges
export const NUMBER_FIELDS: Array<keyof TPropMover> = [
  'dwstr',   // Strength: 1-5000
  'dwsta',   // Stamina: 1-5000
  'dwdex',   // Dexterity: 1-5000
  'dwint',   // Intelligence: 1-5000
];

// Fields that accept both numbers and specific string values (using regex validation)
export const HYBRID_FIELDS: Array<keyof TPropMover> = [
  'dwhr',    // Hit Rate: 0-4000 or "="
];

// Fields that should be hidden or not editable
export const HIDDEN_FIELDS: Array<keyof TPropMover> = [
  'dwid',
];

// Required fields for validation
export const REQUIRED_FIELDS: Array<keyof TPropMover> = [
  'szname',
  'dwlevel',
];

// Helper function to check if a field should be rendered as a select
export function isSelectField(fieldName: keyof TPropMover): boolean {
  return SELECT_FIELDS.includes(fieldName);
}

// Helper function to check if a field should be rendered as a number input
export function isNumberField(fieldName: keyof TPropMover): boolean {
  return NUMBER_FIELDS.includes(fieldName);
}

// Helper function to get number field constraints
export function getNumberFieldConstraints(fieldName: keyof TPropMover): { min: number; max: number; step: number } | null {
  const constraints = {
    dwstr: { min: 1, max: 5000, step: 1 },
    dwsta: { min: 1, max: 5000, step: 1 },
    dwdex: { min: 1, max: 5000, step: 1 },
    dwint: { min: 1, max: 5000, step: 1 },
  };
  
  return constraints[fieldName as keyof typeof constraints] || null;
}

// Helper function to check if a field should be rendered as a hybrid field
export function isHybridField(fieldName: keyof TPropMover): boolean {
  return HYBRID_FIELDS.includes(fieldName);
}

// Helper function to get hybrid field constraints
export function getHybridFieldConstraints(fieldName: keyof TPropMover): { 
  min: number; 
  max: number; 
  step: number; 
  stringOptions: string[];
  regex: RegExp;
  placeholder: string;
} | null {
  const constraints = {
    dwhr: { 
      min: 0, 
      max: 4000, 
      step: 1, 
      stringOptions: ["="],
      regex: /^(=|[0-9]{1,4})$/,
      placeholder: "Enter number (0-4000) or ="
    },
  };
  
  return constraints[fieldName as keyof typeof constraints] || null;
}

// Helper function to validate hybrid field value
export function validateHybridFieldValue(fieldName: keyof TPropMover, value: string): boolean {
  const constraints = getHybridFieldConstraints(fieldName);
  if (!constraints) return false;
  
  // Check if it matches the regex pattern
  if (!constraints.regex.test(value)) return false;
  
  // If it's a number, check the range
  if (value !== "=") {
    const numValue = parseInt(value, 10);
    return numValue >= constraints.min && numValue <= constraints.max;
  }
  
  return true;
}

// Helper function to check if a field should be hidden
export function isHiddenField(fieldName: keyof TPropMover): boolean {
  return HIDDEN_FIELDS.includes(fieldName);
}

// Helper function to check if a field is required
export function isRequiredField(fieldName: keyof TPropMover): boolean {
  return REQUIRED_FIELDS.includes(fieldName);
}

// Helper function to get field display name
export function getFieldDisplayName(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize each word
}
