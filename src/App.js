import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './pages/Login'
import Forgot from './pages/Forgot'
import Register from './pages/Register'
import Home from "./pages/Home";

import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
      <Router>
        <div>
          <Switch>
            <Route path="/registration">
              <Register />
            </Route>
            <Route path="/forgot-password">
              <Forgot />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;