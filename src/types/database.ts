// Re-export types from individual files for backward compatibility
export type { TPropItem as ItemRecord } from '@/types/database/propitem';
export type { TPropSkill as SkillRecord } from '@/types/database/propskill';
export type { TPropTranslation as TranslationRecord } from '@/types/database/proptranslation';

// Also export the new type names
export type { TPropItem } from '@/types/database/propitem';
export type { TPropSkill } from '@/types/database/propskill';
export type { TPropTranslation } from '@/types/database/proptranslation';

