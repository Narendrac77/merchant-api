import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './business-legal-contact.reducer';
import { IBusinessLegalContact } from 'app/shared/model/business-legal-contact.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessLegalContactDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BusinessLegalContactDetail = (props: IBusinessLegalContactDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { businessLegalContactEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.businessLegalContact.detail.title">BusinessLegalContact</Translate> [
          <b>{businessLegalContactEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="contactName">
              <Translate contentKey="merchantEngineApp.businessLegalContact.contactName">Contact Name</Translate>
            </span>
          </dt>
          <dd>{businessLegalContactEntity.contactName}</dd>
          <dt>
            <span id="contactMobile">
              <Translate contentKey="merchantEngineApp.businessLegalContact.contactMobile">Contact Mobile</Translate>
            </span>
          </dt>
          <dd>{businessLegalContactEntity.contactMobile}</dd>
          <dt>
            <span id="contactEmail">
              <Translate contentKey="merchantEngineApp.businessLegalContact.contactEmail">Contact Email</Translate>
            </span>
          </dt>
          <dd>{businessLegalContactEntity.contactEmail}</dd>
          <dt>
            <span id="aadharNumber">
              <Translate contentKey="merchantEngineApp.businessLegalContact.aadharNumber">Aadhar Number</Translate>
            </span>
          </dt>
          <dd>{businessLegalContactEntity.aadharNumber}</dd>
          <dt>
            <Translate contentKey="merchantEngineApp.businessLegalContact.buisnessInfo">Buisness Info</Translate>
          </dt>
          <dd>{businessLegalContactEntity.buisnessInfo ? businessLegalContactEntity.buisnessInfo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/business-legal-contact" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/business-legal-contact/${businessLegalContactEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ businessLegalContact }: IRootState) => ({
  businessLegalContactEntity: businessLegalContact.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BusinessLegalContactDetail);
