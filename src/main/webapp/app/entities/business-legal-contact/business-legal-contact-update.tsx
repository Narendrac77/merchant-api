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
import { getEntity, updateEntity, createEntity, reset } from './business-legal-contact.reducer';
import { IBusinessLegalContact } from 'app/shared/model/business-legal-contact.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBusinessLegalContactUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BusinessLegalContactUpdate = (props: IBusinessLegalContactUpdateProps) => {
  const [buisnessInfoId, setBuisnessInfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { businessLegalContactEntity, buisnessInfos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/business-legal-contact');
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
        ...businessLegalContactEntity,
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
          <h2 id="merchantEngineApp.businessLegalContact.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.businessLegalContact.home.createOrEditLabel">
              Create or edit a BusinessLegalContact
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : businessLegalContactEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="business-legal-contact-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="business-legal-contact-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contactNameLabel" for="business-legal-contact-contactName">
                  <Translate contentKey="merchantEngineApp.businessLegalContact.contactName">Contact Name</Translate>
                </Label>
                <AvField id="business-legal-contact-contactName" type="text" name="contactName" />
              </AvGroup>
              <AvGroup>
                <Label id="contactMobileLabel" for="business-legal-contact-contactMobile">
                  <Translate contentKey="merchantEngineApp.businessLegalContact.contactMobile">Contact Mobile</Translate>
                </Label>
                <AvField id="business-legal-contact-contactMobile" type="text" name="contactMobile" />
              </AvGroup>
              <AvGroup>
                <Label id="contactEmailLabel" for="business-legal-contact-contactEmail">
                  <Translate contentKey="merchantEngineApp.businessLegalContact.contactEmail">Contact Email</Translate>
                </Label>
                <AvField id="business-legal-contact-contactEmail" type="text" name="contactEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="aadharNumberLabel" for="business-legal-contact-aadharNumber">
                  <Translate contentKey="merchantEngineApp.businessLegalContact.aadharNumber">Aadhar Number</Translate>
                </Label>
                <AvField id="business-legal-contact-aadharNumber" type="text" name="aadharNumber" />
              </AvGroup>
              <AvGroup>
                <Label for="business-legal-contact-buisnessInfo">
                  <Translate contentKey="merchantEngineApp.businessLegalContact.buisnessInfo">Buisness Info</Translate>
                </Label>
                <AvInput id="business-legal-contact-buisnessInfo" type="select" className="form-control" name="buisnessInfo.id">
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
              <Button tag={Link} id="cancel-save" to="/business-legal-contact" replace color="info">
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
  businessLegalContactEntity: storeState.businessLegalContact.entity,
  loading: storeState.businessLegalContact.loading,
  updating: storeState.businessLegalContact.updating,
  updateSuccess: storeState.businessLegalContact.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(BusinessLegalContactUpdate);
