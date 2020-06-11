import {SearchResultActionTypes, SearchResultsActions} from './Actions';

export interface SearchResultsState {
  ticketmaster: any;
  stubhub:any;
}
  
export const searchResultsReducer = (state: SearchResultsState, action: SearchResultsActions) => {
  switch(action.type) {
    case SearchResultActionTypes.SET_TICKETMASTER_RESULTS:
      return {...state, ticketmaster: action.payload};
    case SearchResultActionTypes.SET_STUBHUB_RESULTS:
      return {...state, stubhub: action.payload};
    default:
      return state;
  }
}

export const initialSearchResultsState: SearchResultsState = {
  ticketmaster: {},
  stubhub: {}
}