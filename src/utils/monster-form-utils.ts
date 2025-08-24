import type { TPropMover } from '@/types/database';

// Common form field types that should be rendered as select dropdowns
export const SELECT_FIELDS: Array<keyof TPropMover> = [
  // Fields with static options we've created
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
  'dwaddmp',
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
  'fresistelecricity',
  'fresistfire',
  'fresistwind',
  'fresistwater',
  'fresistearth',
  'dwsourcematerial',
  'dwmaterialamount',
  'dwcohesion',
  'dwholdingtime',
  'dwcorrectionvalue',
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
  'dwexpvalue', // Experience value: 0-560980280 (float)
];

// Fields that accept both numbers and specific string values (using regex validation)
export const HYBRID_FIELDS: Array<keyof TPropMover> = [
  'dwhr',    // Hit Rate: 0-4000 or "="
  'dwer',    // Evasion Rate: 0-26000 or "="
  'dwlevel', // Level: 1-250 or "="
  'dwfilghtlevel', // Flight Level: 1-2000 or "="
  'dwatkmin', // Minimum attack damage: 0-300000 or "="
  'dwatkmax', // Maximum attack damage: 0-300000 or "="
  'dwnaturealarmor', // Natural armor: 0-2000 or "="
  'dwresismagic', // Magic resistance: 0-1500000 or "="
  'dwaddhp', // Additional HP bonus: 1-700000000 (float) or "="
  'dwcash', // Cash value: 0-1000000 or "=" or "FALSE"
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
    dwexpvalue: { min: 0, max: 560980280, step: 0.01 },
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
    dwer: { 
      min: 0, 
      max: 26000, 
      step: 1, 
      stringOptions: ["="],
      regex: /^(=|[0-9]{1,5})$/,
      placeholder: "Enter number (0-26000) or ="
    },
    dwlevel: { 
      min: 1, 
      max: 250, 
      step: 1, 
      stringOptions: ["="],
      regex: /^(=|[0-9]{1,3})$/,
      placeholder: "Enter number (1-250) or ="
    },
    dwfilghtlevel: { 
      min: 1, 
      max: 2000, 
      step: 1, 
      stringOptions: ["="],
      regex: /^(=|[0-9]{1,4})$/,
      placeholder: "Enter number (1-2000) or ="
    },
    dwatkmin: { 
      min: 0, 
      max: 300000, 
      step: 1, 
      stringOptions: ["="],
      regex: /^(=|[0-9]{1,6})$/,
      placeholder: "Enter number (0-300000) or ="
    },
    dwatkmax: { 
      min: 0, 
      max: 300000, 
      step: 1, 
      stringOptions: ["="],
      regex: /^(=|[0-9]{1,6})$/,
      placeholder: "Enter number (0-300000) or ="
    },
    dwnaturealarmor: { 
      min: 0, 
      max: 2000, 
      step: 1, 
      stringOptions: ["="],
      regex: /^(=|[0-9]{1,4})$/,
      placeholder: "Enter number (0-2000) or ="
    },
    dwresismagic: { 
      min: 0, 
      max: 1500000, 
      step: 1, 
      stringOptions: ["="],
      regex: /^(=|[0-9]{1,7})$/,
      placeholder: "Enter number (0-1500000) or ="
    },
    dwaddhp: { 
      min: 1, 
      max: 700000000, 
      step: 0.01, 
      stringOptions: ["="],
      regex: /^(=|[0-9]+(\.[0-9]+)?)$/,
      placeholder: "Enter number (1-700000000) or ="
    },
    dwcash: { 
      min: 0, 
      max: 1000000, 
      step: 1, 
      stringOptions: ["=", "FALSE"],
      regex: /^(=|FALSE|[0-9]{1,7})$/,
      placeholder: "Enter number (0-1000000), =, or FALSE"
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
