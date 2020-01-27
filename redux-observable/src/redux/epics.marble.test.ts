import { of, Observable } from 'rxjs';
import * as rxjs from 'rxjs';
import * as FF from 'rxjs/fetch';
import { TestScheduler } from 'rxjs/testing';

import { startRequestTextEpic } from './epics';
import { Constants as C } from './constants';
import { RootState, AllActions } from './types';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { HotObservable } from 'rxjs/internal/testing/HotObservable';
import { StartRequestTextAction } from './actions';
import { delay } from 'rxjs/operators';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

describe('startRequestTextEpic', () => {
  let initialState: RootState;

  beforeEach(() => {
    initialState = { simpleText: { isLoading: false, isHiTextShown: false } };
  })

  it('should dispatch finishRequestText if there is no error', (done) => {
      const fakeFetchResponse: string = 'fake response';
      // @ts-ignore: this is valid. See https://github.com/facebook/jest/issues/936#issuecomment-214556122
      rxjs.race = jest.fn((...observables: Array<Observable<AllActions>>) => observables[0]);
      // @ts-ignore this is valid also
      FF.fromFetch = jest.fn(() => of({ text: () => of(fakeFetchResponse).pipe(delay(1)) }));

      const testScheduler = new TestScheduler((actual, expected) => {
        // somehow assert the two objects are equal
        // e.g. with chai `expect(actual).deep.equal(expected)`
        expect(actual).toEqual(expected);
        done();
      });
      
      // https://github.com/redux-observable/redux-observable/issues/620#issuecomment-466736543
      testScheduler.run(({ hot, cold, expectObservable }) => {
      const actionInput$: ColdObservable<StartRequestTextAction> = cold('1ms -a', {
        a: { type: C.START_REQUEST_TEXT }
      });
      const action$: ActionsObservable<AllActions> = new ActionsObservable(actionInput$) as ActionsObservable<AllActions>;

      const stateInput$: HotObservable<RootState> = hot('-a', {
        a: initialState,
      });
      const state$ = new StateObservable(stateInput$, initialState);

      const output$ = startRequestTextEpic(action$, state$, {});
    
      expectObservable(output$).toBe('1ms --a', {
        a: {
          type: C.FINISH_REQUEST_TEXT,
          text: fakeFetchResponse,
        }
      });
    });
  });

  it('should dispatch only one finishRequestText despite many startRequestText', (done) => {
    const fakeFetchResponse: string = 'fake response';
    // @ts-ignore: this is valid. See https://github.com/facebook/jest/issues/936#issuecomment-214556122
    rxjs.race = jest.fn((...observables: Array<Observable<AllActions>>) => observables[0]);
    // @ts-ignore this is valid also
    FF.fromFetch = jest.fn(() => of({ text: () => {
      return of(fakeFetchResponse).pipe(
        delay(5),
      )
    }}));
    const testScheduler = new TestScheduler((actual, expected) => {
      // somehow assert the two objects are equal
      // e.g. with chai `expect(actual).deep.equal(expected)`
      expect(actual).toStrictEqual(expected);
      done();
    });
    //                                12345   67890
    const inputMarble: string =  '1ms -abc(d|)--------'
    //                                12345   67890
    const outputMarble: string = '1ms -----   ----(d|)'
                                                // ^ it is normal to have this parenthesis because 
                                                //   complete event and d are synchronous
                                                //   this position is the 10th frame
    
    // https://github.com/redux-observable/redux-observable/issues/620#issuecomment-466736543
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const actionInput$: ColdObservable<StartRequestTextAction> = cold(inputMarble, {
        a: { type: C.START_REQUEST_TEXT },
        b: { type: C.START_REQUEST_TEXT },
        c: { type: C.START_REQUEST_TEXT },
        d: { type: C.START_REQUEST_TEXT },
      });
      const action$: ActionsObservable<AllActions> = new ActionsObservable(actionInput$) as ActionsObservable<AllActions>;

      const stateInput$: HotObservable<RootState> = hot('-a', {
        a: initialState,
      });
      const state$ = new StateObservable(stateInput$, initialState);

      const output$ = startRequestTextEpic(action$, state$, {});
      
      expectObservable(output$).toBe(outputMarble, {
        d: {
          type: C.FINISH_REQUEST_TEXT,
          text: fakeFetchResponse,
        }
      });
    });
  });
});

export {}
