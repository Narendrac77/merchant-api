import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './business-bank-acc.reducer';
import { IBusinessBankAcc } from 'app/shared/model/business-bank-acc.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessBankAccProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BusinessBankAcc = (props: IBusinessBankAccProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { businessBankAccList, match, loading } = props;
  return (
    <div>
      <h2 id="business-bank-acc-heading">
        <Translate contentKey="merchantEngineApp.businessBankAcc.home.title">Business Bank Accs</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="merchantEngineApp.businessBankAcc.home.createLabel">Create new Business Bank Acc</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {businessBankAccList && businessBankAccList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessBankAcc.accountNumber">Account Number</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessBankAcc.ifscCode">Ifsc Code</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessBankAcc.accountName">Account Name</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessBankAcc.buisnessInfo">Buisness Info</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {businessBankAccList.map((businessBankAcc, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${businessBankAcc.id}`} color="link" size="sm">
                      {businessBankAcc.id}
                    </Button>
                  </td>
                  <td>{businessBankAcc.accountNumber}</td>
                  <td>{businessBankAcc.ifscCode}</td>
                  <td>{businessBankAcc.accountName}</td>
                  <td>
                    {businessBankAcc.buisnessInfo ? (
                      <Link to={`buisness-info/${businessBankAcc.buisnessInfo.id}`}>{businessBankAcc.buisnessInfo.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${businessBankAcc.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessBankAcc.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessBankAcc.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="merchantEngineApp.businessBankAcc.home.notFound">No Business Bank Accs found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ businessBankAcc }: IRootState) => ({
  businessBankAccList: businessBankAcc.entities,
  loading: businessBankAcc.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BusinessBankAcc);
