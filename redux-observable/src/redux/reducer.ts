import { Reducer, combineReducers } from 'redux';

import { SimpleTextState, AllActions } from './types';
import { Constants as C } from './constants';
import { RootState } from './types';

export const simpleTextReducer: Reducer<SimpleTextState, AllActions> =
  (state = { isLoading: false, isHiTextShown: false }, action) => {
    switch (action.type) {
      case C.START_REQUEST_TEXT:
        return {
          ...state,
          isLoading: true,
          isCancelled: false,
        };
      case C.FINISH_REQUEST_TEXT:
        return {
          ...state,
          text: action.text,
          isLoading: false,
        };
      case C.ERROR_REQUEST_TEXT:
        return {
          ...state,
          errorMsg: action.errorMsg,
          isLoading: false,
        };
      case C.TOGGLE_HI_TEXT:
        return {
          ...state,
          isHiTextShown: !state.isHiTextShown,
        }
      default:
        return state;
    }
  }

const reducers: Reducer<RootState> = combineReducers<RootState>({
  simpleText: simpleTextReducer,
});

export default reducers;
