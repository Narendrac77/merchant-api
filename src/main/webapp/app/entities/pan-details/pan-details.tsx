import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pan-details.reducer';
import { IPanDetails } from 'app/shared/model/pan-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPanDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const PanDetails = (props: IPanDetailsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { panDetailsList, match, loading } = props;
  return (
    <div>
      <h2 id="pan-details-heading">
        <Translate contentKey="merchantEngineApp.panDetails.home.title">Pan Details</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="merchantEngineApp.panDetails.home.createLabel">Create new Pan Details</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {panDetailsList && panDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.panDetails.panNumber">Pan Number</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.panDetails.consent">Consent</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.panDetails.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.panDetails.mid">Mid</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.panDetails.status">Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {panDetailsList.map((panDetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${panDetails.id}`} color="link" size="sm">
                      {panDetails.id}
                    </Button>
                  </td>
                  <td>{panDetails.panNumber}</td>
                  <td>{panDetails.consent}</td>
                  <td>{panDetails.name}</td>
                  <td>{panDetails.mid}</td>
                  <td>{panDetails.status}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${panDetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${panDetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${panDetails.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="merchantEngineApp.panDetails.home.notFound">No Pan Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ panDetails }: IRootState) => ({
  panDetailsList: panDetails.entities,
  loading: panDetails.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PanDetails);
