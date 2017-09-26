import axios from 'axios';

const ROOT_URL = 'http://localhost:4000';

export const types = {
  CREATE_SERIES: 'CREATE_SERIES',
  UPDATE_SERIES_LABEL: 'UPDATE_SERIES_LABEL',
  DELETE_SERIES: 'DELETE_SERIES',
  GET_SG_TEMPLATES: 'GET_SG_TEMPLATES',
  GET_ALL_SERIES: 'GET_ALL_SERIES',
  GET_SERIES_BY_ID: 'GET_SERIES_BY_ID',
  CREATE_STAGE: 'CREATE_STAGE',
  UPDATE_STAGE: 'UPDATE_STAGE',
  DELETE_STAGE: 'DELETE_STAGE',
  TOGGLE_MODAL: 'TOGGLE_MODAL'
}

export function toggleModal(payload) {
  return {
    type: types.TOGGLE_MODAL,
    payload: payload
  }
}

export function getSGTemplates() {
  return dispatch => {
    return axios.get(`${ROOT_URL}/templates`).then(response => {
      dispatch({
        type: types.GET_SG_TEMPLATES,
        payload: response.data.templates
      });
    });
  }
}

export function createSeries(params) {
  return dispatch => {
    return axios.post(`${ROOT_URL}/series`, params).then(response => {
      dispatch({
        type: types.CREATE_SERIES,
        payload: Object.assign({}, response.data.emailSeries, { stages: [] })
      }); 
    });
  }
}

export function updateSeries(params) {
  return dispatch => {
    return axios.put(`${ROOT_URL}/series/label`, params).then(response => {
      dispatch({
        type: types.UPDATE_SERIES_LABEL,
        payload: response.data
      });
    });
  }
}

export function deleteSeries(params) {
  return dispatch => {
    return axios.delete(`${ROOT_URL}/series`, { data: params }).then(response => {
      dispatch({
        type: types.DELETE_SERIES,
        payload: response.data.DELETED.id
      })
    });
  }
}

export function getAllSeries() {
  return dispatch => {
    return axios.get(`${ROOT_URL}/series`).then(response => {
      dispatch({
        type: types.GET_ALL_SERIES,
        payload: response.data
      });
    });
  }
}

export function getSeriesById(id) {
  return dispatch => {
    return axios.get(`${ROOT_URL}/series/${id}`).then(response => {
      dispatch({
        type: types.GET_SERIES_BY_ID,
        payload: response.data
      });
    });
  }
}

export function createStage(params) {
  return dispatch => {
    return axios.post(`${ROOT_URL}/series/stage`, params).then(response => {
      dispatch({
        type: types.CREATE_STAGE,
        payload: Object.assign({}, response.data, { emailSeryId: params.emailSeryId }) 
      });      
    });
  }
}

export function updateStage(params) {
  return dispatch => {
    return axios.put(`${ROOT_URL}/series/stage`, params).then(response => {
      dispatch({
        type: types.UPDATE_STAGE,
        payload: Object.assign({}, response.data, { emailSeryId: params.emailSeryId })
      });
    });
  }
}

export function deleteStage(params) {
  return dispatch => {
    return axios.delete(`${ROOT_URL}/series/stage`, { data: params }).then(response => {
      dispatch({
        type: types.DELETE_STAGE,
        payload: Object.assign({}, response.data, { emailSeryId: params.emailSeryId })
      });
    });
  }
}