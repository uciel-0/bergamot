import React from 'react';
import './css/main.css';
import { Results } from './features/Results';
import { Home } from './features/Home';
import { Concerts } from './features/categories/Concerts';
import { Festivals } from './features/categories/Festivals';
import { Footer } from './features/Footer';
import { Header } from './features/Header';
import { ErrorScreen } from './features/ErrorScreen';
import { Sports } from './features/categories/Sports';
import { Theatre } from './features/categories/Theatre';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import "react-multi-carousel/lib/styles.css";
import { Loader } from './components/Loader';
import { LocationContext } from './store/location/Context';
import { setLocationStateAction } from './store/location/Actions';

const App = () => {
  const {locationDispatch, locationState} = React.useContext(LocationContext);
  // start with a server side call to IP get
  React.useEffect(() => {
    if (!locationState.location.loaded) {
      axios.get('http://localhost:8080/api/info')
      .then(data => {
        console.log('JSONIP CALL', data);
        const {
          geoplugin_city, 
          geoplugin_latitude, 
          geoplugin_longitude, 
          geoplugin_region
        } = data.data.geopluginData;
        locationDispatch(setLocationStateAction({
          lat: geoplugin_latitude,
          long: geoplugin_longitude,
          region: geoplugin_region,
          city: geoplugin_city,
          loaded: true
        }))
      })
      .catch(err => {
        console.log('JSONIP error', err);
      });
    }
  }, [locationState, locationDispatch])

  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Redirect exact from="/" to="/home" />
          <Route path="/home">
            <Loader/>
            <Home />
          </Route>
          <Route path="/concerts">
            <Concerts />
          </Route>
          <Route path="/sports">
            <Sports />
          </Route>
          <Route path="/festivals">
            <Festivals />
          </Route>
          <Route path="/theatre">
            <Theatre />
          </Route>
          <Route path="/search">
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