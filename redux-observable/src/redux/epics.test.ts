import { of, Observable } from 'rxjs';
import * as rxjs from 'rxjs';
import * as FF from 'rxjs/fetch';

import { startRequestTextEpic } from './epics';
import { Constants as C } from './constants';
import { RootState, AllActions } from './types';
import { runEpicTest } from './epic-test-util';

describe('startRequestTextEpic', () => {
  let initialState: RootState;
  let inputActions: Array<AllActions>;

  beforeEach(() => {
    initialState = { simpleText: { isLoading: false, isHiTextShown: false } };
    inputActions = [{ type: C.START_REQUEST_TEXT }];
  })

  it('should dispatch finishRequestText if there is no error', (done) => {
    const fakeFetchResponse: string = 'test response, hi';

    /**
     * Surprisingly, jest supports mocking individual functions 
     * from modules like this in each different test
     */
    // @ts-ignore: this is valid. See https://github.com/facebook/jest/issues/936#issuecomment-214556122
    rxjs.race = jest.fn((...observables: Array<Observable<AllActions>>) => observables[0]);
    // @ts-ignore this is valid also
    FF.fromFetch = jest.fn(() => of({ text: () => of(fakeFetchResponse) }));
    runEpicTest<AllActions, RootState>({
      epicToTest: startRequestTextEpic,
      expectedActions: [
        {
          type: C.FINISH_REQUEST_TEXT,
          text: fakeFetchResponse,
        }
      ],
      inputActions,
      initialState,
      done,
    });
  });

  it('should dispatch errorRequestText if there is an error while fetching data', (done) => {
    const fakeErrorMessage: string = 'test error message, hi';
    // @ts-ignore
    FF.fromFetch = jest.fn(() => of({ text: () => { throw new Error(fakeErrorMessage)} }));
    
    runEpicTest<AllActions, RootState>({
      epicToTest: startRequestTextEpic,
      expectedActions: [
        {
          type: C.ERROR_REQUEST_TEXT,
          errorMsg: fakeErrorMessage,
        }
      ],
      inputActions,
      initialState,
      done,
    });
  });

  it('should dispatch finishRequestText earlier if TOGGLE_HI_TEXT is called in the middle', (done) => {
    initialState = { simpleText: { ...initialState.simpleText, isHiTextShown: true } };

    // @ts-ignore
    rxjs.race = jest.fn((...observables: Array<Observable<AllActions>>) => observables[1]);

    runEpicTest<AllActions, RootState>({
      epicToTest: startRequestTextEpic,
      expectedActions: [
        {
          type: C.FINISH_REQUEST_TEXT,
          text: '',
        }
      ],
      inputActions: [...inputActions, { type: C.TOGGLE_HI_TEXT }],
      initialState,
      done,
    });
  });
});

export {}
