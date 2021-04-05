import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';

export interface IPanDetails {
  id?: number;
  panNumber?: string;
  consent?: string;
  name?: string;
  mid?: string;
  status?: string;
  buisnessInfo?: IBuisnessInfo;
}

export const defaultValue: Readonly<IPanDetails> = {};
