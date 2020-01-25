import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import DummyTextRequestButton from './DummyTextRequestButton/DummyTextRequestButton';
import DummyTextViewer from './DummyTextViewer/DummyTextViewer';
import ShowHiTextButton from './ShowHiTextButton/ShowHiTextButton';
import HiTextViewer from './HiTextViewer/HiTextViewer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <DummyTextRequestButton />
        <ShowHiTextButton />
        <DummyTextViewer />
        <HiTextViewer />
      </div>
    </Provider>
  );
}

export default App;
