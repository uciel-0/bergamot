export enum SearchResultActionTypes {
  SET_TICKETMASTER_RESULTS = 'SET_TICKETMASTER_RESULTS',
  SET_STUBHUB_RESULTS = 'SET_STUBHUB_RESULTS'
}
  
interface SetTicketMasterResultsAction {
  type: SearchResultActionTypes.SET_TICKETMASTER_RESULTS;
  payload: any;
}
  
interface SetStubHubResultsAction {
  type: SearchResultActionTypes.SET_STUBHUB_RESULTS;
  payload: any;
}
  
export const setTicketMasterResultsAction = (payload: any): SetTicketMasterResultsAction => ({
  type: SearchResultActionTypes.SET_TICKETMASTER_RESULTS,
  payload
});

export const setStubHubResultsAction = (payload: any) => ({
  type: SearchResultActionTypes.SET_STUBHUB_RESULTS,
  payload
})
  
export type SearchResultsActions = SetTicketMasterResultsAction | SetStubHubResultsAction;