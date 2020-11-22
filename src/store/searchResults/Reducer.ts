import moment, { Moment } from 'moment';
import {SearchResultActionTypes, SearchResultsActions} from './Actions';

export interface SearchResultsState {
  searchResults: SearchResult[];
  searchFilters: SearchFilterState;
  isStable: boolean;
  noResults: boolean;
  lastQuery: string;
}

export interface SearchResult {
  date: string;
  events: any;
}

export interface SearchFilterState {
  showTicketmaster: boolean;
  showStubhub: boolean;
  showSeatgeek: boolean;
  showCancelled: boolean;
  showNoListings: boolean;
  maxPrice: number;
  minPrice: number;
  earliestDate: Moment;
  latestDate: Moment;
}

export const searchResultsReducer = (state: SearchResultsState, action: SearchResultsActions) => {
  switch(action.type) {
    case SearchResultActionTypes.SET_SEARCH_RESULTS:
      return {...state, searchResults: action.payload};
    case SearchResultActionTypes.SET_SHOW_TICKETMASTER:
      return {...state, searchFilters: {...state.searchFilters, showTicketmaster: action.payload}}
    case SearchResultActionTypes.SET_SHOW_STUBHUB:
      return {...state, searchFilters: {...state.searchFilters, showStubhub: action.payload}}; 
    case SearchResultActionTypes.SET_SHOW_SEATGEEK:
      return {...state, searchFilters: {...state.searchFilters, showSeatgeek: action.payload}};
    case SearchResultActionTypes.SET_SHOW_CANCELLED: 
      return {...state, searchFilters: {...state.searchFilters, showCancelled: action.payload}};
    case SearchResultActionTypes.SET_SHOW_NO_LISTINGS:
      return {...state, searchFilters: {...state.searchFilters, showNoListings: action.payload}};
    case SearchResultActionTypes.SET_BULK_FILTER: 
      return {...state, searchFilters: {...state.searchFilters, showTicketmaster: action.ticketmaster, showStubhub: action.stubhub, showSeatgeek: action.seatgeek, showCancelled: action.cancelled, showNoListings: action.noListings}};
    case SearchResultActionTypes.SET_IS_STABLE: 
      return {...state, isStable: action.payload};
    case SearchResultActionTypes.SET_NO_RESULTS:
      return {...state, noResults: action.payload};
    case SearchResultActionTypes.SET_MIN_PRICE:
      return {...state, searchFilters: {...state.searchFilters, minPrice: action.payload}};
    case SearchResultActionTypes.SET_MAX_PRICE:
      return {...state, searchFilters: {...state.searchFilters, maxPrice: action.payload}};
    case SearchResultActionTypes.SET_EARLIEST_DATE: 
      return {...state, searchFilters: {...state.searchFilters, earliestDate: action.payload}};
    case SearchResultActionTypes.SET_LATEST_DATE: 
      return {...state, searchFilters: {...state.searchFilters, latestDate: action.payload}};
    case SearchResultActionTypes.SET_LAST_QUERY:
      return {...state, lastQuery: action.payload};
    default:
      return state;
  }
}

export const initialSearchResultsState: SearchResultsState = {
  searchResults: [],
  searchFilters: {
    showTicketmaster: false,
    showStubhub: false,
    showSeatgeek: false,
    showCancelled: false,
    showNoListings: false,
    maxPrice: 0,
    minPrice: 0,
    earliestDate: moment(),
    latestDate: moment()
  },
  isStable: false,
  noResults: false,
  lastQuery: '',
}