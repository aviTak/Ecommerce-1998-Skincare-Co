import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { cache } from './config/cache';


const client = new ApolloClient({
  uri: 'https://server.1998skincareco.com',
  credentials: 'include',
  cache
});


ReactDOM.render(
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.register();
