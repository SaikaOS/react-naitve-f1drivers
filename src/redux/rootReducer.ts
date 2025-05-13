import { combineReducers } from 'redux';
import driversReducer from './driversSlice';
import racesReducer from './racesSlice';

const rootReducer = combineReducers({
  drivers: driversReducer,
  races: racesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;