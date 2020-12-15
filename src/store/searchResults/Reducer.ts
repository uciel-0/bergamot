import { Moment } from 'moment';
import moment from 'moment-timezone';
import {SearchResultActionTypes, SearchResultsActions} from './Actions';

export interface SearchResultsState {
  searchResults: SearchResult[];
  searchFilters: SearchFilterState;
  isStable: boolean;
  noResults: boolean;
  lastQuery: string;
  userDateRangeSelected: boolean;
  timezone: string;
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
  priceRange: number[];
  dateRange: Moment[];
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
    case SearchResultActionTypes.SET_PRICE_RANGE: 
     return {...state, searchFilters: {...state.searchFilters, priceRange: action.payload}};
    case SearchResultActionTypes.SET_DATE_RANGE:
      return {...state, searchFilters: {...state.searchFilters, dateRange: action.payload}};
    case SearchResultActionTypes.SET_USER_DATE_RANGE_SELECTED:
      return {...state, userDateRangeSelected: action.payload};
    case SearchResultActionTypes.SET_LAST_QUERY:
      return {...state, lastQuery: action.payload};
    default:
      return state;
  }
}

const timezone = moment.tz.guess();

export const initialSearchResultsState: SearchResultsState = {
  searchResults: [],
  searchFilters: {
    showTicketmaster: false,
    showStubhub: false,
    showSeatgeek: false,
    showCancelled: false,
    showNoListings: false,
    priceRange: [0,0],
    dateRange: []
  },
  isStable: false,
  noResults: false,
  lastQuery: '',
  userDateRangeSelected: false,
  timezone
}