import React from 'react';
import './css/main.css';
import {SearchBar} from './features/SearchBar';
import {Results} from './features/Results';
import {Home} from './features/Home';
import {ErrorScreen} from './features/ErrorScreen';
import {SpinnerContext} from './store/spinner/Context';
import {Spinner} from './components/Spinner';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
  const {spinnerState} = React.useContext(SpinnerContext);
  return (
    <Router>
      <div className="container">
        {spinnerState.isLoading ? <Spinner /> : null}
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