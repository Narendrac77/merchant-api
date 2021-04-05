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
import { getEntity, updateEntity, createEntity, reset } from './pan-details.reducer';
import { IPanDetails } from 'app/shared/model/pan-details.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPanDetailsUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PanDetailsUpdate = (props: IPanDetailsUpdateProps) => {
  const [buisnessInfoId, setBuisnessInfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { panDetailsEntity, buisnessInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/pan-details');
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
        ...panDetailsEntity,
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
          <h2 id="merchantEngineApp.panDetails.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.panDetails.home.createOrEditLabel">Create or edit a PanDetails</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : panDetailsEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="pan-details-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="pan-details-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="panNumberLabel" for="pan-details-panNumber">
                  <Translate contentKey="merchantEngineApp.panDetails.panNumber">Pan Number</Translate>
                </Label>
                <AvField id="pan-details-panNumber" type="text" name="panNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="consentLabel" for="pan-details-consent">
                  <Translate contentKey="merchantEngineApp.panDetails.consent">Consent</Translate>
                </Label>
                <AvField id="pan-details-consent" type="text" name="consent" />
              </AvGroup>
              <AvGroup>
                <Label id="nameLabel" for="pan-details-name">
                  <Translate contentKey="merchantEngineApp.panDetails.name">Name</Translate>
                </Label>
                <AvField id="pan-details-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="midLabel" for="pan-details-mid">
                  <Translate contentKey="merchantEngineApp.panDetails.mid">Mid</Translate>
                </Label>
                <AvField id="pan-details-mid" type="text" name="mid" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="pan-details-status">
                  <Translate contentKey="merchantEngineApp.panDetails.status">Status</Translate>
                </Label>
                <AvField id="pan-details-status" type="text" name="status" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/pan-details" replace color="info">
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
  panDetailsEntity: storeState.panDetails.entity,
  loading: storeState.panDetails.loading,
  updating: storeState.panDetails.updating,
  updateSuccess: storeState.panDetails.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(PanDetailsUpdate);
