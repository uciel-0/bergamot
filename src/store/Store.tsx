import * as React from 'react';
import {searchResultsReducer, initialSearchResultsState, SearchResultsState} from './searchResults/Reducer';
import {SearchResultsActions} from './searchResults/Actions';
// const [state, dispatch] = React.useReducer(searchResultsReducer, initialSearchResultsState)

interface SearchResultsContextType {
  state: SearchResultsState;
  dispatch: React.Dispatch<SearchResultsActions>
}

export const SearchResultsContext = React.createContext<SearchResultsContextType>({
  state: initialSearchResultsState,
  dispatch: () => null
});
// component which will house all the necessary contexts 
const Store: React.FunctionComponent = ({children}) => {
  const [state, dispatch] = React.useReducer(searchResultsReducer, initialSearchResultsState);
  return (
    <SearchResultsContext.Provider value={{state, dispatch}}>
      {children}
    </SearchResultsContext.Provider>
  ) 
}

export default Store;