import { PaginationParams } from '@/types/common';

// Supabase response types
export interface SupabaseResponse<T> {
  data: T[] | null;
  error: unknown;
  count: number | null;
}

// API request types
export interface CreateTranslationRequest {
  szname: string;
  [key: string]: string | undefined;
}

export interface UpdateTranslationRequest extends Partial<CreateTranslationRequest> {
  szname?: string;
}

export interface CreateItemRequest {
  dwid: string;
  szname: string;
  [key: string]: string | null | undefined;
}

export interface UpdateItemRequest extends Partial<CreateItemRequest> {
  dwid?: string;
}

export interface CreateSkillRequest {
  dwid: string;
  [key: string]: string | null | undefined;
}

export interface UpdateSkillRequest extends Partial<CreateSkillRequest> {
  dwid?: string;
}

// Filter types
export interface ItemFilters {
  job?: string;
  level?: string;
  kind1?: string;
  kind2?: string;
  kind3?: string;
  search?: string;
}

export interface SkillFilters {
  job?: string;
  level?: string;
  kind1?: string;
  kind2?: string;
  kind3?: string;
  search?: string;
}

export interface TranslationFilters {
  search?: string;
  language?: string;
}

// Database query types
export interface QueryOptions extends PaginationParams {
  filters?: ItemFilters | SkillFilters | TranslationFilters;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
