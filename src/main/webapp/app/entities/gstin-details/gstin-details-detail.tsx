import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './gstin-details.reducer';
import { IGstinDetails } from 'app/shared/model/gstin-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IGstinDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const GstinDetailsDetail = (props: IGstinDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { gstinDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.gstinDetails.detail.title">GstinDetails</Translate> [<b>{gstinDetailsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="gstin">
              <Translate contentKey="merchantEngineApp.gstinDetails.gstin">Gstin</Translate>
            </span>
          </dt>
          <dd>{gstinDetailsEntity.gstin}</dd>
          <dt>
            <span id="consent">
              <Translate contentKey="merchantEngineApp.gstinDetails.consent">Consent</Translate>
            </span>
          </dt>
          <dd>{gstinDetailsEntity.consent}</dd>
          <dt>
            <span id="mid">
              <Translate contentKey="merchantEngineApp.gstinDetails.mid">Mid</Translate>
            </span>
          </dt>
          <dd>{gstinDetailsEntity.mid}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="merchantEngineApp.gstinDetails.status">Status</Translate>
            </span>
          </dt>
          <dd>{gstinDetailsEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/gstin-details" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/gstin-details/${gstinDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ gstinDetails }: IRootState) => ({
  gstinDetailsEntity: gstinDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(GstinDetailsDetail);
