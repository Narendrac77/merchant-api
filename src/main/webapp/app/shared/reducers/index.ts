import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import locale, { LocaleState } from './locale';
import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import buisnessInfo, {
  BuisnessInfoState
} from 'app/entities/buisness-info/buisness-info.reducer';
// prettier-ignore
import businessLegal, {
  BusinessLegalState
} from 'app/entities/business-legal/business-legal.reducer';
// prettier-ignore
import businessLegalContact, {
  BusinessLegalContactState
} from 'app/entities/business-legal-contact/business-legal-contact.reducer';
// prettier-ignore
import businessBankAcc, {
  BusinessBankAccState
} from 'app/entities/business-bank-acc/business-bank-acc.reducer';
// prettier-ignore
import fileModel, {
  FileModelState
} from 'app/entities/file-model/file-model.reducer';
// prettier-ignore
import panDetails, {
  PanDetailsState
} from 'app/entities/pan-details/pan-details.reducer';
// prettier-ignore
import bankDetails, {
  BankDetailsState
} from 'app/entities/bank-details/bank-details.reducer';
// prettier-ignore
import gstinDetails, {
  GstinDetailsState
} from 'app/entities/gstin-details/gstin-details.reducer';
// prettier-ignore
import verification, {
  VerificationState
} from 'app/entities/verification/verification.reducer';
// prettier-ignore
import panverification, {
  PanverificationState
} from 'app/entities/panverification/panverification.reducer';
// prettier-ignore
import bankverification, {
  BankverificationState
} from 'app/entities/bankverification/bankverification.reducer';
// prettier-ignore
import gstinverification, {
  GstinverificationState
} from 'app/entities/gstinverification/gstinverification.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly locale: LocaleState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly buisnessInfo: BuisnessInfoState;
  readonly businessLegal: BusinessLegalState;
  readonly businessLegalContact: BusinessLegalContactState;
  readonly businessBankAcc: BusinessBankAccState;
  readonly fileModel: FileModelState;
  readonly panDetails: PanDetailsState;
  readonly bankDetails: BankDetailsState;
  readonly gstinDetails: GstinDetailsState;
  readonly verification: VerificationState;
  readonly panverification: PanverificationState;
  readonly bankverification: BankverificationState;
  readonly gstinverification: GstinverificationState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  locale,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  buisnessInfo,
  businessLegal,
  businessLegalContact,
  businessBankAcc,
  fileModel,
  panDetails,
  bankDetails,
  gstinDetails,
  verification,
  panverification,
  bankverification,
  gstinverification,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
