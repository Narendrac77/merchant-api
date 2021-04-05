import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BuisnessInfo from './buisness-info';
import BuisnessInfoDetail from './buisness-info-detail';
import BuisnessInfoUpdate from './buisness-info-update';
import BuisnessInfoDeleteDialog from './buisness-info-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BuisnessInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BuisnessInfoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BuisnessInfoDetail} />
      <ErrorBoundaryRoute path={match.url} component={BuisnessInfo} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BuisnessInfoDeleteDialog} />
  </>
);

export default Routes;
