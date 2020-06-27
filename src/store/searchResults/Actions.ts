export enum SearchResultActionTypes {
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
}

interface SetSearchResults {
  type: SearchResultActionTypes.SET_SEARCH_RESULTS;
  payload: any;
}

export const setSearchResults = (payload: any): SetSearchResults => ({
  type: SearchResultActionTypes.SET_SEARCH_RESULTS,
  payload
});
  
export type SearchResultsActions = SetSearchResults;