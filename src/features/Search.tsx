import * as React from 'react';
import axios from 'axios';
import {SearchResultsContext} from '../store/Store';
import {
  setTicketMasterResultsAction, 
  setStubHubResultsAction,
  setSeatGeekResults
} from '../store/searchResults/Actions';

export const Search = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const {state, dispatch} = React.useContext(SearchResultsContext);
  // we have to take the input and send it across multiple apis 
  // the api calls are both asynchronous, wondering if we should wait for them both to be sent back or just send which one resolves first 
  // when we're happy with the results, we can turn this into one big call resolved from the back end 
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
      console.log('ticketmaster api response', res.data)
      dispatch(setTicketMasterResultsAction('Ticketmaster Results in console'));
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
      console.log('stubhub api response', res.data)
      dispatch(setStubHubResultsAction('Stubhub results in console'));
    })
    .catch((err) => {
      console.log('stubhub api rejection')
      console.log(err);
    });

    axios.get('http://localhost:8080/api/seatgeek/search', {
      params: {
        keyword: formValue
      }
    })
    .then((res) => {
      console.log('seatgeek response', res.data);
      dispatch(setSeatGeekResults('Seatgeek results in console'))
    })
    .catch((err) => {
      console.log('Seatgeek API call err', err);
    })
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
      <div>
        <h1>seatgeek results</h1>
        {JSON.stringify(state.seatgeek)}
      </div>
    </React.Fragment>
  ) 
}