import { types } from '../actions';
import _ from 'lodash';

const initialState = {
  sgTemplates: [],
  seriesList: [],
  seriesUserList: [],
  emailSeries: {},
  updateSwitch: false
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case types.GET_SG_TEMPLATES:
      var sgTemplates = _.sortBy(payload, ['name'])
      return Object.assign({}, state, { sgTemplates });
    case types.CREATE_SERIES:
      var seriesList = state.seriesList.concat([payload]);
      return Object.assign({}, state, { seriesList });
    case types.UPDATE_SERIES_LABEL:
      var updatedSeries = _.find(state.seriesList, o => o.id === payload.id);
      seriesList = state.seriesList.map(series => {
        if (series.id === payload.id) {
          return Object.assign({}, series, { label: payload.label });
        } else {
          return series;
        }
      });
      return Object.assign({}, state, { seriesList });
    case types.DELETE_SERIES:
      seriesList = _.filter(state.seriesList, o => o.id !== payload);
      return Object.assign({}, state, { seriesList });
    case types.GET_ALL_SERIES:
      seriesList = payload.map(series => {
        return Object.assign({}, series, { stages: sortByDays(series.stages) });
      });
      return Object.assign({}, state, { seriesList });
    case types.GET_SERIES_BY_ID:
      const emailSeries = Object.assign({}, payload, {
        stages: sortByDays(payload.stages)
      });
      return Object.assign({}, state, { emailSeries });
    case types.CREATE_STAGE:
      var seriesToUpdate = _.find(state.seriesList, ['id', payload.emailSeryId ]);
      
      var stages = seriesToUpdate.stages;
      stages.push(payload);
      stages = sortByDays(stages);
      
      updatedSeries = Object.assign({}, seriesToUpdate, { stages });
      var updatedSeriesList = state.seriesList.map(series => {
        return (series.id === payload.emailSeryId) ? updatedSeries : series;
      });

      return Object.assign({}, state, {
        seriesList: updatedSeriesList,
        updateSwitch: state.updateSwitch
      });
    case types.UPDATE_STAGE:
      seriesToUpdate = _.find(state.seriesList, ['id', payload.emailSeryId ]);

      updatedSeries = Object.assign({}, seriesToUpdate, { 
        stages: getUpdatedStages(seriesToUpdate, payload)
      });

      updatedSeriesList = state.seriesList.map(series => {
        return (series.id === payload.emailSeryId) ? updatedSeries : series;
      });

      return Object.assign({}, state, {
        seriesList: updatedSeriesList,
        updateSwitch: state.updateSwitch
      });      
    case types.DELETE_STAGE:
      seriesToUpdate = _.find(state.seriesList, ['id', payload.emailSeryId ]);

      updatedSeries = Object.assign({}, seriesToUpdate, {
        stages: deleteStage(seriesToUpdate.stages, payload)
      });

      updatedSeriesList = state.seriesList.map(series => {
        return (series.id === payload.emailSeryId) ? updatedSeries : series;
      });

      return Object.assign({}, state, {
        seriesList: updatedSeriesList,
        updateSwitch: state.updateSwitch
      }); 
    case types.GET_SERIES_USERS:
      return Object.assign({}, state, {
        seriesUserList: prepareSeriesUserList(state.seriesUserList, payload)
      });
    default:
      return state;
  }
}

function prepareSeriesUserList(seriesUserList, { emailSeryId, users }) {
  if (seriesUserList.length === 0) { return [{ emailSeryId, users }]; }

  return seriesUserList.map(item => {
    if (item.id === emailSeryId) {
      return { emailSeryId, users };
    } else {
      return item;
    }
  });
}

function sortByDays(list) {
  return _.sortBy(list, ['daysToSend']);
}

function getUpdatedStages(emailSeries, updatedStage={}) {
  const existingStages = emailSeries.stages;

  const result = existingStages.map(existingStage => {
    if (existingStage.id === updatedStage.id) {
      return updatedStage;
    } else {
      return existingStage;
    }
  });

  return _.sortBy(result, ['daysToSend']);
}

function deleteStage(stages, deletedStage) {
  var updatedStages = [];
  stages.forEach(stage => {
    if (stage.id !== deletedStage.id) {
      updatedStages.push(stage);
    }
  });

  return updatedStages;
}