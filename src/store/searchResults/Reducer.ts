import {SearchResultActionTypes, SearchResultsActions} from './Actions';

export interface SearchResultsState {
  searchResults: SearchResult[];
  searchFilters: SearchFilterState;
  isStable: boolean;
}

export interface SearchResult {
  date: string;
  events: any;
}

export interface SearchFilterState {
  filterTicketmaster: boolean;
  filterStubhub: boolean;
  filterSeatgeek: boolean;
  maxPrice: number | null;
}

export const searchResultsReducer = (state: SearchResultsState, action: SearchResultsActions) => {
  switch(action.type) {
    case SearchResultActionTypes.SET_SEARCH_RESULTS:
      return {...state, searchResults: action.payload};
    case SearchResultActionTypes.SET_TICKETMASTER_FILTER:
      return {...state, searchFilters: {...state.searchFilters, filterTicketmaster: action.payload}}
    case SearchResultActionTypes.SET_STUBHUB_FILTER:
      return {...state, searchFilters: {...state.searchFilters, filterStubhub: action.payload}}; 
    case SearchResultActionTypes.SET_SEATGEEK_FILTER:
      return {...state, searchFilters: {...state.searchFilters, filterSeatgeek: action.payload}};   
    case SearchResultActionTypes.SET_BULK_FILTER: 
      return {...state, searchFilters: {...state.searchFilters, filterTicketmaster: action.ticketmaster, filterStubhub: action.stubhub, filterSeatgeek: action.seatgeek}};
    case SearchResultActionTypes.SET_IS_STABLE: 
      return {...state, isStable: action.payload};
    default:
      return state;
  }
}

export const initialSearchResultsState: SearchResultsState = {
  searchResults: [],
  searchFilters: {
    filterTicketmaster: false,
    filterStubhub: false,
    filterSeatgeek: false,
    maxPrice: null
  },
  isStable: false,
}