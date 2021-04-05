import { IPanDetails } from 'app/shared/model/pan-details.model';
import { IBankDetails } from 'app/shared/model/bank-details.model';
import { IGstinDetails } from 'app/shared/model/gstin-details.model';
import { IBusinessLegal } from 'app/shared/model/business-legal.model';
import { IBusinessLegalContact } from 'app/shared/model/business-legal-contact.model';
import { IBusinessBankAcc } from 'app/shared/model/business-bank-acc.model';
import { IFileModel } from 'app/shared/model/file-model.model';

export interface IBuisnessInfo {
  id?: number;
  displayName?: string;
  businessType?: string;
  businessCategory?: string;
  businessSubCategory?: string;
  country?: string;
  pincode?: string;
  addline1?: string;
  addline2?: string;
  contactName?: string;
  email?: string;
  mobileNumber?: string;
  websiteUrl?: string;
  age?: string;
  turnOver?: string;
  panDetails?: IPanDetails;
  bankDetails?: IBankDetails;
  gstinDetails?: IGstinDetails;
  businessLegals?: IBusinessLegal[];
  businessLegalContacts?: IBusinessLegalContact[];
  businessBankAccs?: IBusinessBankAcc[];
  fileModels?: IFileModel[];
}

export const defaultValue: Readonly<IBuisnessInfo> = {};
