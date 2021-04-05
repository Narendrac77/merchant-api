import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Gstinverification from './gstinverification';
import GstinverificationDetail from './gstinverification-detail';
import GstinverificationUpdate from './gstinverification-update';
import GstinverificationDeleteDialog from './gstinverification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GstinverificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GstinverificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GstinverificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Gstinverification} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GstinverificationDeleteDialog} />
  </>
);

export default Routes;
