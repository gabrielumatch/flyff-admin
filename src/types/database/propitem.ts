import { BaseRecord } from '@/types/common';

export interface TPropItem extends BaseRecord {
  dwid: string;
  szname: string;
  dwitemjob?: string | null;
  dwitemlv?: string | null;
  eitemtype?: string | null;
  dwitemrare?: string | null;
  [key: string]: string | null | undefined;
}
