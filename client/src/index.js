import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'

import { Provider } from 'react-redux';
import { store } from './redux/store';
import GlobalStyle from './components/GlobalStyle';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyle>

      <App />

    </GlobalStyle>
  </Provider>
);


