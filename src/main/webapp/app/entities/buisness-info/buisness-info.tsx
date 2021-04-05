import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './buisness-info.reducer';
import { IBuisnessInfo } from 'app/shared/model/buisness-info.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IBuisnessInfoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const BuisnessInfo = (props: IBuisnessInfoProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { buisnessInfoList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="buisness-info-heading">
        <Translate contentKey="merchantEngineApp.buisnessInfo.home.title">Buisness Infos</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="merchantEngineApp.buisnessInfo.home.createLabel">Create new Buisness Info</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {buisnessInfoList && buisnessInfoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('displayName')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.displayName">Display Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('businessType')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.businessType">Business Type</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('businessCategory')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.businessCategory">Business Category</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('businessSubCategory')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.businessSubCategory">Business Sub Category</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('country')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.country">Country</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('pincode')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.pincode">Pincode</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addline1')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.addline1">Addline 1</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('addline2')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.addline2">Addline 2</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('contactName')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.contactName">Contact Name</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mobileNumber')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.mobileNumber">Mobile Number</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('websiteUrl')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.websiteUrl">Website Url</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('age')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.age">Age</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('turnOver')}>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.turnOver">Turn Over</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.panDetails">Pan Details</Translate> <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.bankDetails">Bank Details</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="merchantEngineApp.buisnessInfo.gstinDetails">Gstin Details</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {buisnessInfoList.map((buisnessInfo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${buisnessInfo.id}`} color="link" size="sm">
                      {buisnessInfo.id}
                    </Button>
                  </td>
                  <td>{buisnessInfo.displayName}</td>
                  <td>{buisnessInfo.businessType}</td>
                  <td>{buisnessInfo.businessCategory}</td>
                  <td>{buisnessInfo.businessSubCategory}</td>
                  <td>{buisnessInfo.country}</td>
                  <td>{buisnessInfo.pincode}</td>
                  <td>{buisnessInfo.addline1}</td>
                  <td>{buisnessInfo.addline2}</td>
                  <td>{buisnessInfo.contactName}</td>
                  <td>{buisnessInfo.email}</td>
                  <td>{buisnessInfo.mobileNumber}</td>
                  <td>{buisnessInfo.websiteUrl}</td>
                  <td>{buisnessInfo.age}</td>
                  <td>{buisnessInfo.turnOver}</td>
                  <td>
                    {buisnessInfo.panDetails ? (
                      <Link to={`pan-details/${buisnessInfo.panDetails.id}`}>{buisnessInfo.panDetails.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {buisnessInfo.bankDetails ? (
                      <Link to={`bank-details/${buisnessInfo.bankDetails.id}`}>{buisnessInfo.bankDetails.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {buisnessInfo.gstinDetails ? (
                      <Link to={`gstin-details/${buisnessInfo.gstinDetails.id}`}>{buisnessInfo.gstinDetails.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${buisnessInfo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${buisnessInfo.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${buisnessInfo.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
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
              <Translate contentKey="merchantEngineApp.buisnessInfo.home.notFound">No Buisness Infos found</Translate>
            </div>
          )
        )}
      </div>
      {props.totalItems ? (
        <div className={buisnessInfoList && buisnessInfoList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ buisnessInfo }: IRootState) => ({
  buisnessInfoList: buisnessInfo.entities,
  loading: buisnessInfo.loading,
  totalItems: buisnessInfo.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(BuisnessInfo);
