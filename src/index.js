import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux-store/store';
import App from './components/App';
// import DataFetcher from './components/DataFetcher';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <DataFetcher /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
