import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './business-legal.reducer';
import { IBusinessLegal } from 'app/shared/model/business-legal.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessLegalProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BusinessLegal = (props: IBusinessLegalProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { businessLegalList, match, loading } = props;
  return (
    <div>
      <h2 id="business-legal-heading">
        <Translate contentKey="merchantEngineApp.businessLegal.home.title">Business Legals</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="merchantEngineApp.businessLegal.home.createLabel">Create new Business Legal</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {businessLegalList && businessLegalList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessLegal.legalName">Legal Name</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessLegal.regAddress">Reg Address</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessLegal.incorporation">Incorporation</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessLegal.panNumber">Pan Number</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessLegal.gstInNumber">Gst In Number</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.businessLegal.buisnessInfo">Buisness Info</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {businessLegalList.map((businessLegal, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${businessLegal.id}`} color="link" size="sm">
                      {businessLegal.id}
                    </Button>
                  </td>
                  <td>{businessLegal.legalName}</td>
                  <td>{businessLegal.regAddress}</td>
                  <td>{businessLegal.incorporation}</td>
                  <td>{businessLegal.panNumber}</td>
                  <td>{businessLegal.gstInNumber}</td>
                  <td>
                    {businessLegal.buisnessInfo ? (
                      <Link to={`buisness-info/${businessLegal.buisnessInfo.id}`}>{businessLegal.buisnessInfo.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${businessLegal.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessLegal.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${businessLegal.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="merchantEngineApp.businessLegal.home.notFound">No Business Legals found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ businessLegal }: IRootState) => ({
  businessLegalList: businessLegal.entities,
  loading: businessLegal.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BusinessLegal);
