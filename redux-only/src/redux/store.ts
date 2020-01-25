import { combineReducers, createStore, Action, Reducer } from 'redux';
import { simpleTextReducer } from './reducer';
import { SimpleTextState } from './types';
import { Constants as C } from './constants';

export interface State {
  simpleText: SimpleTextState;
}

export const reducers: Reducer<State> = combineReducers<State>({
  simpleText: simpleTextReducer,
});

const store = createStore<State, Action<C>, any, any>(
  reducers,  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;