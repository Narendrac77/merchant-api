import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './buisness-info.reducer';
import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBuisnessInfoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BuisnessInfoDetail = (props: IBuisnessInfoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { buisnessInfoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.buisnessInfo.detail.title">BuisnessInfo</Translate> [<b>{buisnessInfoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="displayName">
              <Translate contentKey="merchantEngineApp.buisnessInfo.displayName">Display Name</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.displayName}</dd>
          <dt>
            <span id="businessType">
              <Translate contentKey="merchantEngineApp.buisnessInfo.businessType">Business Type</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.businessType}</dd>
          <dt>
            <span id="businessCategory">
              <Translate contentKey="merchantEngineApp.buisnessInfo.businessCategory">Business Category</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.businessCategory}</dd>
          <dt>
            <span id="businessSubCategory">
              <Translate contentKey="merchantEngineApp.buisnessInfo.businessSubCategory">Business Sub Category</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.businessSubCategory}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="merchantEngineApp.buisnessInfo.country">Country</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.country}</dd>
          <dt>
            <span id="pincode">
              <Translate contentKey="merchantEngineApp.buisnessInfo.pincode">Pincode</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.pincode}</dd>
          <dt>
            <span id="addline1">
              <Translate contentKey="merchantEngineApp.buisnessInfo.addline1">Addline 1</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.addline1}</dd>
          <dt>
            <span id="addline2">
              <Translate contentKey="merchantEngineApp.buisnessInfo.addline2">Addline 2</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.addline2}</dd>
          <dt>
            <span id="contactName">
              <Translate contentKey="merchantEngineApp.buisnessInfo.contactName">Contact Name</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.contactName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="merchantEngineApp.buisnessInfo.email">Email</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.email}</dd>
          <dt>
            <span id="mobileNumber">
              <Translate contentKey="merchantEngineApp.buisnessInfo.mobileNumber">Mobile Number</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.mobileNumber}</dd>
          <dt>
            <span id="websiteUrl">
              <Translate contentKey="merchantEngineApp.buisnessInfo.websiteUrl">Website Url</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.websiteUrl}</dd>
          <dt>
            <span id="age">
              <Translate contentKey="merchantEngineApp.buisnessInfo.age">Age</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.age}</dd>
          <dt>
            <span id="turnOver">
              <Translate contentKey="merchantEngineApp.buisnessInfo.turnOver">Turn Over</Translate>
            </span>
          </dt>
          <dd>{buisnessInfoEntity.turnOver}</dd>
          <dt>
            <Translate contentKey="merchantEngineApp.buisnessInfo.panDetails">Pan Details</Translate>
          </dt>
          <dd>{buisnessInfoEntity.panDetails ? buisnessInfoEntity.panDetails.id : ''}</dd>
          <dt>
            <Translate contentKey="merchantEngineApp.buisnessInfo.bankDetails">Bank Details</Translate>
          </dt>
          <dd>{buisnessInfoEntity.bankDetails ? buisnessInfoEntity.bankDetails.id : ''}</dd>
          <dt>
            <Translate contentKey="merchantEngineApp.buisnessInfo.gstinDetails">Gstin Details</Translate>
          </dt>
          <dd>{buisnessInfoEntity.gstinDetails ? buisnessInfoEntity.gstinDetails.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/buisness-info" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/buisness-info/${buisnessInfoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ buisnessInfo }: IRootState) => ({
  buisnessInfoEntity: buisnessInfo.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BuisnessInfoDetail);
