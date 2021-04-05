import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IGstinDetails, defaultValue } from 'app/shared/model/gstin-details.model';

export const ACTION_TYPES = {
  FETCH_GSTINDETAILS_LIST: 'gstinDetails/FETCH_GSTINDETAILS_LIST',
  FETCH_GSTINDETAILS: 'gstinDetails/FETCH_GSTINDETAILS',
  CREATE_GSTINDETAILS: 'gstinDetails/CREATE_GSTINDETAILS',
  UPDATE_GSTINDETAILS: 'gstinDetails/UPDATE_GSTINDETAILS',
  DELETE_GSTINDETAILS: 'gstinDetails/DELETE_GSTINDETAILS',
  RESET: 'gstinDetails/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IGstinDetails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type GstinDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: GstinDetailsState = initialState, action): GstinDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_GSTINDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_GSTINDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_GSTINDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_GSTINDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_GSTINDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_GSTINDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_GSTINDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_GSTINDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_GSTINDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_GSTINDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GSTINDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_GSTINDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_GSTINDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_GSTINDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_GSTINDETAILS):
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

const apiUrl = 'api/gstin-details';

// Actions

export const getEntities: ICrudGetAllAction<IGstinDetails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_GSTINDETAILS_LIST,
  payload: axios.get<IGstinDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IGstinDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_GSTINDETAILS,
    payload: axios.get<IGstinDetails>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IGstinDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_GSTINDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IGstinDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_GSTINDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IGstinDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_GSTINDETAILS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
