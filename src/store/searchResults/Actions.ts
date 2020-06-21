export enum SearchResultActionTypes {
  SET_TICKETMASTER_RESULTS = 'SET_TICKETMASTER_RESULTS',
  SET_STUBHUB_RESULTS = 'SET_STUBHUB_RESULTS',
  SET_SEATGEEK_RESULTS = 'SET_SEATGEEK_RESULTS'
}
  
interface SetTicketMasterResultsAction {
  type: SearchResultActionTypes.SET_TICKETMASTER_RESULTS;
  payload: any;
}
  
interface SetStubHubResultsAction {
  type: SearchResultActionTypes.SET_STUBHUB_RESULTS;
  payload: any;
}

interface SetSeatGeekResults {
  type: SearchResultActionTypes.SET_SEATGEEK_RESULTS;
  payload: any;
}
  
export const setTicketMasterResultsAction = (payload: any): SetTicketMasterResultsAction => ({
  type: SearchResultActionTypes.SET_TICKETMASTER_RESULTS,
  payload
});

export const setStubHubResultsAction = (payload: any): SetStubHubResultsAction => ({
  type: SearchResultActionTypes.SET_STUBHUB_RESULTS,
  payload
});

export const setSeatGeekResults = (payload: any): SetSeatGeekResults => ({
  type: SearchResultActionTypes.SET_SEATGEEK_RESULTS,
  payload
});
  
export type SearchResultsActions = SetTicketMasterResultsAction | SetStubHubResultsAction | SetSeatGeekResults;