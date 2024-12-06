import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


import { persistor, store } from './redux/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { SocketProvider } from './providers/socket.provider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import App from './App';
import './index.css';
import GlobalStyle from './components/GlobalStyle';


const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle>
          <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}>
            <SocketProvider>
              <App />
            </SocketProvider>
          </GoogleOAuthProvider>
        </GlobalStyle>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);
