import * as React from 'react';
import {SearchResultsContext} from '../searchResults/Context';
import {searchResultsReducer, initialSearchResultsState} from '../searchResults/Reducer';
import {LoaderContext} from './Context';
import {loaderReducer, initialLoaderState} from './Reducers';
// component which will house all the necessary contexts 
const Store: React.FunctionComponent = ({children}) => {
  const [searchResultsState, searchResultsDispatch] = React.useReducer(searchResultsReducer, initialSearchResultsState);
  const [loaderState, loaderDispatch] = React.useReducer(loaderReducer, initialLoaderState);
  return (
    <LoaderContext.Provider value={{loaderState, loaderDispatch}}>
      <SearchResultsContext.Provider value={{searchResultsState, searchResultsDispatch}}>
        {children}
      </SearchResultsContext.Provider>
    </LoaderContext.Provider>
  )
}

export default Store;
