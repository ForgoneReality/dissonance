import App from "./App";
import React from "react"
import { Provider } from 'react-redux';

import {
  Route,
  Redirect,
  Switch,
  Link,
  HashRouter
} from 'react-router-dom';



const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <App></App>
    </HashRouter>
  </Provider>
);
export default Root
