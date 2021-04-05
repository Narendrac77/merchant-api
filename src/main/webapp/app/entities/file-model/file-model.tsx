import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './file-model.reducer';
import { IFileModel } from 'app/shared/model/file-model.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileModelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const FileModel = (props: IFileModelProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { fileModelList, match, loading } = props;
  return (
    <div>
      <h2 id="file-model-heading">
        <Translate contentKey="merchantEngineApp.fileModel.home.title">File Models</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="merchantEngineApp.fileModel.home.createLabel">Create new File Model</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {fileModelList && fileModelList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.fileModel.fileId">File Id</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.fileModel.fileName">File Name</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.fileModel.fileType">File Type</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.fileModel.imageData">Image Data</Translate>
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.fileModel.buisnessInfo">Buisness Info</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {fileModelList.map((fileModel, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${fileModel.id}`} color="link" size="sm">
                      {fileModel.id}
                    </Button>
                  </td>
                  <td>{fileModel.fileId}</td>
                  <td>{fileModel.fileName}</td>
                  <td>{fileModel.fileType}</td>
                  <td>
                    {fileModel.imageData ? (
                      <div>
                        {fileModel.imageDataContentType ? (
                          <a onClick={openFile(fileModel.imageDataContentType, fileModel.imageData)}>
                            <img
                              src={`data:${fileModel.imageDataContentType};base64,${fileModel.imageData}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {fileModel.imageDataContentType}, {byteSize(fileModel.imageData)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {fileModel.buisnessInfo ? (
                      <Link to={`buisness-info/${fileModel.buisnessInfo.id}`}>{fileModel.buisnessInfo.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${fileModel.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileModel.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${fileModel.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="merchantEngineApp.fileModel.home.notFound">No File Models found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ fileModel }: IRootState) => ({
  fileModelList: fileModel.entities,
  loading: fileModel.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileModel);
