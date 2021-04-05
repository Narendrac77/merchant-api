import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';

export interface IBusinessLegal {
  id?: number;
  legalName?: string;
  regAddress?: string;
  incorporation?: string;
  panNumber?: string;
  gstInNumber?: string;
  buisnessInfo?: IBuisnessInfo;
}

export const defaultValue: Readonly<IBusinessLegal> = {};
