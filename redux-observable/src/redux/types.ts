
import * as actions from "./actions";
import { ActionType } from 'typesafe-actions';

export type AllActions = ActionType<typeof actions>;

export interface RootState {
  simpleText: SimpleTextState;
}

export interface SimpleTextState {
  text?: string;
  errorMsg?: string;
  isLoading: boolean;

  isHiTextShown: boolean;
}

