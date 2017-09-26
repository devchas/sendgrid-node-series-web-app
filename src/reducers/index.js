import { combineReducers } from 'redux';
import seriesReducer from './seriesReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  series: seriesReducer,
  modal: modalReducer
});

export default rootReducer;