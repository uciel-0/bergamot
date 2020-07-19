import React from 'react';
import './css/main.css';
import {Search} from './features/Search';
import {Results} from './features/Results';
import {SpinnerContext} from './store/spinner/Context';
import {Spinner} from './components/Spinner';

const App = () => {
  const {spinnerState} = React.useContext(SpinnerContext);
  return (
    <div className="App">
      <Search/>
      <Results/>
      {spinnerState.isLoading ? <Spinner /> : null}
    </div>
  );
}

export default App;