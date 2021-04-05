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
import { getEntity, updateEntity, createEntity, reset } from './business-legal.reducer';
import { IBusinessLegal } from 'app/shared/model/business-legal.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBusinessLegalUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BusinessLegalUpdate = (props: IBusinessLegalUpdateProps) => {
  const [buisnessInfoId, setBuisnessInfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { businessLegalEntity, buisnessInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/business-legal');
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
        ...businessLegalEntity,
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
          <h2 id="merchantEngineApp.businessLegal.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.businessLegal.home.createOrEditLabel">Create or edit a BusinessLegal</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : businessLegalEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="business-legal-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="business-legal-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="legalNameLabel" for="business-legal-legalName">
                  <Translate contentKey="merchantEngineApp.businessLegal.legalName">Legal Name</Translate>
                </Label>
                <AvField id="business-legal-legalName" type="text" name="legalName" />
              </AvGroup>
              <AvGroup>
                <Label id="regAddressLabel" for="business-legal-regAddress">
                  <Translate contentKey="merchantEngineApp.businessLegal.regAddress">Reg Address</Translate>
                </Label>
                <AvField id="business-legal-regAddress" type="text" name="regAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="incorporationLabel" for="business-legal-incorporation">
                  <Translate contentKey="merchantEngineApp.businessLegal.incorporation">Incorporation</Translate>
                </Label>
                <AvField id="business-legal-incorporation" type="text" name="incorporation" />
              </AvGroup>
              <AvGroup>
                <Label id="panNumberLabel" for="business-legal-panNumber">
                  <Translate contentKey="merchantEngineApp.businessLegal.panNumber">Pan Number</Translate>
                </Label>
                <AvField id="business-legal-panNumber" type="text" name="panNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="gstInNumberLabel" for="business-legal-gstInNumber">
                  <Translate contentKey="merchantEngineApp.businessLegal.gstInNumber">Gst In Number</Translate>
                </Label>
                <AvField id="business-legal-gstInNumber" type="text" name="gstInNumber" />
              </AvGroup>
              <AvGroup>
                <Label for="business-legal-buisnessInfo">
                  <Translate contentKey="merchantEngineApp.businessLegal.buisnessInfo">Buisness Info</Translate>
                </Label>
                <AvInput id="business-legal-buisnessInfo" type="select" className="form-control" name="buisnessInfo.id">
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
              <Button tag={Link} id="cancel-save" to="/business-legal" replace color="info">
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
  businessLegalEntity: storeState.businessLegal.entity,
  loading: storeState.businessLegal.loading,
  updating: storeState.businessLegal.updating,
  updateSuccess: storeState.businessLegal.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessLegalUpdate);
