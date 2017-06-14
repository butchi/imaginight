import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';

// reducers, initial states
import StageReducer, { stageState } from './stage/module';

export const initialState = Immutable.fromJS({
  stage: stageState,
});

// TODO: ツリー構造とnamespaceを整理する
export const reducers = combineReducers({
  stage: StageReducer,
});
