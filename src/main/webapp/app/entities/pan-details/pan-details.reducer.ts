import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPanDetails, defaultValue } from 'app/shared/model/pan-details.model';

export const ACTION_TYPES = {
  FETCH_PANDETAILS_LIST: 'panDetails/FETCH_PANDETAILS_LIST',
  FETCH_PANDETAILS: 'panDetails/FETCH_PANDETAILS',
  CREATE_PANDETAILS: 'panDetails/CREATE_PANDETAILS',
  UPDATE_PANDETAILS: 'panDetails/UPDATE_PANDETAILS',
  DELETE_PANDETAILS: 'panDetails/DELETE_PANDETAILS',
  RESET: 'panDetails/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPanDetails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PanDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: PanDetailsState = initialState, action): PanDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PANDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PANDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PANDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_PANDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_PANDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PANDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PANDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_PANDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_PANDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_PANDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PANDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PANDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PANDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_PANDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PANDETAILS):
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

const apiUrl = 'api/pan-details';

// Actions

export const getEntities: ICrudGetAllAction<IPanDetails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PANDETAILS_LIST,
  payload: axios.get<IPanDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPanDetails> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PANDETAILS,
    payload: axios.get<IPanDetails>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPanDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PANDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPanDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PANDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPanDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PANDETAILS,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
