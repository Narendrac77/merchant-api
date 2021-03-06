import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './verification.reducer';
import { IVerification } from 'app/shared/model/verification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVerificationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Verification = (props: IVerificationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { verificationList, match, loading } = props;
  return (
    <div>
      <h2 id="verification-heading">
        <Translate contentKey="merchantEngineApp.verification.home.title">Verifications</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="merchantEngineApp.verification.home.createLabel">Create new Verification</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {verificationList && verificationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.verification.mid">Mid</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.verification.panStatus">Pan Status</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.verification.bankStatus">Bank Status</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.verification.gstinStatus">Gstin Status</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {verificationList.map((verification, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${verification.id}`} color="link" size="sm">
                      {verification.id}
                    </Button>
                  </td>
                  <td>{verification.mid}</td>
                  <td>{verification.panStatus}</td>
                  <td>{verification.bankStatus}</td>
                  <td>{verification.gstinStatus}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${verification.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${verification.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${verification.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="merchantEngineApp.verification.home.notFound">No Verifications found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ verification }: IRootState) => ({
  verificationList: verification.entities,
  loading: verification.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
