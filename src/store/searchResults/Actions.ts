import { SearchFilters } from "./Reducer";

export enum SearchResultActionTypes {
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
  SET_SEARCH_FILTERS = 'SET_SEARCH_FILTERS'
}

interface SetSearchResults {
  type: SearchResultActionTypes.SET_SEARCH_RESULTS;
  payload: any;
}

export const setSearchResults = (payload: any): SetSearchResults => ({
  type: SearchResultActionTypes.SET_SEARCH_RESULTS,
  payload
});

interface SetSearchFilters {
  type: SearchResultActionTypes.SET_SEARCH_FILTERS;
  payload: SearchFilters;
}

export const setSearchFilters = (payload: SearchFilters): SetSearchFilters => ({
  type: SearchResultActionTypes.SET_SEARCH_FILTERS,
  payload 
});

export type SearchResultsActions = SetSearchResults | SetSearchFilters;