import {SearchResultActionTypes, SearchResultsActions} from './Actions';

export interface SearchResultsState {
  searchResults: any[];
}
  
export const searchResultsReducer = (state: SearchResultsState, action: SearchResultsActions) => {
  switch(action.type) {
    case SearchResultActionTypes.SET_SEARCH_RESULTS:
      return {...state, searchResults: action.payload};
    default:
      return state;
  }
}

export const initialSearchResultsState: SearchResultsState = {
  searchResults: []
}