import { Moment } from "moment";
import { CheckboxShading, SortType } from "./Reducer";
import { SearchResult } from "./Reducer";

export enum SearchResultActionTypes {
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
  SET_EVENTS_AND_EVENTS_NEAR_YOU = 'SET_ALL_EVENTS_AND_EVENTS_NEAR_YOU',
  SET_TICKETMASTER_STATE = 'SET_TICKETMASTER_STATE',
  SET_STUBHUB_STATE = 'SET_STUBHUB_STATE',
  SET_SEATGEEK_STATE = 'SET_SEATGEEK_STATE',
  SET_BULK_FILTER = 'SET_BULK_FILTER',
  SET_SHOW_CANCELLED = 'SET_SHOW_CANCELLED',
  SET_SHOW_NO_LISTINGS = 'SET_SHOW_NO_LISTINGS',
  SET_IS_STABLE = 'SET_IS_STABLE',
  SET_NO_RESULTS = 'SET_NO_RESULTS',
  SET_PRICE_RANGE = 'SET_PRICE_RANGE',
  SET_DATE_RANGE = 'SET_DATE_RANGE',
  SET_LAST_QUERY = 'SET_LAST_QUERY',
  SET_USER_DATE_RANGE_SELECTED = 'SET_USER_DATE_RANGE_SELECTED',
  SET_USER_PRICE_RANGE_SELECTED = 'SET_USER_PRICE_RANGE_SELECTED',
  SET_NUMBER_OF_RESULTS = 'SET_NUMBER_OF_RESULTS',
  SET_SHOW_PRICES_WITH_FEES = 'SET_SHOW_PRICES_WITH_FEES',
  SET_SORT_TYPE = 'SET_SORT_TYPE',
}

interface SetSearchResults {
  type: SearchResultActionTypes.SET_SEARCH_RESULTS;
  payload: any;
}

export const setSearchResults = (payload: any): SetSearchResults => ({
  type: SearchResultActionTypes.SET_SEARCH_RESULTS,
  payload
});

interface SetTicketmasterState {
  type: SearchResultActionTypes.SET_TICKETMASTER_STATE,
  payload: CheckboxShading;
}

export const setTicketmasterStateAction = (payload: CheckboxShading): SetTicketmasterState => ({
  type: SearchResultActionTypes.SET_TICKETMASTER_STATE,
  payload,
});

interface SetStubhubState {
  type: SearchResultActionTypes.SET_STUBHUB_STATE,
  payload: CheckboxShading;
}

export const setStubhubStateAction = (payload: CheckboxShading): SetStubhubState => ({
  type: SearchResultActionTypes.SET_STUBHUB_STATE,
  payload,
});

interface SetSeatgeekState {
  type: SearchResultActionTypes.SET_SEATGEEK_STATE,
  payload: CheckboxShading;
}

export const setSeatgeekStateAction = (payload: CheckboxShading): SetSeatgeekState => ({
  type: SearchResultActionTypes.SET_SEATGEEK_STATE,
  payload,
});

interface SetShowCancelled {
  type: SearchResultActionTypes.SET_SHOW_CANCELLED;
  payload: CheckboxShading;
}

export const setShowCancelledAction = (payload: CheckboxShading): SetShowCancelled => ({
  type: SearchResultActionTypes.SET_SHOW_CANCELLED,
  payload
});

interface SetShowNoListings {
  type: SearchResultActionTypes.SET_SHOW_NO_LISTINGS;
  payload: CheckboxShading;
}

export const setShowNoListingsAction = (payload: CheckboxShading): SetShowNoListings => ({
  type: SearchResultActionTypes.SET_SHOW_NO_LISTINGS,
  payload
});

interface SetBulkFilter {
  type: SearchResultActionTypes.SET_BULK_FILTER;
  ticketmasterState: CheckboxShading;
  stubhubState: CheckboxShading;
  seatgeekState: CheckboxShading;
  cancelled: CheckboxShading;
  noListings: CheckboxShading;
  priceRange: number[];
  dateRange: Moment[];
  filteredPriceRange: number[];
  filteredDateRange: Moment[];
}

export const setBulkFilterAction = (
  ticketmasterState: CheckboxShading, 
  stubhubState: CheckboxShading, 
  seatgeekState: CheckboxShading, 
  cancelled: CheckboxShading, 
  noListings: CheckboxShading, 
  priceRange: number[],
  dateRange: Moment[], 
  filteredPriceRange: number[], 
  filteredDateRange: Moment[]
): SetBulkFilter => ({
  type: SearchResultActionTypes.SET_BULK_FILTER,
  ticketmasterState,
  stubhubState,
  seatgeekState,
  cancelled,
  noListings,
  priceRange,
  dateRange,
  filteredPriceRange,
  filteredDateRange
});

