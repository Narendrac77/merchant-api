import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './gstin-details.reducer';
import { IGstinDetails } from 'app/shared/model/gstin-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGstinDetailsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const GstinDetails = (props: IGstinDetailsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { gstinDetailsList, match, loading } = props;
  return (
    <div>
      <h2 id="gstin-details-heading">
        <Translate contentKey="merchantEngineApp.gstinDetails.home.title">Gstin Details</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="merchantEngineApp.gstinDetails.home.createLabel">Create new Gstin Details</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {gstinDetailsList && gstinDetailsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.gstinDetails.gstin">Gstin</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.gstinDetails.consent">Consent</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.gstinDetails.mid">Mid</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.gstinDetails.status">Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {gstinDetailsList.map((gstinDetails, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${gstinDetails.id}`} color="link" size="sm">
                      {gstinDetails.id}
                    </Button>
                  </td>
                  <td>{gstinDetails.gstin}</td>
                  <td>{gstinDetails.consent}</td>
                  <td>{gstinDetails.mid}</td>
                  <td>{gstinDetails.status}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${gstinDetails.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gstinDetails.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${gstinDetails.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="merchantEngineApp.gstinDetails.home.notFound">No Gstin Details found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ gstinDetails }: IRootState) => ({
  gstinDetailsList: gstinDetails.entities,
  loading: gstinDetails.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GstinDetails);
