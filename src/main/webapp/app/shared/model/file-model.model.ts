import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';

export interface IFileModel {
  id?: number;
  fileId?: string;
  fileName?: string;
  fileType?: string;
  imageDataContentType?: string;
  imageData?: any;
  buisnessInfo?: IBuisnessInfo;
}

export const defaultValue: Readonly<IFileModel> = {};