interface SetIsStable {
  type: SearchResultActionTypes.SET_IS_STABLE;
  payload: boolean;
}

export const setIsStableAction = (payload: boolean): SetIsStable => ({
  type: SearchResultActionTypes.SET_IS_STABLE,
  payload
});

interface SetNoResults {
  type: SearchResultActionTypes.SET_NO_RESULTS;
  payload: boolean;
}

export const setNoResultsState = (payload: boolean): SetNoResults => ({
  type: SearchResultActionTypes.SET_NO_RESULTS,
  payload
});

interface SetPriceRange {
  type: SearchResultActionTypes.SET_PRICE_RANGE;
  payload: number[];
}

export const setPriceRangeAction = (payload: number[]): SetPriceRange => ({
  type: SearchResultActionTypes.SET_PRICE_RANGE,
  payload
});

interface SetDateRange {
  type: SearchResultActionTypes.SET_DATE_RANGE;
  payload: Moment[]
}

export const setDateRangeAction = (payload: Moment[]): SetDateRange => ({
  type: SearchResultActionTypes.SET_DATE_RANGE,
  payload
})

interface SetUserDateRangeSelected {
  type: SearchResultActionTypes.SET_USER_DATE_RANGE_SELECTED;
  payload: boolean;
}

export const setUserDateRangeSelectedAction = (payload: boolean): SetUserDateRangeSelected => ({
  type: SearchResultActionTypes.SET_USER_DATE_RANGE_SELECTED,
  payload,
});

interface SetUserPriceRangeSelected {
  type: SearchResultActionTypes.SET_USER_PRICE_RANGE_SELECTED,
  payload: boolean
}

export const setUserPriceRangeSelected = (payload: boolean): SetUserPriceRangeSelected => ({
  type: SearchResultActionTypes.SET_USER_PRICE_RANGE_SELECTED,
  payload,
});

interface SetLastQuery {
  type: SearchResultActionTypes.SET_LAST_QUERY;
  payload: string;
}

export const setLastQuery = (payload: string): SetLastQuery => {
  console.log(payload, 'action payload') 
  return {
    type: SearchResultActionTypes.SET_LAST_QUERY,
    payload
  }
}

// ({
//   type: SearchResultActionTypes.SET_LAST_QUERY,
//   payload
// });

interface SetNumberOfResults {
  type: SearchResultActionTypes.SET_NUMBER_OF_RESULTS;
  payload: number;
}

export const setNumberOfResults = (payload: number): SetNumberOfResults => ({
  type: SearchResultActionTypes.SET_NUMBER_OF_RESULTS,
  payload
});

interface SetShowPricesWithFees {
  type: SearchResultActionTypes.SET_SHOW_PRICES_WITH_FEES,
  payload: boolean
}

export const setShowPricesWithFees = (payload: boolean): SetShowPricesWithFees => ({
  type: SearchResultActionTypes.SET_SHOW_PRICES_WITH_FEES,
  payload
});

interface SetSortType {
  type: SearchResultActionTypes.SET_SORT_TYPE,
  payload: SortType,
}

export const setSortType = (payload: SortType): SetSortType => ({
  type: SearchResultActionTypes.SET_SORT_TYPE,
  payload
});

interface SetSearchResultsAndEventsNearYou {
  type: SearchResultActionTypes.SET_EVENTS_AND_EVENTS_NEAR_YOU;
  events: SearchResult[];
  eventsNearYou: SearchResult[];
}

export const setAllEventsAndEventsNearYou = (events: SearchResult[], eventsNearYou: SearchResult[]): SetSearchResultsAndEventsNearYou => ({
  type: SearchResultActionTypes.SET_EVENTS_AND_EVENTS_NEAR_YOU,
  events,
  eventsNearYou
});

export type SearchResultsActions = SetSearchResults | SetTicketmasterState | SetStubhubState | SetSeatgeekState | SetBulkFilter | SetIsStable | 
SetNoResults | SetPriceRange | SetLastQuery | SetShowCancelled | SetShowNoListings | SetDateRange | SetUserDateRangeSelected | SetUserPriceRangeSelected | 
SetNumberOfResults | SetShowPricesWithFees | SetSortType | SetSearchResultsAndEventsNearYou;