import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IPanDetails } from 'app/shared/model/pan-details.model';
import { getEntities as getPanDetails } from 'app/entities/pan-details/pan-details.reducer';
import { IBankDetails } from 'app/shared/model/bank-details.model';
import { getEntities as getBankDetails } from 'app/entities/bank-details/bank-details.reducer';
import { IGstinDetails } from 'app/shared/model/gstin-details.model';
import { getEntities as getGstinDetails } from 'app/entities/gstin-details/gstin-details.reducer';
import { getEntity, updateEntity, createEntity, reset } from './buisness-info.reducer';
import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBuisnessInfoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BuisnessInfoUpdate = (props: IBuisnessInfoUpdateProps) => {
  const [panDetailsId, setPanDetailsId] = useState('0');
  const [bankDetailsId, setBankDetailsId] = useState('0');
  const [gstinDetailsId, setGstinDetailsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { buisnessInfoEntity, panDetails, bankDetails, gstinDetails, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/buisness-info' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getPanDetails();
    props.getBankDetails();
    props.getGstinDetails();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...buisnessInfoEntity,
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
          <h2 id="merchantEngineApp.buisnessInfo.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.buisnessInfo.home.createOrEditLabel">Create or edit a BuisnessInfo</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : buisnessInfoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="buisness-info-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="buisness-info-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="displayNameLabel" for="buisness-info-displayName">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.displayName">Display Name</Translate>
                </Label>
                <AvField id="buisness-info-displayName" type="text" name="displayName" />
              </AvGroup>
              <AvGroup>
                <Label id="businessTypeLabel" for="buisness-info-businessType">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.businessType">Business Type</Translate>
                </Label>
                <AvField id="buisness-info-businessType" type="text" name="businessType" />
              </AvGroup>
              <AvGroup>
                <Label id="businessCategoryLabel" for="buisness-info-businessCategory">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.businessCategory">Business Category</Translate>
                </Label>
                <AvField id="buisness-info-businessCategory" type="text" name="businessCategory" />
              </AvGroup>
              <AvGroup>
                <Label id="businessSubCategoryLabel" for="buisness-info-businessSubCategory">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.businessSubCategory">Business Sub Category</Translate>
                </Label>
                <AvField id="buisness-info-businessSubCategory" type="text" name="businessSubCategory" />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="buisness-info-country">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.country">Country</Translate>
                </Label>
                <AvField id="buisness-info-country" type="text" name="country" />
              </AvGroup>
              <AvGroup>
                <Label id="pincodeLabel" for="buisness-info-pincode">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.pincode">Pincode</Translate>
                </Label>
                <AvField id="buisness-info-pincode" type="text" name="pincode" />
              </AvGroup>
              <AvGroup>
                <Label id="addline1Label" for="buisness-info-addline1">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.addline1">Addline 1</Translate>
                </Label>
                <AvField id="buisness-info-addline1" type="text" name="addline1" />
              </AvGroup>
              <AvGroup>
                <Label id="addline2Label" for="buisness-info-addline2">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.addline2">Addline 2</Translate>
                </Label>
                <AvField id="buisness-info-addline2" type="text" name="addline2" />
              </AvGroup>
              <AvGroup>
                <Label id="contactNameLabel" for="buisness-info-contactName">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.contactName">Contact Name</Translate>
                </Label>
                <AvField id="buisness-info-contactName" type="text" name="contactName" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="buisness-info-email">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.email">Email</Translate>
                </Label>
                <AvField id="buisness-info-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="mobileNumberLabel" for="buisness-info-mobileNumber">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.mobileNumber">Mobile Number</Translate>
                </Label>
                <AvField id="buisness-info-mobileNumber" type="text" name="mobileNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="websiteUrlLabel" for="buisness-info-websiteUrl">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.websiteUrl">Website Url</Translate>
                </Label>
                <AvField id="buisness-info-websiteUrl" type="text" name="websiteUrl" />
              </AvGroup>
              <AvGroup>
                <Label id="ageLabel" for="buisness-info-age">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.age">Age</Translate>
                </Label>
                <AvField id="buisness-info-age" type="text" name="age" />
              </AvGroup>
              <AvGroup>
                <Label id="turnOverLabel" for="buisness-info-turnOver">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.turnOver">Turn Over</Translate>
                </Label>
                <AvField id="buisness-info-turnOver" type="text" name="turnOver" />
              </AvGroup>
              <AvGroup>
                <Label for="buisness-info-panDetails">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.panDetails">Pan Details</Translate>
                </Label>
                <AvInput id="buisness-info-panDetails" type="select" className="form-control" name="panDetails.id">
                  <option value="" key="0" />
                  {panDetails
                    ? panDetails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="buisness-info-bankDetails">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.bankDetails">Bank Details</Translate>
                </Label>
                <AvInput id="buisness-info-bankDetails" type="select" className="form-control" name="bankDetails.id">
                  <option value="" key="0" />
                  {bankDetails
                    ? bankDetails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="buisness-info-gstinDetails">
                  <Translate contentKey="merchantEngineApp.buisnessInfo.gstinDetails">Gstin Details</Translate>
                </Label>
                <AvInput id="buisness-info-gstinDetails" type="select" className="form-control" name="gstinDetails.id">
                  <option value="" key="0" />
                  {gstinDetails
                    ? gstinDetails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/buisness-info" replace color="info">
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
  panDetails: storeState.panDetails.entities,
  bankDetails: storeState.bankDetails.entities,
  gstinDetails: storeState.gstinDetails.entities,
  buisnessInfoEntity: storeState.buisnessInfo.entity,
  loading: storeState.buisnessInfo.loading,
  updating: storeState.buisnessInfo.updating,
  updateSuccess: storeState.buisnessInfo.updateSuccess,
});

const mapDispatchToProps = {
  getPanDetails,
  getBankDetails,
  getGstinDetails,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BuisnessInfoUpdate);
