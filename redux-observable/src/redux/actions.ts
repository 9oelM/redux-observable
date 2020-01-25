import { Constants as C } from './constants';
import { Action } from 'redux';

export interface StartRequestTextAction extends Action<C.START_REQUEST_TEXT> {}

export const startRequestText: () => StartRequestTextAction = () => ({
  type: C.START_REQUEST_TEXT,
});

export interface FinishRequestTextAction extends Action<typeof C.FINISH_REQUEST_TEXT> {
  text: string;
}

export const finishRequestText: (text: string) => FinishRequestTextAction = (text) => ({
  type: C.FINISH_REQUEST_TEXT,
  text,
});

export interface ErrorRequestTextAction extends Action<typeof C.ERROR_REQUEST_TEXT> {
  errorMsg: string;
}

export const errorRequestText: (errorMsg: string) => ErrorRequestTextAction = (errorMsg) => ({
  type: C.ERROR_REQUEST_TEXT,
  errorMsg,
});

export interface ToggleHiTextAction extends Action<typeof C.TOGGLE_HI_TEXT> {}

export const toggleHiText: () => ToggleHiTextAction = () => ({
  type: C.TOGGLE_HI_TEXT
});
