import {SearchResultActionTypes, SearchResultsActions} from './Actions';

export interface SearchResultsState {
  searchResults: SearchResult[];
  searchFilters: SearchFilters;
}

export interface SearchResult {
  date: string;
  events: any
}

export enum SearchFilters {
  NONE = 'NONE',
  DISTRIBUTOR = 'DISTRIBUTOR',
  PRICE = 'PRICE',
  DATE = 'DATE'
}

export const searchResultsReducer = (state: SearchResultsState, action: SearchResultsActions) => {
  switch(action.type) {
    case SearchResultActionTypes.SET_SEARCH_RESULTS:
      return {...state, searchResults: action.payload};
    case SearchResultActionTypes.SET_SEARCH_FILTERS:
      return {...state, searchFilters: action.payload};
    default:
      return state;
  }
}

export const initialSearchResultsState: SearchResultsState = {
  searchResults: [],
  searchFilters: SearchFilters.NONE
}