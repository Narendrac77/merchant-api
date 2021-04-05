import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Bankverification from './bankverification';
import BankverificationDetail from './bankverification-detail';
import BankverificationUpdate from './bankverification-update';
import BankverificationDeleteDialog from './bankverification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BankverificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BankverificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BankverificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Bankverification} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BankverificationDeleteDialog} />
  </>
);

export default Routes;
