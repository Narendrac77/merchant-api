import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPanverification, defaultValue } from 'app/shared/model/panverification.model';

export const ACTION_TYPES = {
  FETCH_PANVERIFICATION_LIST: 'panverification/FETCH_PANVERIFICATION_LIST',
  FETCH_PANVERIFICATION: 'panverification/FETCH_PANVERIFICATION',
  CREATE_PANVERIFICATION: 'panverification/CREATE_PANVERIFICATION',
  UPDATE_PANVERIFICATION: 'panverification/UPDATE_PANVERIFICATION',
  DELETE_PANVERIFICATION: 'panverification/DELETE_PANVERIFICATION',
  RESET: 'panverification/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPanverification>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PanverificationState = Readonly<typeof initialState>;

// Reducer

export default (state: PanverificationState = initialState, action): PanverificationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PANVERIFICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PANVERIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PANVERIFICATION):
    case REQUEST(ACTION_TYPES.UPDATE_PANVERIFICATION):
    case REQUEST(ACTION_TYPES.DELETE_PANVERIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PANVERIFICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PANVERIFICATION):
    case FAILURE(ACTION_TYPES.CREATE_PANVERIFICATION):
    case FAILURE(ACTION_TYPES.UPDATE_PANVERIFICATION):
    case FAILURE(ACTION_TYPES.DELETE_PANVERIFICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PANVERIFICATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PANVERIFICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PANVERIFICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_PANVERIFICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PANVERIFICATION):
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

const apiUrl = 'api/panverifications';

// Actions

export const getEntities: ICrudGetAllAction<IPanverification> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PANVERIFICATION_LIST,
  payload: axios.get<IPanverification>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPanverification> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PANVERIFICATION,
    payload: axios.get<IPanverification>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPanverification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PANVERIFICATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPanverification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PANVERIFICATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPanverification> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PANVERIFICATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
