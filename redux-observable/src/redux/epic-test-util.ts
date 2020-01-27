import { Action } from 'redux';
import { Epic } from 'redux-observable';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Subject, Observable } from 'rxjs';
import { toArray } from 'rxjs/operators';

import { AllActions } from './types';

interface RunEpicTestParams<ActionsUsed extends Action<any>, RootState> {
  epicToTest: Epic<ActionsUsed, ActionsUsed, RootState>;
  inputActions: Array<ActionsUsed>;
  initialState: RootState;
  expectedActions: Array<ActionsUsed>;
  done(): void;
}

export async function runEpicTest<ActionsUsed extends Action, State>({
  epicToTest,
  inputActions,
  initialState,
  expectedActions,
  done,
}: RunEpicTestParams<AllActions, State>): Promise<void> {
  const inputAction$ = ActionsObservable.of(...inputActions) as ActionsObservable<ActionsUsed>;
  const state$ = new StateObservable<State>(new Subject(), initialState);

  const actualActions$: Observable<ActionsUsed> = epicToTest(inputAction$, state$, {}) as Observable<ActionsUsed>;
  const actualActionsArray: Array<AllActions> = await actualActions$.pipe(toArray()).toPromise();
  
  expect(actualActionsArray).toEqual(expectedActions);
  done();
}
