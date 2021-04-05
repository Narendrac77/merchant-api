import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGstinverification, defaultValue } from 'app/shared/model/gstinverification.model';

export const ACTION_TYPES = {
  FETCH_GSTINVERIFICATION_LIST: 'gstinverification/FETCH_GSTINVERIFICATION_LIST',
  FETCH_GSTINVERIFICATION: 'gstinverification/FETCH_GSTINVERIFICATION',
  CREATE_GSTINVERIFICATION: 'gstinverification/CREATE_GSTINVERIFICATION',
  UPDATE_GSTINVERIFICATION: 'gstinverification/UPDATE_GSTINVERIFICATION',
  DELETE_GSTINVERIFICATION: 'gstinverification/DELETE_GSTINVERIFICATION',
  RESET: 'gstinverification/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGstinverification>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type GstinverificationState = Readonly<typeof initialState>;

// Reducer

export default (state: GstinverificationState = initialState, action): GstinverificationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GSTINVERIFICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GSTINVERIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_GSTINVERIFICATION):
    case REQUEST(ACTION_TYPES.UPDATE_GSTINVERIFICATION):
    case REQUEST(ACTION_TYPES.DELETE_GSTINVERIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_GSTINVERIFICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GSTINVERIFICATION):
    case FAILURE(ACTION_TYPES.CREATE_GSTINVERIFICATION):
    case FAILURE(ACTION_TYPES.UPDATE_GSTINVERIFICATION):
    case FAILURE(ACTION_TYPES.DELETE_GSTINVERIFICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GSTINVERIFICATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GSTINVERIFICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_GSTINVERIFICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_GSTINVERIFICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_GSTINVERIFICATION):
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

const apiUrl = 'api/gstinverifications';

// Actions

export const getEntities: ICrudGetAllAction<IGstinverification> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GSTINVERIFICATION_LIST,
  payload: axios.get<IGstinverification>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IGstinverification> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GSTINVERIFICATION,
    payload: axios.get<IGstinverification>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IGstinverification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GSTINVERIFICATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGstinverification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GSTINVERIFICATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGstinverification> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GSTINVERIFICATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
