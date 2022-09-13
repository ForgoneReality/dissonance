//React
import React from 'react';
import ReactDOM from 'react-dom';
//Components
import Root from './components/root';
import configureStore from './store/store';

document.addEventListener('DOMContentLoaded', () => {
  let store;
  let persistor;
  if (window.currentUser) {
    const preloadedState = {
      session: { id: window.currentUser.id, currentUser: window.currentUser },
    };
    store = configureStore(1, preloadedState);
    persistor = configureStore(2, preloadedState);
    delete window.currentUser;
  } else {
    store = configureStore(1);
    persistor = configureStore(2);
  }

  window.store = store;
  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store} persistor={persistor} />, root);
});
