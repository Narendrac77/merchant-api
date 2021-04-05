import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './verification.reducer';
import { IVerification } from 'app/shared/model/verification.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IVerificationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VerificationDetail = (props: IVerificationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { verificationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.verification.detail.title">Verification</Translate> [<b>{verificationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="mid">
              <Translate contentKey="merchantEngineApp.verification.mid">Mid</Translate>
            </span>
          </dt>
          <dd>{verificationEntity.mid}</dd>
          <dt>
            <span id="panStatus">
              <Translate contentKey="merchantEngineApp.verification.panStatus">Pan Status</Translate>
            </span>
          </dt>
          <dd>{verificationEntity.panStatus}</dd>
          <dt>
            <span id="bankStatus">
              <Translate contentKey="merchantEngineApp.verification.bankStatus">Bank Status</Translate>
            </span>
          </dt>
          <dd>{verificationEntity.bankStatus}</dd>
          <dt>
            <span id="gstinStatus">
              <Translate contentKey="merchantEngineApp.verification.gstinStatus">Gstin Status</Translate>
            </span>
          </dt>
          <dd>{verificationEntity.gstinStatus}</dd>
        </dl>
        <Button tag={Link} to="/verification" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/verification/${verificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ verification }: IRootState) => ({
  verificationEntity: verification.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VerificationDetail);
