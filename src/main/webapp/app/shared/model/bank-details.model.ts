import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';

export interface IBankDetails {
  id?: number;
  accountNumber?: string;
  iFSCCode?: string;
  name?: string;
  mid?: string;
  status?: string;
  buisnessInfo?: IBuisnessInfo;
}

export const defaultValue: Readonly<IBankDetails> = {};
