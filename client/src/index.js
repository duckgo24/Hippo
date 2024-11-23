import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';
import './index.css';

import GlobalStyle from './components/GlobalStyle';
import { persistor, store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SocketProvider } from './providers/socket.provider';
import NotificationListener from './components/NotificationListenter';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
          <SocketProvider>
            <App />

          </SocketProvider>
        </GoogleOAuthProvider>
      </GlobalStyle>
    </PersistGate>
  </Provider>
);
