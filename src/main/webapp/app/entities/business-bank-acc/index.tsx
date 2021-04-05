import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BusinessBankAcc from './business-bank-acc';
import BusinessBankAccDetail from './business-bank-acc-detail';
import BusinessBankAccUpdate from './business-bank-acc-update';
import BusinessBankAccDeleteDialog from './business-bank-acc-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BusinessBankAccUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BusinessBankAccUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BusinessBankAccDetail} />
      <ErrorBoundaryRoute path={match.url} component={BusinessBankAcc} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BusinessBankAccDeleteDialog} />
  </>
);

export default Routes;
