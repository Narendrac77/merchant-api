import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './business-bank-acc.reducer';
import { IBusinessBankAcc } from 'app/shared/model/business-bank-acc.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessBankAccDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BusinessBankAccDetail = (props: IBusinessBankAccDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { businessBankAccEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.businessBankAcc.detail.title">BusinessBankAcc</Translate> [
          <b>{businessBankAccEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="accountNumber">
              <Translate contentKey="merchantEngineApp.businessBankAcc.accountNumber">Account Number</Translate>
            </span>
          </dt>
          <dd>{businessBankAccEntity.accountNumber}</dd>
          <dt>
            <span id="ifscCode">
              <Translate contentKey="merchantEngineApp.businessBankAcc.ifscCode">Ifsc Code</Translate>
            </span>
          </dt>
          <dd>{businessBankAccEntity.ifscCode}</dd>
          <dt>
            <span id="accountName">
              <Translate contentKey="merchantEngineApp.businessBankAcc.accountName">Account Name</Translate>
            </span>
          </dt>
          <dd>{businessBankAccEntity.accountName}</dd>
          <dt>
            <Translate contentKey="merchantEngineApp.businessBankAcc.buisnessInfo">Buisness Info</Translate>
          </dt>
          <dd>{businessBankAccEntity.buisnessInfo ? businessBankAccEntity.buisnessInfo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/business-bank-acc" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/business-bank-acc/${businessBankAccEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ businessBankAcc }: IRootState) => ({
  businessBankAccEntity: businessBankAcc.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BusinessBankAccDetail);
