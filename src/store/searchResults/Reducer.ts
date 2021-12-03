import { Moment } from 'moment';
import moment from 'moment-timezone';
import {SearchResultActionTypes, SearchResultsActions} from './Actions';

export interface SearchResultsState {
  searchResults: {
    events: SearchResult[];
    eventsNearYou: SearchResult[];
  }
  searchFilters: SearchFilterState;
  sortType: SortType;
  isStable: boolean;
  noResults: boolean;
  lastQuery: string;
  userDateRangeSelected: boolean;
  userPriceRangeSelected: boolean;
  timezone: string;
  numberOfResults: number;
  showPricesWithFees: boolean;
}

export interface SearchResult {
  date: string;
  events: any;
}

export enum SortType {
  DEFAULT = 'Date ',
  DATE = 'Date',
  PRICE_ASCENDING = 'Price: Low to High',
  PRICE_DESCENDING = 'Price: High to Low',
  POPULAR = 'Popular',
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
    case SearchResultActionTypes.SET_EVENTS_AND_EVENTS_NEAR_YOU:
      return {...state, 
        searchResults: {
          ...state.searchResults,
          events: action.events,
          eventsNearYou: action.eventsNearYou
        }
      }
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
    case SearchResultActionTypes.SET_USER_PRICE_RANGE_SELECTED:
      return {...state, userPriceRangeSelected: action.payload};
    case SearchResultActionTypes.SET_LAST_QUERY:
      return {...state, lastQuery: action.payload};
    case SearchResultActionTypes.SET_NUMBER_OF_RESULTS:
      return {...state, numberOfResults: action.payload};
    case SearchResultActionTypes.SET_SHOW_PRICES_WITH_FEES:
      return {...state, showPricesWithFees: action.payload};
    case SearchResultActionTypes.SET_SORT_TYPE: 
      return {...state, sortType: action.payload};
    default:
      return state;
  }
}

const timezone = moment.tz.guess();

export const initialSearchResultsState: SearchResultsState = {
  searchResults: {
    events: [],
    eventsNearYou: []
  },
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
  sortType: SortType.DEFAULT,
  isStable: false,
  noResults: false,
  lastQuery: '',
  userDateRangeSelected: false,
  userPriceRangeSelected: false,
  timezone,
  numberOfResults: 0,
  showPricesWithFees: true,
}