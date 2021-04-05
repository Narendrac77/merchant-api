import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import GstinDetails from './gstin-details';
import GstinDetailsDetail from './gstin-details-detail';
import GstinDetailsUpdate from './gstin-details-update';
import GstinDetailsDeleteDialog from './gstin-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={GstinDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={GstinDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={GstinDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={GstinDetails} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={GstinDetailsDeleteDialog} />
  </>
);

export default Routes;
