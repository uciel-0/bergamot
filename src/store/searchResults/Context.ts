import * as React from 'react';
import {SearchResultsActions} from './Actions';
import {initialSearchResultsState, SearchResultsState} from './Reducer';

export interface SearchResultsContextType {
  searchResultsState: SearchResultsState;
  searchResultsDispatch: React.Dispatch<SearchResultsActions>
}
  
export const SearchResultsContext = React.createContext<SearchResultsContextType>({
  searchResultsState: initialSearchResultsState,
  searchResultsDispatch: () => null
});