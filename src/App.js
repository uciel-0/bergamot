import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Search} from './features/Search';
import {Results} from './features/Results';

const App = () => {
  return (
    <div className="App">
      <Search/>
      <Results/>
    </div>
  );
}

export default App;