import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware, Epic } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducer';
import { RootState, AllActions } from './types';
import rootEpic from './epics';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const initialRootState: RootState = { simpleText: { isLoading: false, isHiTextShown: false } };

const store = createStore<RootState, AllActions, any, any>(
  reducers,
  initialRootState,
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
    ),
  )
);

epicMiddleware.run(rootEpic as Epic<AllActions, AllActions, any>);

export default store;