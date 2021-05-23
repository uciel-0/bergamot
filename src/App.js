import React from 'react';
import './css/main.css';
import { SearchBar } from './features/SearchBar';
import { Results } from './features/Results';
import { Home } from './features/Home';
import { Footer } from './features/Footer';
import { Header } from './features/Header';
import { ErrorScreen } from './features/ErrorScreen';
import { SpinnerContext } from './store/spinner/Context';
import { Spinner } from './components/Spinner';
import { Sports } from './features/Sports';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import "react-multi-carousel/lib/styles.css";

const App = () => {
  const { spinnerState } = React.useContext(SpinnerContext);
  return (
    <Router>
      <div className="container">
        {spinnerState.isLoading ? <Spinner /> : null}
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