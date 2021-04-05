import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FileModel from './file-model';
import FileModelDetail from './file-model-detail';
import FileModelUpdate from './file-model-update';
import FileModelDeleteDialog from './file-model-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FileModelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FileModelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FileModelDetail} />
      <ErrorBoundaryRoute path={match.url} component={FileModel} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FileModelDeleteDialog} />
  </>
);

export default Routes;
