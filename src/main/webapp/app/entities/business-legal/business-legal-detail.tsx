import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './business-legal.reducer';
import { IBusinessLegal } from 'app/shared/model/business-legal.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBusinessLegalDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const BusinessLegalDetail = (props: IBusinessLegalDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { businessLegalEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.businessLegal.detail.title">BusinessLegal</Translate> [<b>{businessLegalEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="legalName">
              <Translate contentKey="merchantEngineApp.businessLegal.legalName">Legal Name</Translate>
            </span>
          </dt>
          <dd>{businessLegalEntity.legalName}</dd>
          <dt>
            <span id="regAddress">
              <Translate contentKey="merchantEngineApp.businessLegal.regAddress">Reg Address</Translate>
            </span>
          </dt>
          <dd>{businessLegalEntity.regAddress}</dd>
          <dt>
            <span id="incorporation">
              <Translate contentKey="merchantEngineApp.businessLegal.incorporation">Incorporation</Translate>
            </span>
          </dt>
          <dd>{businessLegalEntity.incorporation}</dd>
          <dt>
            <span id="panNumber">
              <Translate contentKey="merchantEngineApp.businessLegal.panNumber">Pan Number</Translate>
            </span>
          </dt>
          <dd>{businessLegalEntity.panNumber}</dd>
          <dt>
            <span id="gstInNumber">
              <Translate contentKey="merchantEngineApp.businessLegal.gstInNumber">Gst In Number</Translate>
            </span>
          </dt>
          <dd>{businessLegalEntity.gstInNumber}</dd>
          <dt>
            <Translate contentKey="merchantEngineApp.businessLegal.buisnessInfo">Buisness Info</Translate>
          </dt>
          <dd>{businessLegalEntity.buisnessInfo ? businessLegalEntity.buisnessInfo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/business-legal" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/business-legal/${businessLegalEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ businessLegal }: IRootState) => ({
  businessLegalEntity: businessLegal.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BusinessLegalDetail);
