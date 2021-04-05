import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBuisnessInfo, defaultValue } from 'app/shared/model/buisness-info.model';

export const ACTION_TYPES = {
  FETCH_BUISNESSINFO_LIST: 'buisnessInfo/FETCH_BUISNESSINFO_LIST',
  FETCH_BUISNESSINFO: 'buisnessInfo/FETCH_BUISNESSINFO',
  CREATE_BUISNESSINFO: 'buisnessInfo/CREATE_BUISNESSINFO',
  UPDATE_BUISNESSINFO: 'buisnessInfo/UPDATE_BUISNESSINFO',
  DELETE_BUISNESSINFO: 'buisnessInfo/DELETE_BUISNESSINFO',
  RESET: 'buisnessInfo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBuisnessInfo>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type BuisnessInfoState = Readonly<typeof initialState>;

// Reducer

export default (state: BuisnessInfoState = initialState, action): BuisnessInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUISNESSINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUISNESSINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BUISNESSINFO):
    case REQUEST(ACTION_TYPES.UPDATE_BUISNESSINFO):
    case REQUEST(ACTION_TYPES.DELETE_BUISNESSINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BUISNESSINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUISNESSINFO):
    case FAILURE(ACTION_TYPES.CREATE_BUISNESSINFO):
    case FAILURE(ACTION_TYPES.UPDATE_BUISNESSINFO):
    case FAILURE(ACTION_TYPES.DELETE_BUISNESSINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUISNESSINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUISNESSINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUISNESSINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_BUISNESSINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUISNESSINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/buisness-infos';

// Actions

export const getEntities: ICrudGetAllAction<IBuisnessInfo> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BUISNESSINFO_LIST,
    payload: axios.get<IBuisnessInfo>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};

export const getEntity: ICrudGetAction<IBuisnessInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BUISNESSINFO,
    payload: axios.get<IBuisnessInfo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBuisnessInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUISNESSINFO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBuisnessInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUISNESSINFO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBuisnessInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUISNESSINFO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
