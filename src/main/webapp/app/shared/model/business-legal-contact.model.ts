import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';

export interface IBusinessLegalContact {
  id?: number;
  contactName?: string;
  contactMobile?: string;
  contactEmail?: string;
  aadharNumber?: string;
  buisnessInfo?: IBuisnessInfo;
}

export const defaultValue: Readonly<IBusinessLegalContact> = {};
