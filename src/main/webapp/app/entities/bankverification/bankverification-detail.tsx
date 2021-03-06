import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './bankverification.reducer';
import { IBankverification } from 'app/shared/model/bankverification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBankverificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BankverificationDetail = (props: IBankverificationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { bankverificationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.bankverification.detail.title">Bankverification</Translate> [
          <b>{bankverificationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="bankverificationId">
              <Translate contentKey="merchantEngineApp.bankverification.bankverificationId">Bankverification Id</Translate>
            </span>
          </dt>
          <dd>{bankverificationEntity.bankverificationId}</dd>
        </dl>
        <Button tag={Link} to="/bankverification" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/bankverification/${bankverificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ bankverification }: IRootState) => ({
  bankverificationEntity: bankverification.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BankverificationDetail);
