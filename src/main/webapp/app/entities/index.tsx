import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BuisnessInfo from './buisness-info';
import BusinessLegal from './business-legal';
import BusinessLegalContact from './business-legal-contact';
import BusinessBankAcc from './business-bank-acc';
import FileModel from './file-model';
import PanDetails from './pan-details';
import BankDetails from './bank-details';
import GstinDetails from './gstin-details';
import Verification from './verification';
import Panverification from './panverification';
import Bankverification from './bankverification';
import Gstinverification from './gstinverification';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}buisness-info`} component={BuisnessInfo} />
      <ErrorBoundaryRoute path={`${match.url}business-legal`} component={BusinessLegal} />
      <ErrorBoundaryRoute path={`${match.url}business-legal-contact`} component={BusinessLegalContact} />
      <ErrorBoundaryRoute path={`${match.url}business-bank-acc`} component={BusinessBankAcc} />
      <ErrorBoundaryRoute path={`${match.url}file-model`} component={FileModel} />
      <ErrorBoundaryRoute path={`${match.url}pan-details`} component={PanDetails} />
      <ErrorBoundaryRoute path={`${match.url}bank-details`} component={BankDetails} />
      <ErrorBoundaryRoute path={`${match.url}gstin-details`} component={GstinDetails} />
      <ErrorBoundaryRoute path={`${match.url}verification`} component={Verification} />
      <ErrorBoundaryRoute path={`${match.url}panverification`} component={Panverification} />
      <ErrorBoundaryRoute path={`${match.url}bankverification`} component={Bankverification} />
      <ErrorBoundaryRoute path={`${match.url}gstinverification`} component={Gstinverification} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
