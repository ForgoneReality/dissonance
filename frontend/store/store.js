import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'persist-key',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStore = (flag, preloadedState = {}) => {
  const store = createStore(
    persistedReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
  );
  const persistor = persistStore(store);
  if (flag === 1) return store;
  if (flag === 2) return persistor;
};
export default configureStore;
