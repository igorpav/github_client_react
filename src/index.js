import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import {setContext} from "apollo-link-context";
import { ApolloClient } from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import grey from "@material-ui/core/colors/grey";

const theme = createMuiTheme({
  palette: {
    primary: grey,
    secondary: grey.A900,
    },
});

const AUTH_TOKEN = 'auth-token';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});


ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root"),
);

serviceWorker.unregister();