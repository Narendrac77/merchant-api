import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBusinessLegalContact, defaultValue } from 'app/shared/model/business-legal-contact.model';

export const ACTION_TYPES = {
  FETCH_BUSINESSLEGALCONTACT_LIST: 'businessLegalContact/FETCH_BUSINESSLEGALCONTACT_LIST',
  FETCH_BUSINESSLEGALCONTACT: 'businessLegalContact/FETCH_BUSINESSLEGALCONTACT',
  CREATE_BUSINESSLEGALCONTACT: 'businessLegalContact/CREATE_BUSINESSLEGALCONTACT',
  UPDATE_BUSINESSLEGALCONTACT: 'businessLegalContact/UPDATE_BUSINESSLEGALCONTACT',
  DELETE_BUSINESSLEGALCONTACT: 'businessLegalContact/DELETE_BUSINESSLEGALCONTACT',
  RESET: 'businessLegalContact/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBusinessLegalContact>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BusinessLegalContactState = Readonly<typeof initialState>;

// Reducer

export default (state: BusinessLegalContactState = initialState, action): BusinessLegalContactState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSLEGALCONTACT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSLEGALCONTACT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BUSINESSLEGALCONTACT):
    case REQUEST(ACTION_TYPES.UPDATE_BUSINESSLEGALCONTACT):
    case REQUEST(ACTION_TYPES.DELETE_BUSINESSLEGALCONTACT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSLEGALCONTACT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSLEGALCONTACT):
    case FAILURE(ACTION_TYPES.CREATE_BUSINESSLEGALCONTACT):
    case FAILURE(ACTION_TYPES.UPDATE_BUSINESSLEGALCONTACT):
    case FAILURE(ACTION_TYPES.DELETE_BUSINESSLEGALCONTACT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSLEGALCONTACT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSLEGALCONTACT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUSINESSLEGALCONTACT):
    case SUCCESS(ACTION_TYPES.UPDATE_BUSINESSLEGALCONTACT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUSINESSLEGALCONTACT):
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

const apiUrl = 'api/business-legal-contacts';

// Actions

export const getEntities: ICrudGetAllAction<IBusinessLegalContact> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BUSINESSLEGALCONTACT_LIST,
  payload: axios.get<IBusinessLegalContact>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBusinessLegalContact> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BUSINESSLEGALCONTACT,
    payload: axios.get<IBusinessLegalContact>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBusinessLegalContact> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUSINESSLEGALCONTACT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBusinessLegalContact> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUSINESSLEGALCONTACT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBusinessLegalContact> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUSINESSLEGALCONTACT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
