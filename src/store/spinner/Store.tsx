import * as React from 'react';
import {SearchResultsContext} from '../searchResults/Context';
import {searchResultsReducer, initialSearchResultsState} from '../searchResults/Reducer';
import {SpinnerContext} from './Context';
import {spinnerReducer, initialSpinnerState} from './Reducers';
// component which will house all the necessary contexts 
const Store: React.FunctionComponent = ({children}) => {
  const [searchResultsState, searchResultsDispatch] = React.useReducer(searchResultsReducer, initialSearchResultsState);
  const [spinnerState, spinnerDispatch] = React.useReducer(spinnerReducer, initialSpinnerState);
  return (
    <SpinnerContext.Provider value={{spinnerState, spinnerDispatch}}>
      <SearchResultsContext.Provider value={{searchResultsState, searchResultsDispatch}}>
        {children}
      </SearchResultsContext.Provider>
    </SpinnerContext.Provider>
  )
}

export default Store;
