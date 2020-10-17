export enum SearchResultActionTypes {
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
  SET_SEARCH_FILTERS = 'SET_SEARCH_FILTERS',
  SET_TICKETMASTER_FILTER = 'SET_TICKETMASTER_FILTER',
  SET_STUBHUB_FILTER = 'SET_STUBHUB_FILTER',
  SET_SEATGEEK_FILTER = 'SET_SEATGEEK_FILTER',
  SET_BULK_FILTER = 'SET_BULK_FILTER',
  SET_IS_STABLE = 'SET_IS_STABLE',
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

export type SearchResultsActions = SetSearchResults | SetTicketerMasterFilter | SetStubhubFilter | SetSeatgeekFilter | SetBulkFilter | SetIsStable;