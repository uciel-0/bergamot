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

export enum CheckboxShading {
  CHECKED = 'CHECKED',
  UNCHECKED = 'UNCHECKED',
  GREYED = 'GREYED'
}
export interface VendorShadingState {
  ticketmaster: CheckboxShading,
  stubhub: CheckboxShading,
  seatgeek: CheckboxShading,
}
export interface SearchFilterState {
  ticketmasterState: CheckboxShading,
  stubhubState: CheckboxShading,
  seatgeekState: CheckboxShading,
  showCancelled: CheckboxShading;
  showNoListings: CheckboxShading;
  priceRange: number[];
  dateRange: Moment[];
  filteredPriceRange: number[];
  filteredDateRange: Moment[];
}

export const searchResultsReducer = (state: SearchResultsState, action: SearchResultsActions) => {
  switch(action.type) {
    case SearchResultActionTypes.SET_SEARCH_RESULTS:
      return {...state, searchResults: action.payload};
    case SearchResultActionTypes.SET_TICKETMASTER_STATE:
      return {...state, searchFilters: {...state.searchFilters, ticketmasterState: action.payload}};
    case SearchResultActionTypes.SET_STUBHUB_STATE:
      return {...state, searchFilters: {...state.searchFilters, stubhubState: action.payload}};
    case SearchResultActionTypes.SET_SEATGEEK_STATE:
      return {...state, searchFilters: {...state.searchFilters, seatgeekState: action.payload}};
    case SearchResultActionTypes.SET_SHOW_CANCELLED: 
      return {...state, searchFilters: {...state.searchFilters, showCancelled: action.payload}};
    case SearchResultActionTypes.SET_SHOW_NO_LISTINGS:
      return {...state, searchFilters: {...state.searchFilters, showNoListings: action.payload}};
    case SearchResultActionTypes.SET_BULK_FILTER: 
      return {...state, 
        searchFilters: {
          ...state.searchFilters, 
          ticketmasterState: action.ticketmasterState,
          stubhubState: action.stubhubState,
          seatgeekState: action.seatgeekState,
          showCancelled: action.cancelled, 
          showNoListings: action.noListings, 
          priceRange: action.priceRange, 
          dateRange: action.dateRange, 
          filteredPriceRange: action.filteredPriceRange, 
          filteredDateRange: action.filteredDateRange
        }
      };
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
    ticketmasterState: CheckboxShading.GREYED,
    stubhubState: CheckboxShading.GREYED,
    seatgeekState: CheckboxShading.GREYED,
    showCancelled: CheckboxShading.GREYED,
    showNoListings: CheckboxShading.GREYED,
    priceRange: [0,0],
    dateRange: [],
    filteredPriceRange: [],
    filteredDateRange: [],
  },
  isStable: false,
  noResults: false,
  lastQuery: '',
  userDateRangeSelected: false,
  timezone
}