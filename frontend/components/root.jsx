import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { Route, Redirect, Switch, Link, HashRouter } from 'react-router-dom';

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <HashRouter>
      <PersistGate persistor={persistor}>
        <App></App>
      </PersistGate>
    </HashRouter>
  </Provider>
);
export default Root;
