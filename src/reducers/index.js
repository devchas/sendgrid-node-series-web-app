import { combineReducers } from 'redux';
import seriesReducer from './seriesReducer';

const rootReducer = combineReducers({
  series: seriesReducer
});

export default rootReducer;