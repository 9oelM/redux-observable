import { Epic, ofType, combineEpics } from "redux-observable";
import { from, of, race, Observable } from 'rxjs';
import { catchError, mergeMap, switchMap, filter, map, take } from 'rxjs/operators';
import { fromFetch } from 'rxjs/fetch';

import { Constants as C } from './constants';
import { RootState, AllActions } from "./types";
import * as A from "./actions";

export const startRequestTextEpic: Epic<AllActions, AllActions, RootState> = (action$, store$) =>
  action$.pipe(
    ofType(C.START_REQUEST_TEXT),
    switchMap(() => {
      const REQUEST_URL: string = 'https://baconipsum.com/api/?type=meat?paras=200';

      const sendRequest$: Observable<A.FinishRequestTextAction | A.ErrorRequestTextAction> =
        fromFetch(REQUEST_URL).pipe(
          mergeMap(
            (resp: Response) => 
              from(resp.text())
                .pipe(
                  mergeMap((text: string) => of(A.finishRequestText(text))),
                )
          ),
          catchError((error: Error) => of(A.errorRequestText(error.message))),
        )

      const cancelRequest$: Observable<A.FinishRequestTextAction> = action$.pipe(
        ofType(C.TOGGLE_HI_TEXT),
        filter(() => store$.value.simpleText.isHiTextShown),
        map(() => A.finishRequestText('')),
        take(1),
      );

      return race(sendRequest$, cancelRequest$);
    }),
  );

const rootEpic: Epic<AllActions, AllActions, RootState> = combineEpics(
  startRequestTextEpic,
);

export default rootEpic;
