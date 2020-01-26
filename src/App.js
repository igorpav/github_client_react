import React, {useState} from "react";
import "./App.css";
import Header from "./Components/Header";
import {Redirect, Route, Switch} from "react-router";
import PrivateRoute from "./Components/privateRoute";
import LaginPage from "./Components/Pages/loginPage";
import MainPage from "./Components/Pages/MainPage";

const AUTH_TOKEN = 'auth-token';

const App = () => {

  let [token, updateToken] = useState(localStorage.getItem(AUTH_TOKEN));

  const login = (newToken) => {
    localStorage.setItem(AUTH_TOKEN, newToken);
    updateToken(localStorage.getItem(AUTH_TOKEN));
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
    updateToken(localStorage.getItem(AUTH_TOKEN));
  };

  return (
    <div>
      <Redirect from="/" to="" />
      <Switch>
        <Route path="/login">
          <LaginPage login={login}/>
        </Route>
        <PrivateRoute path="" token={token}>
          <Header token={token} logout={logout}/>
          <MainPage/>
        </PrivateRoute>
      </Switch>
    </div>
  )};

export default App;