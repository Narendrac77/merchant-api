import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BusinessLegalContact from './business-legal-contact';
import BusinessLegalContactDetail from './business-legal-contact-detail';
import BusinessLegalContactUpdate from './business-legal-contact-update';
import BusinessLegalContactDeleteDialog from './business-legal-contact-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BusinessLegalContactUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BusinessLegalContactUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BusinessLegalContactDetail} />
      <ErrorBoundaryRoute path={match.url} component={BusinessLegalContact} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BusinessLegalContactDeleteDialog} />
  </>
);

export default Routes;
