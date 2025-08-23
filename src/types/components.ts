import { TPropTranslation, TPropItem, TPropSkill } from '@/types/database';
import { TableConfig } from '@/types/common';

// Table component props
export type TranslationTableProps = TableConfig;

export type ItemTableProps = TableConfig;

export type SkillTableProps = TableConfig;

// Modal component props
export interface TranslationEditModalProps {
  record: TPropTranslation | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: TPropTranslation) => void;
}

export interface TranslationAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: TPropTranslation) => void;
}

export interface ItemEditModalProps {
  record: TPropItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: TPropItem) => void;
}

export interface ItemAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: TPropItem) => void;
}

export interface SkillEditModalProps {
  record: TPropSkill | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: TPropSkill) => void;
}

export interface SkillAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: TPropSkill) => void;
}

// Form field types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'textarea';
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  description?: string;
}
