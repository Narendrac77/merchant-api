import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './verification.reducer';
import { IVerification } from 'app/shared/model/verification.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IVerificationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const VerificationUpdate = (props: IVerificationUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { verificationEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/verification');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...verificationEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="merchantEngineApp.verification.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.verification.home.createOrEditLabel">Create or edit a Verification</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : verificationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="verification-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="verification-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="midLabel" for="verification-mid">
                  <Translate contentKey="merchantEngineApp.verification.mid">Mid</Translate>
                </Label>
                <AvField id="verification-mid" type="text" name="mid" />
              </AvGroup>
              <AvGroup>
                <Label id="panStatusLabel" for="verification-panStatus">
                  <Translate contentKey="merchantEngineApp.verification.panStatus">Pan Status</Translate>
                </Label>
                <AvField id="verification-panStatus" type="text" name="panStatus" />
              </AvGroup>
              <AvGroup>
                <Label id="bankStatusLabel" for="verification-bankStatus">
                  <Translate contentKey="merchantEngineApp.verification.bankStatus">Bank Status</Translate>
                </Label>
                <AvField id="verification-bankStatus" type="text" name="bankStatus" />
              </AvGroup>
              <AvGroup>
                <Label id="gstinStatusLabel" for="verification-gstinStatus">
                  <Translate contentKey="merchantEngineApp.verification.gstinStatus">Gstin Status</Translate>
                </Label>
                <AvField id="verification-gstinStatus" type="text" name="gstinStatus" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/verification" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  verificationEntity: storeState.verification.entity,
  loading: storeState.verification.loading,
  updating: storeState.verification.updating,
  updateSuccess: storeState.verification.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(VerificationUpdate);
