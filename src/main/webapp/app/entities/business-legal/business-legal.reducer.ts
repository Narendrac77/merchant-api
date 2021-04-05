import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBusinessLegal, defaultValue } from 'app/shared/model/business-legal.model';

export const ACTION_TYPES = {
  FETCH_BUSINESSLEGAL_LIST: 'businessLegal/FETCH_BUSINESSLEGAL_LIST',
  FETCH_BUSINESSLEGAL: 'businessLegal/FETCH_BUSINESSLEGAL',
  CREATE_BUSINESSLEGAL: 'businessLegal/CREATE_BUSINESSLEGAL',
  UPDATE_BUSINESSLEGAL: 'businessLegal/UPDATE_BUSINESSLEGAL',
  DELETE_BUSINESSLEGAL: 'businessLegal/DELETE_BUSINESSLEGAL',
  RESET: 'businessLegal/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBusinessLegal>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BusinessLegalState = Readonly<typeof initialState>;

// Reducer

export default (state: BusinessLegalState = initialState, action): BusinessLegalState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSLEGAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSLEGAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BUSINESSLEGAL):
    case REQUEST(ACTION_TYPES.UPDATE_BUSINESSLEGAL):
    case REQUEST(ACTION_TYPES.DELETE_BUSINESSLEGAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSLEGAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSLEGAL):
    case FAILURE(ACTION_TYPES.CREATE_BUSINESSLEGAL):
    case FAILURE(ACTION_TYPES.UPDATE_BUSINESSLEGAL):
    case FAILURE(ACTION_TYPES.DELETE_BUSINESSLEGAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSLEGAL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSLEGAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUSINESSLEGAL):
    case SUCCESS(ACTION_TYPES.UPDATE_BUSINESSLEGAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUSINESSLEGAL):
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

const apiUrl = 'api/business-legals';

// Actions

export const getEntities: ICrudGetAllAction<IBusinessLegal> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BUSINESSLEGAL_LIST,
  payload: axios.get<IBusinessLegal>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBusinessLegal> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BUSINESSLEGAL,
    payload: axios.get<IBusinessLegal>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBusinessLegal> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUSINESSLEGAL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBusinessLegal> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUSINESSLEGAL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBusinessLegal> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUSINESSLEGAL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
