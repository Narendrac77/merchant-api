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
import { getEntity, updateEntity, createEntity, reset } from './business-bank-acc.reducer';
import { IBusinessBankAcc } from 'app/shared/model/business-bank-acc.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBusinessBankAccUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BusinessBankAccUpdate = (props: IBusinessBankAccUpdateProps) => {
  const [buisnessInfoId, setBuisnessInfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { businessBankAccEntity, buisnessInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/business-bank-acc');
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
        ...businessBankAccEntity,
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
          <h2 id="merchantEngineApp.businessBankAcc.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.businessBankAcc.home.createOrEditLabel">Create or edit a BusinessBankAcc</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : businessBankAccEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="business-bank-acc-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="business-bank-acc-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="accountNumberLabel" for="business-bank-acc-accountNumber">
                  <Translate contentKey="merchantEngineApp.businessBankAcc.accountNumber">Account Number</Translate>
                </Label>
                <AvField id="business-bank-acc-accountNumber" type="text" name="accountNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="ifscCodeLabel" for="business-bank-acc-ifscCode">
                  <Translate contentKey="merchantEngineApp.businessBankAcc.ifscCode">Ifsc Code</Translate>
                </Label>
                <AvField id="business-bank-acc-ifscCode" type="text" name="ifscCode" />
              </AvGroup>
              <AvGroup>
                <Label id="accountNameLabel" for="business-bank-acc-accountName">
                  <Translate contentKey="merchantEngineApp.businessBankAcc.accountName">Account Name</Translate>
                </Label>
                <AvField id="business-bank-acc-accountName" type="text" name="accountName" />
              </AvGroup>
              <AvGroup>
                <Label for="business-bank-acc-buisnessInfo">
                  <Translate contentKey="merchantEngineApp.businessBankAcc.buisnessInfo">Buisness Info</Translate>
                </Label>
                <AvInput id="business-bank-acc-buisnessInfo" type="select" className="form-control" name="buisnessInfo.id">
                  <option value="" key="0" />
                  {buisnessInfos
                    ? buisnessInfos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/business-bank-acc" replace color="info">
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
  businessBankAccEntity: storeState.businessBankAcc.entity,
  loading: storeState.businessBankAcc.loading,
  updating: storeState.businessBankAcc.updating,
  updateSuccess: storeState.businessBankAcc.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessBankAccUpdate);
