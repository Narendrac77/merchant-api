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
import { getEntity, updateEntity, createEntity, reset } from './gstin-details.reducer';
import { IGstinDetails } from 'app/shared/model/gstin-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IGstinDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GstinDetailsUpdate = (props: IGstinDetailsUpdateProps) => {
  const [buisnessInfoId, setBuisnessInfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { gstinDetailsEntity, buisnessInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/gstin-details');
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
        ...gstinDetailsEntity,
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
          <h2 id="merchantEngineApp.gstinDetails.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.gstinDetails.home.createOrEditLabel">Create or edit a GstinDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : gstinDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="gstin-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="gstin-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="gstinLabel" for="gstin-details-gstin">
                  <Translate contentKey="merchantEngineApp.gstinDetails.gstin">Gstin</Translate>
                </Label>
                <AvField id="gstin-details-gstin" type="text" name="gstin" />
              </AvGroup>
              <AvGroup>
                <Label id="consentLabel" for="gstin-details-consent">
                  <Translate contentKey="merchantEngineApp.gstinDetails.consent">Consent</Translate>
                </Label>
                <AvField id="gstin-details-consent" type="text" name="consent" />
              </AvGroup>
              <AvGroup>
                <Label id="midLabel" for="gstin-details-mid">
                  <Translate contentKey="merchantEngineApp.gstinDetails.mid">Mid</Translate>
                </Label>
                <AvField id="gstin-details-mid" type="text" name="mid" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="gstin-details-status">
                  <Translate contentKey="merchantEngineApp.gstinDetails.status">Status</Translate>
                </Label>
                <AvField id="gstin-details-status" type="text" name="status" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/gstin-details" replace color="info">
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
  gstinDetailsEntity: storeState.gstinDetails.entity,
  loading: storeState.gstinDetails.loading,
  updating: storeState.gstinDetails.updating,
  updateSuccess: storeState.gstinDetails.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(GstinDetailsUpdate);
