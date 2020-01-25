import { Reducer } from 'redux';

import { SimpleTextState } from './types';
import { Constants as C } from './constants';
import { StartRequestTextAction, FinishRequestTextAction, ErrorRequestTextAction } from './actions';

type AllActions =
  StartRequestTextAction |
  FinishRequestTextAction |
  ErrorRequestTextAction;

export const simpleTextReducer: Reducer<SimpleTextState, AllActions> =
  (state = { isLoading: false }, action) => {
      switch (action.type) {
        case C.START_REQUEST_TEXT:
          return {
            ...state,
            isLoading: true,
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
        default:
          return state;
      }
  }
