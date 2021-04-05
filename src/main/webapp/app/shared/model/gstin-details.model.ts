import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';

export interface IGstinDetails {
  id?: number;
  gstin?: string;
  consent?: string;
  mid?: string;
  status?: string;
  buisnessInfo?: IBuisnessInfo;
}

export const defaultValue: Readonly<IGstinDetails> = {};
