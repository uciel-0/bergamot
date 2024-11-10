import * as React from 'react';
import {SearchResultsContext} from './searchResults/Context';
import {searchResultsReducer, initialSearchResultsState} from './searchResults/Reducer';
import {LoaderContext} from './loader/Context';
import {loaderReducer, initialLoaderState} from './loader/Reducers';
import {LocationContext} from './location/Context';
import {locationReducer, initialLocationState} from './location/Reducer';
// component which will house all the necessary contexts 

interface StoreProps {
  children: string;
}

const Store: React.FC<StoreProps> = ({children}) => {
  const [searchResultsState, searchResultsDispatch] = React.useReducer(searchResultsReducer, initialSearchResultsState);
  const [loaderState, loaderDispatch] = React.useReducer(loaderReducer, initialLoaderState);
  const [locationState, locationDispatch] = React.useReducer(locationReducer, initialLocationState);
  return (
    <LoaderContext.Provider value={{loaderState, loaderDispatch}}>
      <SearchResultsContext.Provider value={{searchResultsState, searchResultsDispatch}}>
        <LocationContext.Provider value={{locationState, locationDispatch}}>
          {children}
        </LocationContext.Provider>
      </SearchResultsContext.Provider>
    </LoaderContext.Provider>
  )
}

export default Store;