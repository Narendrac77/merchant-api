import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './bankverification.reducer';
import { IBankverification } from 'app/shared/model/bankverification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankverificationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Bankverification = (props: IBankverificationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { bankverificationList, match, loading } = props;
  return (
    <div>
      <h2 id="bankverification-heading">
        <Translate contentKey="merchantEngineApp.bankverification.home.title">Bankverifications</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="merchantEngineApp.bankverification.home.createLabel">Create new Bankverification</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {bankverificationList && bankverificationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.bankverification.bankverificationId">Bankverification Id</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bankverificationList.map((bankverification, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${bankverification.id}`} color="link" size="sm">
                      {bankverification.id}
                    </Button>
                  </td>
                  <td>{bankverification.bankverificationId}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${bankverification.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bankverification.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${bankverification.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="merchantEngineApp.bankverification.home.notFound">No Bankverifications found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ bankverification }: IRootState) => ({
  bankverificationList: bankverification.entities,
  loading: bankverification.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Bankverification);
