import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';
import { getEntities as getBuisnessInfos } from 'app/entities/buisness-info/buisness-info.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './file-model.reducer';
import { IFileModel } from 'app/shared/model/file-model.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileModelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileModelUpdate = (props: IFileModelUpdateProps) => {
  const [buisnessInfoId, setBuisnessInfoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fileModelEntity, buisnessInfos, loading, updating } = props;

  const { imageData, imageDataContentType } = fileModelEntity;

  const handleClose = () => {
    props.history.push('/file-model');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getBuisnessInfos();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...fileModelEntity,
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
          <h2 id="merchantEngineApp.fileModel.home.createOrEditLabel">
            <Translate contentKey="merchantEngineApp.fileModel.home.createOrEditLabel">Create or edit a FileModel</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fileModelEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="file-model-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="file-model-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="fileIdLabel" for="file-model-fileId">
                  <Translate contentKey="merchantEngineApp.fileModel.fileId">File Id</Translate>
                </Label>
                <AvField id="file-model-fileId" type="text" name="fileId" />
              </AvGroup>
              <AvGroup>
                <Label id="fileNameLabel" for="file-model-fileName">
                  <Translate contentKey="merchantEngineApp.fileModel.fileName">File Name</Translate>
                </Label>
                <AvField id="file-model-fileName" type="text" name="fileName" />
              </AvGroup>
              <AvGroup>
                <Label id="fileTypeLabel" for="file-model-fileType">
                  <Translate contentKey="merchantEngineApp.fileModel.fileType">File Type</Translate>
                </Label>
                <AvField id="file-model-fileType" type="text" name="fileType" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="imageDataLabel" for="imageData">
                    <Translate contentKey="merchantEngineApp.fileModel.imageData">Image Data</Translate>
                  </Label>
                  <br />
                  {imageData ? (
                    <div>
                      {imageDataContentType ? (
                        <a onClick={openFile(imageDataContentType, imageData)}>
                          <img src={`data:${imageDataContentType};base64,${imageData}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {imageDataContentType}, {byteSize(imageData)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('imageData')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_imageData" type="file" onChange={onBlobChange(true, 'imageData')} accept="image/*" />
                  <AvInput type="hidden" name="imageData" value={imageData} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label for="file-model-buisnessInfo">
                  <Translate contentKey="merchantEngineApp.fileModel.buisnessInfo">Buisness Info</Translate>
                </Label>
                <AvInput id="file-model-buisnessInfo" type="select" className="form-control" name="buisnessInfo.id">
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
              <Button tag={Link} id="cancel-save" to="/file-model" replace color="info">
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
  fileModelEntity: storeState.fileModel.entity,
  loading: storeState.fileModel.loading,
  updating: storeState.fileModel.updating,
  updateSuccess: storeState.fileModel.updateSuccess,
});

const mapDispatchToProps = {
  getBuisnessInfos,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileModelUpdate);
