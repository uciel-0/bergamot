export enum SearchResultActionTypes {
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
  SET_SEARCH_FILTERS = 'SET_SEARCH_FILTERS',
  SET_TICKETMASTER_FILTER = 'SET_TICKETMASTER_FILTER',
  SET_STUBHUB_FILTER = 'SET_STUBHUB_FILTER',
  SET_SEATGEEK_FILTER = 'SET_SEATGEEK_FILTER',
  SET_BULK_FILTER = 'SET_BULK_FILTER',
  SET_IS_STABLE = 'SET_IS_STABLE',
  SET_NO_RESULTS = 'SET_NO_RESULTS',
  SET_MAX_PRICE = 'SET_MAX_PRICE',
  SET_MIN_PRICE = 'SET_MIN_PRICE'
}

interface SetSearchResults {
  type: SearchResultActionTypes.SET_SEARCH_RESULTS;
  payload: any;
}

export const setSearchResults = (payload: any): SetSearchResults => ({
  type: SearchResultActionTypes.SET_SEARCH_RESULTS,
  payload
});

interface SetTicketerMasterFilter {
  type: SearchResultActionTypes.SET_TICKETMASTER_FILTER;
  payload: boolean;
}

export const setTicketMasterFilterAction = (payload: boolean): SetTicketerMasterFilter => ({
  type: SearchResultActionTypes.SET_TICKETMASTER_FILTER,
  payload
});

interface SetStubhubFilter {
  type: SearchResultActionTypes.SET_STUBHUB_FILTER;
  payload: boolean;
}

export const setStubhubFilterAction = (payload: boolean): SetStubhubFilter => ({
  type: SearchResultActionTypes.SET_STUBHUB_FILTER,
  payload
});

interface SetSeatgeekFilter {
  type: SearchResultActionTypes.SET_SEATGEEK_FILTER;
  payload: boolean;
}

export const setSeatgeekFilterAction = (payload: boolean): SetSeatgeekFilter => ({
  type: SearchResultActionTypes.SET_SEATGEEK_FILTER,
  payload
});

interface SetBulkFilter {
  type: SearchResultActionTypes.SET_BULK_FILTER;
  ticketmaster: boolean;
  stubhub: boolean;
  seatgeek: boolean;
}

export const setBulkFilterAction = (ticketmaster: boolean, stubhub: boolean, seatgeek: boolean): SetBulkFilter => ({
  type: SearchResultActionTypes.SET_BULK_FILTER,
  ticketmaster,
  stubhub,
  seatgeek
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

interface SetMaxPrice {
  type: SearchResultActionTypes.SET_MAX_PRICE;
  payload: number;
}

export const setMaxPriceAction = (payload: number): SetMaxPrice => ({
  type: SearchResultActionTypes.SET_MAX_PRICE,
  payload
});

interface SetMinPrice {
  type: SearchResultActionTypes.SET_MIN_PRICE;
  payload: number;
}

export const setMinPriceAction = (payload: number): SetMinPrice => ({
  type: SearchResultActionTypes.SET_MIN_PRICE,
  payload
});

export type SearchResultsActions = SetSearchResults | SetTicketerMasterFilter | SetStubhubFilter | SetSeatgeekFilter | SetBulkFilter | SetIsStable | SetNoResults | SetMaxPrice | SetMinPrice;

