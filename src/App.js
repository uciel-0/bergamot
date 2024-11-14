import React from 'react';
import './sass/main.scss';
import { Results } from './features/Results';
import { Home } from './features/Home';
import { Concerts } from './features/categories/Concerts';
import { Festivals } from './features/categories/Festivals';
import { Footer } from './features/Footer';
import { Header } from './features/Header';
import { ErrorScreen } from './features/ErrorScreen';
import { Sports } from './features/categories/Sports';
import { Theatre } from './features/categories/Theatre';
import { Route, createBrowserRouter, RouterProvider, Routes, createRoutesFromElements } from 'react-router-dom';
import axios from 'axios';
import "react-multi-carousel/lib/styles.css";
import { Loader } from './components/Loader';
import { LocationContext } from './store/location/Context';
import { setLocationStateAction } from './store/location/Actions';
import { Outlet } from 'react-router-dom';
import {ThemeProvider, createMuiTheme, makeStyles } from '@mui/material/styles';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const theme = createMuiTheme();

// TODO: move one level down
// const useStyles = makeStyles((theme) => {
//   root : {
//   }
// })

const Root = () => <>
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Header/>
      <Loader/>
        <Outlet/>
      <Footer/>
    </LocalizationProvider>
  </ThemeProvider>
</>

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Root/>}>
      <Route path="home" element={<Home/>}></Route>
      <Route path="concerts" element={<Concerts />}></Route>
      <Route path="sports" element={<Sports />}></Route>
      <Route path="festivals" element={<Festivals />}></Route>
      <Route path="theatre" element={<Theatre />}></Route>
      <Route path="search" element={<Results />}></Route>
      <Route path="error" element={<ErrorScreen />}></Route>
    </Route>
  )
)

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
    <RouterProvider router={router}/>
  );
}

export default App;