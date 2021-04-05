import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBusinessBankAcc, defaultValue } from 'app/shared/model/business-bank-acc.model';

export const ACTION_TYPES = {
  FETCH_BUSINESSBANKACC_LIST: 'businessBankAcc/FETCH_BUSINESSBANKACC_LIST',
  FETCH_BUSINESSBANKACC: 'businessBankAcc/FETCH_BUSINESSBANKACC',
  CREATE_BUSINESSBANKACC: 'businessBankAcc/CREATE_BUSINESSBANKACC',
  UPDATE_BUSINESSBANKACC: 'businessBankAcc/UPDATE_BUSINESSBANKACC',
  DELETE_BUSINESSBANKACC: 'businessBankAcc/DELETE_BUSINESSBANKACC',
  RESET: 'businessBankAcc/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBusinessBankAcc>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BusinessBankAccState = Readonly<typeof initialState>;

// Reducer

export default (state: BusinessBankAccState = initialState, action): BusinessBankAccState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSBANKACC_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BUSINESSBANKACC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BUSINESSBANKACC):
    case REQUEST(ACTION_TYPES.UPDATE_BUSINESSBANKACC):
    case REQUEST(ACTION_TYPES.DELETE_BUSINESSBANKACC):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSBANKACC_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BUSINESSBANKACC):
    case FAILURE(ACTION_TYPES.CREATE_BUSINESSBANKACC):
    case FAILURE(ACTION_TYPES.UPDATE_BUSINESSBANKACC):
    case FAILURE(ACTION_TYPES.DELETE_BUSINESSBANKACC):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSBANKACC_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BUSINESSBANKACC):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BUSINESSBANKACC):
    case SUCCESS(ACTION_TYPES.UPDATE_BUSINESSBANKACC):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BUSINESSBANKACC):
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

const apiUrl = 'api/business-bank-accs';

// Actions

export const getEntities: ICrudGetAllAction<IBusinessBankAcc> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BUSINESSBANKACC_LIST,
  payload: axios.get<IBusinessBankAcc>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBusinessBankAcc> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BUSINESSBANKACC,
    payload: axios.get<IBusinessBankAcc>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBusinessBankAcc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BUSINESSBANKACC,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBusinessBankAcc> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BUSINESSBANKACC,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBusinessBankAcc> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BUSINESSBANKACC,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
