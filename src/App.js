import React from 'react';
import './css/main.css';
import {SearchBar} from './features/SearchBar';
import {Results} from './features/Results';
import {Home} from './features/Home';
import {ErrorScreen} from './features/ErrorScreen';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className="container">
        <SearchBar />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/search">
            <Results />
          </Route>
          <Route path="/error"> 
            <ErrorScreen />
          </Route>
        </Switch>
      </div> 
    </Router>
  );
}

export default App;