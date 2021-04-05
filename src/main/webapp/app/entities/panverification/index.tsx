import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Panverification from './panverification';
import PanverificationDetail from './panverification-detail';
import PanverificationUpdate from './panverification-update';
import PanverificationDeleteDialog from './panverification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PanverificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PanverificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PanverificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Panverification} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PanverificationDeleteDialog} />
  </>
);

export default Routes;
