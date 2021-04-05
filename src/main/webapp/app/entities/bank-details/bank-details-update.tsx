import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';
import { getEntities as getBuisnessInfos } from 'app/entities/buisness-info/buisness-info.reducer';
import { getEntity, updateEntity, createEntity, reset } from './bank-details.reducer';
import { IBankDetails } from 'app/shared/model/bank-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBankDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BankDetailsUpdate = (props: IBankDetailsUpdateProps) => {
  const [buisnessInfoId, setBuisnessInfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { bankDetailsEntity, buisnessInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/bank-details');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBuisnessInfos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...bankDetailsEntity,
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
          <h2 id="merchantEngineApp.bankDetails.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.bankDetails.home.createOrEditLabel">Create or edit a BankDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : bankDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="bank-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="bank-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountNumberLabel" for="bank-details-accountNumber">
                  <Translate contentKey="merchantEngineApp.bankDetails.accountNumber">Account Number</Translate>
                </Label>
                <AvField id="bank-details-accountNumber" type="text" name="accountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="iFSCCodeLabel" for="bank-details-iFSCCode">
                  <Translate contentKey="merchantEngineApp.bankDetails.iFSCCode">I FSC Code</Translate>
                </Label>
                <AvField id="bank-details-iFSCCode" type="text" name="iFSCCode" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="bank-details-name">
                  <Translate contentKey="merchantEngineApp.bankDetails.name">Name</Translate>
                </Label>
                <AvField id="bank-details-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="midLabel" for="bank-details-mid">
                  <Translate contentKey="merchantEngineApp.bankDetails.mid">Mid</Translate>
                </Label>
                <AvField id="bank-details-mid" type="text" name="mid" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="bank-details-status">
                  <Translate contentKey="merchantEngineApp.bankDetails.status">Status</Translate>
                </Label>
                <AvField id="bank-details-status" type="text" name="status" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/bank-details" replace color="info">
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
  buisnessInfos: storeState.buisnessInfo.entities,
  bankDetailsEntity: storeState.bankDetails.entity,
  loading: storeState.bankDetails.loading,
  updating: storeState.bankDetails.updating,
  updateSuccess: storeState.bankDetails.updateSuccess,
});

const mapDispatchToProps = {
  getBuisnessInfos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailsUpdate);
