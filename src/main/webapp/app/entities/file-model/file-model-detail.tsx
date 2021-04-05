import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file-model.reducer';
import { IFileModel } from 'app/shared/model/file-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileModelDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileModelDetail = (props: IFileModelDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fileModelEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="merchantEngineApp.fileModel.detail.title">FileModel</Translate> [<b>{fileModelEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="fileId">
              <Translate contentKey="merchantEngineApp.fileModel.fileId">File Id</Translate>
            </span>
          </dt>
          <dd>{fileModelEntity.fileId}</dd>
          <dt>
            <span id="fileName">
              <Translate contentKey="merchantEngineApp.fileModel.fileName">File Name</Translate>
            </span>
          </dt>
          <dd>{fileModelEntity.fileName}</dd>
          <dt>
            <span id="fileType">
              <Translate contentKey="merchantEngineApp.fileModel.fileType">File Type</Translate>
            </span>
          </dt>
          <dd>{fileModelEntity.fileType}</dd>
          <dt>
            <span id="imageData">
              <Translate contentKey="merchantEngineApp.fileModel.imageData">Image Data</Translate>
            </span>
          </dt>
          <dd>
            {fileModelEntity.imageData ? (
              <div>
                {fileModelEntity.imageDataContentType ? (
                  <a onClick={openFile(fileModelEntity.imageDataContentType, fileModelEntity.imageData)}>
                    <img
                      src={`data:${fileModelEntity.imageDataContentType};base64,${fileModelEntity.imageData}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {fileModelEntity.imageDataContentType}, {byteSize(fileModelEntity.imageData)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="merchantEngineApp.fileModel.buisnessInfo">Buisness Info</Translate>
          </dt>
          <dd>{fileModelEntity.buisnessInfo ? fileModelEntity.buisnessInfo.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/file-model" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file-model/${fileModelEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fileModel }: IRootState) => ({
  fileModelEntity: fileModel.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileModelDetail);
