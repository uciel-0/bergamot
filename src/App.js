import React from 'react';
import './css/main.css';
import { SearchBar } from './features/SearchBar';
import { Results } from './features/Results';
import { Home } from './features/Home';
import { Footer } from './features/Footer';
import { Header } from './features/Header';
import { ErrorScreen } from './features/ErrorScreen';
import { Sports } from './features/Sports';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import "react-multi-carousel/lib/styles.css";

const App = () => {
  // start with a server side call to IP get
  axios.get('http://localhost:8080/api/info')
  .then(data => {
    console.log('JSONIP CALL', data);
  })
  .catch(err => {
    console.log('JSONIP error', err);
  });

  return (
    <Router>
      <div className="container">
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home">
            <Header />
            <Home />
          </Route>
          <Route path="/sports">
            <Header />
            <Sports />
          </Route>
          <Route path="/search">
            <SearchBar />
            <Results />
          </Route>
          <Route path="/error">
            <ErrorScreen />
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;