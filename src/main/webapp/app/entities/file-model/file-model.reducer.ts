import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFileModel, defaultValue } from 'app/shared/model/file-model.model';

export const ACTION_TYPES = {
  FETCH_FILEMODEL_LIST: 'fileModel/FETCH_FILEMODEL_LIST',
  FETCH_FILEMODEL: 'fileModel/FETCH_FILEMODEL',
  CREATE_FILEMODEL: 'fileModel/CREATE_FILEMODEL',
  UPDATE_FILEMODEL: 'fileModel/UPDATE_FILEMODEL',
  DELETE_FILEMODEL: 'fileModel/DELETE_FILEMODEL',
  SET_BLOB: 'fileModel/SET_BLOB',
  RESET: 'fileModel/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFileModel>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type FileModelState = Readonly<typeof initialState>;

// Reducer

export default (state: FileModelState = initialState, action): FileModelState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FILEMODEL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FILEMODEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FILEMODEL):
    case REQUEST(ACTION_TYPES.UPDATE_FILEMODEL):
    case REQUEST(ACTION_TYPES.DELETE_FILEMODEL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_FILEMODEL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FILEMODEL):
    case FAILURE(ACTION_TYPES.CREATE_FILEMODEL):
    case FAILURE(ACTION_TYPES.UPDATE_FILEMODEL):
    case FAILURE(ACTION_TYPES.DELETE_FILEMODEL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEMODEL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FILEMODEL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FILEMODEL):
    case SUCCESS(ACTION_TYPES.UPDATE_FILEMODEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FILEMODEL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType,
        },
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/file-models';

// Actions

export const getEntities: ICrudGetAllAction<IFileModel> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FILEMODEL_LIST,
  payload: axios.get<IFileModel>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IFileModel> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FILEMODEL,
    payload: axios.get<IFileModel>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFileModel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FILEMODEL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFileModel> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FILEMODEL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFileModel> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FILEMODEL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType,
  },
});

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
