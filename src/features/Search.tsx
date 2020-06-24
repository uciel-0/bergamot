import * as React from 'react';
import axios from 'axios';
import {SearchResultsContext} from '../store/Store';
import {
  setTicketMasterResultsAction, 
  setStubHubResultsAction,
  setSeatGeekResults
} from '../store/searchResults/Actions';
import {BopIcon} from '../components/BopIcon';

export const Search = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const {state, dispatch} = React.useContext(SearchResultsContext);

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
    <div className="Search">
      <BopIcon />
      <form onSubmit={(e) => onSubmit(e)}>
        <input 
          placeholder="search for events, artists, teams or venues" 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)}
        />
      </form>
    </div>
  ) 
}