import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import PanDetails from './pan-details';
import PanDetailsDetail from './pan-details-detail';
import PanDetailsUpdate from './pan-details-update';
import PanDetailsDeleteDialog from './pan-details-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={PanDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={PanDetailsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={PanDetailsDetail} />
      <ErrorBoundaryRoute path={match.url} component={PanDetails} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={PanDetailsDeleteDialog} />
  </>
);

export default Routes;
