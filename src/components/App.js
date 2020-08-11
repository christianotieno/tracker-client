import React from 'react';
import { Provider } from 'react-redux';
import store from '../react-store/store';

function App() {
  return (
    <Provider store={store}>
      <div>
        <h1>Hello World</h1>
      </div>
    </Provider>
  );
}

export default App;
