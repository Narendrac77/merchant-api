import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBankverification, defaultValue } from 'app/shared/model/bankverification.model';

export const ACTION_TYPES = {
  FETCH_BANKVERIFICATION_LIST: 'bankverification/FETCH_BANKVERIFICATION_LIST',
  FETCH_BANKVERIFICATION: 'bankverification/FETCH_BANKVERIFICATION',
  CREATE_BANKVERIFICATION: 'bankverification/CREATE_BANKVERIFICATION',
  UPDATE_BANKVERIFICATION: 'bankverification/UPDATE_BANKVERIFICATION',
  DELETE_BANKVERIFICATION: 'bankverification/DELETE_BANKVERIFICATION',
  RESET: 'bankverification/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBankverification>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BankverificationState = Readonly<typeof initialState>;

// Reducer

export default (state: BankverificationState = initialState, action): BankverificationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BANKVERIFICATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BANKVERIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BANKVERIFICATION):
    case REQUEST(ACTION_TYPES.UPDATE_BANKVERIFICATION):
    case REQUEST(ACTION_TYPES.DELETE_BANKVERIFICATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BANKVERIFICATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BANKVERIFICATION):
    case FAILURE(ACTION_TYPES.CREATE_BANKVERIFICATION):
    case FAILURE(ACTION_TYPES.UPDATE_BANKVERIFICATION):
    case FAILURE(ACTION_TYPES.DELETE_BANKVERIFICATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANKVERIFICATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BANKVERIFICATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BANKVERIFICATION):
    case SUCCESS(ACTION_TYPES.UPDATE_BANKVERIFICATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BANKVERIFICATION):
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

const apiUrl = 'api/bankverifications';

// Actions

export const getEntities: ICrudGetAllAction<IBankverification> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BANKVERIFICATION_LIST,
  payload: axios.get<IBankverification>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBankverification> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BANKVERIFICATION,
    payload: axios.get<IBankverification>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBankverification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BANKVERIFICATION,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBankverification> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BANKVERIFICATION,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBankverification> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BANKVERIFICATION,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
