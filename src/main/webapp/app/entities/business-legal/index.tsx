import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BusinessLegal from './business-legal';
import BusinessLegalDetail from './business-legal-detail';
import BusinessLegalUpdate from './business-legal-update';
import BusinessLegalDeleteDialog from './business-legal-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BusinessLegalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BusinessLegalUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BusinessLegalDetail} />
      <ErrorBoundaryRoute path={match.url} component={BusinessLegal} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BusinessLegalDeleteDialog} />
  </>
);

export default Routes;
