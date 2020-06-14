import * as React from 'react';
import axios from 'axios';
import {SearchResultsContext} from '../store/Store';
import {setTicketMasterResultsAction, setStubHubResultsAction} from '../store/searchResults/Actions';

export const Search = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const {state, dispatch} = React.useContext(SearchResultsContext);
  // we have to take the input and send it across multiple apis 
  // the api calls are both asynchronous, wondering if we should wait for them both to be sent back or just send which one resolves first 
  
  const onSubmit = (e: any) => {
    e.preventDefault();
  
    axios.get('http://localhost:8080/api/ticketmaster/search', {
      params: {
        apikey: 'BBCLAjLv49NKWn8ridowEhErPKvuxJfT',
        keyword: formValue,
        countryCode: 'US'
      }
    })
    .then((res) => {
      console.log('ticketmaster api response')
      console.log(res.data);
      dispatch(setTicketMasterResultsAction(res.data));
    })
    .catch((err) => {
      console.log('ticketmaster api rejection')
      console.log(err);
    });

    axios.get('http://localhost:8080/api/stubhub/search', {
      params: {
        keyword: formValue
      }
    })
    .then((res) => {
      console.log('search api response')
      console.log(res.data);
      dispatch(setStubHubResultsAction(res.data));
    })
    .catch((err) => {
      console.log('front end search api rejection')
      console.log(err);
    });
    // custom api call to search/locations
    // apis seem to be looking for specific artists using an ID 
  }

  return (
    <React.Fragment>
      <form
        onSubmit={(e) => onSubmit(e)}
      >
        <input 
          placeholder="search for events, artists, teams or venues" 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)}
        />
      </form>
      <div>
        <h1>ticketmaster results</h1>
        {JSON.stringify(state.ticketmaster)}
      </div>
      <div>
        <h1>stubhub results</h1>
        {JSON.stringify(state.stubhub)}
      </div>
    </React.Fragment>
  ) 
}