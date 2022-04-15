import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
        <App />
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

