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
  'dwstr',
  'dwsta',
  'dwdex',
  'dwint',
  'dwhr',
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
