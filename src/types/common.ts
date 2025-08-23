// Common utility types and constants

export interface BaseRecord {
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface PaginationParams {
  page: number;
  limit: number;
  search?: string;
}

export interface PaginationResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

// Language configuration
export interface Language {
  code: string;
  name: string;
  flag: string;
}

export const LANGUAGES: Language[] = [
  { code: "10_pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "1_us", name: "English", flag: "🇺🇸" },
  { code: "7_es", name: "Spanish", flag: "🇪🇸" },
  { code: "0_kr", name: "Korean", flag: "🇰🇷" },
  { code: "2_jp", name: "Japanese", flag: "🇯🇵" },
  { code: "3_cn", name: "Chinese", flag: "🇨🇳" },
  { code: "4_th", name: "Thai", flag: "🇹🇭" },
  { code: "5_tw", name: "Taiwanese", flag: "🇹🇼" },
  { code: "6_de", name: "German", flag: "🇩🇪" },
  { code: "8_fr", name: "French", flag: "🇫🇷" },
  { code: "9_hk", name: "Hong Kong", flag: "🇭🇰" },
  { code: "11_vn", name: "Vietnamese", flag: "🇻🇳" },
  { code: "12_ru", name: "Russian", flag: "🇷🇺" },
  { code: "13_ph", name: "Filipino", flag: "🇵🇭" },
  { code: "14_id", name: "Indonesian", flag: "🇮🇩" },
];

// Table configuration
export interface TableConfig {
  tableName: string;
  title: string;
  description: string;
}
