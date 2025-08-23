import type { TPropSkill } from '@/types/database';

// Common form field types that should be rendered as select dropdowns
export const SELECT_FIELDS: Array<keyof TPropSkill> = [
  'dwitemjob',
  'dwitemlv',
  'eitemtype',
  'dwitemrare',
  'dwactiveskill',
  'dwactiveskilllv',
  'dwactiveskillper',
  'dwreqmp',
  'dwrepfp',
  'dwreqdislv',
  'dwreskill1',
  'dwreskilllevel1',
  'dwreskill2',
  'dwreskilllevel2',
  'dwskillreadytype',
  'dwskillready',
  'dwskillrange',
  'dwsfxelemental',
  'dwsfxobj',
  'dwsfxobj2',
  'dwsfxobj3',
  'dwsfxobj4',
  'dwsfxobj5',
  'dwusemotion',
  'dwcircletime',
  'dwskilltime',
  'dwexetarget',
  'dwusechance',
  'dwspellregion',
  'dwspelltype',
  'dwreferstat1',
  'dwreferstat2',
  'dwrefertarget1',
  'dwrefertarget2',
  'dwrefervalue1',
  'dwrefervalue2',
  'dwskilltype',
  'fitemresistelecricity',
  'fitemresistfire',
  'fitemresistwind',
  'fitemresistwater',
  'fitemresistearth',
  'nevildoing',
  'dwexpertlv',
  'expertmax',
  'dwsubdefine',
  'dwexp',
  'dwcombostyle',
  'fflightspeed',
  'fflightlrangle',
  'fflighttbangle',
  'dwflightlimit',
  'dwffuelremax',
  'dwafuelremax',
  'dwfuelre',
  'dwlimitlevel1',
  'dwreflect',
  'dwsndattack1',
  'dwsndattack2',
  'dwquestid',
  'sztextfile',
  'dwdestdata1',
  'dwdestdata2',
  'dwdestdata3',
];

// Fields that should be hidden or not editable
export const HIDDEN_FIELDS: Array<keyof TPropSkill> = [
  'dwid',
];

// Required fields for validation
export const REQUIRED_FIELDS: Array<keyof TPropSkill> = [
  'szname',
  'dwitemjob',
  'dwitemlv',
];

// Helper function to check if a field should be rendered as a select
export function isSelectField(fieldName: keyof TPropSkill): boolean {
  return SELECT_FIELDS.includes(fieldName);
}

// Helper function to check if a field should be hidden
export function isHiddenField(fieldName: keyof TPropSkill): boolean {
  return HIDDEN_FIELDS.includes(fieldName);
}

// Helper function to check if a field is required
export function isRequiredField(fieldName: keyof TPropSkill): boolean {
  return REQUIRED_FIELDS.includes(fieldName);
}

// Helper function to get field display name
export function getFieldDisplayName(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, str => str.toUpperCase()) // Capitalize first letter
    .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize each word
}
