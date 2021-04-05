import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';

export interface IBusinessBankAcc {
  id?: number;
  accountNumber?: string;
  ifscCode?: string;
  accountName?: string;
  buisnessInfo?: IBuisnessInfo;
}

export const defaultValue: Readonly<IBusinessBankAcc> = {};
