import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bank-details.reducer';
import { IBankDetails } from 'app/shared/model/bank-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BankDetailsDetail = (props: IBankDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bankDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.bankDetails.detail.title">BankDetails</Translate> [<b>{bankDetailsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="accountNumber">
              <Translate contentKey="merchantEngineApp.bankDetails.accountNumber">Account Number</Translate>
            </span>
          </dt>
          <dd>{bankDetailsEntity.accountNumber}</dd>
          <dt>
            <span id="iFSCCode">
              <Translate contentKey="merchantEngineApp.bankDetails.iFSCCode">I FSC Code</Translate>
            </span>
          </dt>
          <dd>{bankDetailsEntity.iFSCCode}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="merchantEngineApp.bankDetails.name">Name</Translate>
            </span>
          </dt>
          <dd>{bankDetailsEntity.name}</dd>
          <dt>
            <span id="mid">
              <Translate contentKey="merchantEngineApp.bankDetails.mid">Mid</Translate>
            </span>
          </dt>
          <dd>{bankDetailsEntity.mid}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="merchantEngineApp.bankDetails.status">Status</Translate>
            </span>
          </dt>
          <dd>{bankDetailsEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/bank-details" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bank-details/${bankDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bankDetails }: IRootState) => ({
  bankDetailsEntity: bankDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailsDetail);
