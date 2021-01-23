import { Moment } from "moment";
import { CheckboxShading } from "./Reducer";

export enum SearchResultActionTypes {
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
  // SET_SHOW_TICKETMASTER = 'SET_SHOW_TICKETMASTER',
  // SET_SHOW_STUBHUB = 'SET_SHOW_STUBHUB',
  // SET_SHOW_SEATGEEK = 'SET_SHOW_SEATGEEK',
  SET_TICKETMASTER_STATE = 'SET_TICKETMASTER_STATE',
  SET_STUBHUB_STATE = 'SET_STUBHUB_STATE',
  SET_SEATGEEK_STATE = 'SET_STUBHUB_STATE',
  SET_BULK_FILTER = 'SET_BULK_FILTER',
  SET_SHOW_CANCELLED = 'SET_SHOW_CANCELLED',
  SET_SHOW_NO_LISTINGS = 'SET_SHOW_NO_LISTINGS',
  SET_IS_STABLE = 'SET_IS_STABLE',
  SET_NO_RESULTS = 'SET_NO_RESULTS',
  SET_PRICE_RANGE = 'SET_PRICE_RANGE',
  SET_DATE_RANGE = 'SET_DATE_RANGE',
  SET_LAST_QUERY = 'SET_LAST_QUERY',
  SET_USER_DATE_RANGE_SELECTED = 'SET_USER_DATE_RANGE_SELECTED',
}

interface SetSearchResults {
  type: SearchResultActionTypes.SET_SEARCH_RESULTS;
  payload: any;
}

export const setSearchResults = (payload: any): SetSearchResults => ({
  type: SearchResultActionTypes.SET_SEARCH_RESULTS,
  payload
});

// interface SetShowTicketMaster {
//   type: SearchResultActionTypes.SET_SHOW_TICKETMASTER;
//   payload: boolean;
// }

// export const setShowTicketmasterAction = (payload: boolean): SetShowTicketMaster => ({
//   type: SearchResultActionTypes.SET_SHOW_TICKETMASTER,
//   payload
// });

// interface SetShowStubhub {
//   type: SearchResultActionTypes.SET_SHOW_STUBHUB;
//   payload: boolean;
// }

// export const setShowStubhubAction = (payload: boolean): SetShowStubhub => ({
//   type: SearchResultActionTypes.SET_SHOW_STUBHUB,
//   payload
// });

// interface SetShowSeatgeek {
//   type: SearchResultActionTypes.SET_SHOW_SEATGEEK;
//   payload: boolean;
// }

// export const setShowSeatgeekAction = (payload: boolean): SetShowSeatgeek => ({
//   type: SearchResultActionTypes.SET_SHOW_SEATGEEK,
//   payload
// });

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
  payload: boolean;
}

export const setShowCancelledAction = (payload: boolean): SetShowCancelled => ({
  type: SearchResultActionTypes.SET_SHOW_CANCELLED,
  payload
});

interface SetShowNoListings {
  type: SearchResultActionTypes.SET_SHOW_NO_LISTINGS;
  payload: boolean;
}

export const setShowNoListingsAction = (payload: boolean): SetShowNoListings => ({
  type: SearchResultActionTypes.SET_SHOW_NO_LISTINGS,
  payload
});

interface SetBulkFilter {
  type: SearchResultActionTypes.SET_BULK_FILTER;
  ticketmasterState: CheckboxShading;
  stubhubState: CheckboxShading;
  seatgeekState: CheckboxShading;
  cancelled: boolean;
  noListings: boolean;
  priceRange: number[];
  dateRange: Moment[];
  filteredPriceRange: number[];
  filteredDateRange: Moment[];
}

export const setBulkFilterAction = (
  ticketmasterState: CheckboxShading, 
  stubhubState: CheckboxShading, 
  seatgeekState: CheckboxShading, 
  cancelled: boolean, 
  noListings: boolean, 
  priceRange: number[],
  dateRange: Moment[], 
  filteredPriceRange: number[], 
  filteredDateRange: Moment[],
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
  filteredDateRange,
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

interface SetLastQuery {
  type: SearchResultActionTypes.SET_LAST_QUERY;
  payload: string;
}

export const setLastQuery = (payload: string): SetLastQuery => ({
  type: SearchResultActionTypes.SET_LAST_QUERY,
  payload
});

export type SearchResultsActions = SetSearchResults | SetTicketmasterState | SetStubhubState | SetSeatgeekState | SetBulkFilter | SetIsStable | 
SetNoResults | SetPriceRange | SetLastQuery | SetShowCancelled | SetShowNoListings | SetDateRange | SetUserDateRangeSelected;