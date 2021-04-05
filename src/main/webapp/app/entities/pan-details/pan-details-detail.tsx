import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pan-details.reducer';
import { IPanDetails } from 'app/shared/model/pan-details.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPanDetailsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PanDetailsDetail = (props: IPanDetailsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { panDetailsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.panDetails.detail.title">PanDetails</Translate> [<b>{panDetailsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="panNumber">
              <Translate contentKey="merchantEngineApp.panDetails.panNumber">Pan Number</Translate>
            </span>
          </dt>
          <dd>{panDetailsEntity.panNumber}</dd>
          <dt>
            <span id="consent">
              <Translate contentKey="merchantEngineApp.panDetails.consent">Consent</Translate>
            </span>
          </dt>
          <dd>{panDetailsEntity.consent}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="merchantEngineApp.panDetails.name">Name</Translate>
            </span>
          </dt>
          <dd>{panDetailsEntity.name}</dd>
          <dt>
            <span id="mid">
              <Translate contentKey="merchantEngineApp.panDetails.mid">Mid</Translate>
            </span>
          </dt>
          <dd>{panDetailsEntity.mid}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="merchantEngineApp.panDetails.status">Status</Translate>
            </span>
          </dt>
          <dd>{panDetailsEntity.status}</dd>
        </dl>
        <Button tag={Link} to="/pan-details" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/pan-details/${panDetailsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ panDetails }: IRootState) => ({
  panDetailsEntity: panDetails.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PanDetailsDetail);
