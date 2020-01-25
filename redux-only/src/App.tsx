import React from 'react';
import { Provider } from 'react-redux';

import store from './redux/store';
import DummyTextRequestButton from './DummyTextRequestButton/DummyTextRequestButton';
import DummyTextViewer from './DummyTextViewer/DummyTextViewer';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <DummyTextRequestButton />
        <DummyTextViewer />
      </div>
    </Provider>
  );
}

export default App;
