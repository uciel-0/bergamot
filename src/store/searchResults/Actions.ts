export enum SearchResultActionTypes {
  SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
  SET_SEARCH_FILTERS = 'SET_SEARCH_FILTERS',
  TOGGLE_TICKETMASTER_FILTER = 'TOGGLE_TICKETMASTER_FILTER',
  TOGGLE_STUBHUB_FILTER = 'TOGGLE_STUBHUB_FILTER',
  TOGGLE_SEATGEEK_FILTER = 'TOGGLE_SEATGEEK_FILTER'
}

interface SetSearchResults {
  type: SearchResultActionTypes.SET_SEARCH_RESULTS;
  payload: any;
}

export const setSearchResults = (payload: any): SetSearchResults => ({
  type: SearchResultActionTypes.SET_SEARCH_RESULTS,
  payload
});

interface ToggleTicketerMasterFilter {
  type: SearchResultActionTypes.TOGGLE_TICKETMASTER_FILTER;
  payload: boolean;
}

export const toggleTicketMasterFilterAction = (payload: boolean): ToggleTicketerMasterFilter => ({
  type: SearchResultActionTypes.TOGGLE_TICKETMASTER_FILTER,
  payload 
});

interface ToggleStubhubFilter {
  type: SearchResultActionTypes.TOGGLE_STUBHUB_FILTER;
  payload: boolean;
}

export const toggleStubhubFilterAction = (payload: boolean): ToggleStubhubFilter => ({
  type: SearchResultActionTypes.TOGGLE_STUBHUB_FILTER,
  payload 
});

interface ToggleSeatgeekFilter {
  type: SearchResultActionTypes.TOGGLE_SEATGEEK_FILTER;
  payload: boolean;
}

export const toggleSeatgeekFilterAction = (payload: boolean): ToggleSeatgeekFilter => ({
  type: SearchResultActionTypes.TOGGLE_SEATGEEK_FILTER,
  payload
});

export type SearchResultsActions = SetSearchResults | ToggleTicketerMasterFilter | ToggleStubhubFilter | ToggleSeatgeekFilter;