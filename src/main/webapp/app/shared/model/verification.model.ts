export interface IVerification {
  id?: number;
  mid?: string;
  panStatus?: string;
  bankStatus?: string;
  gstinStatus?: string;
}

export const defaultValue: Readonly<IVerification> = {};
