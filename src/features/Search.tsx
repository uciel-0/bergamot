import * as React from 'react';
import axios from 'axios';
import {SearchResultsContext} from '../store/Store';
import {setTicketMasterResultsAction, setStubHubResultsAction} from '../store/searchResults/Actions';

export const Search = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const {state, dispatch} = React.useContext(SearchResultsContext);
  // const [ticketMasterResults, setTicketMasterResults] = React.useState<any>();
  // const [stubhubResults, setStubhubResults] = React.useState<any>();

  React.useEffect(() => {

  }, [])
  // we have to take the input and send it across multiple apis 
  // the api calls are both asynchronous, wondering if we should wait for them both to be sent back or just send which one resolves first 
  
  const onSubmit = (e: any) => {
    e.preventDefault();
    axios.get('https://app.ticketmaster.com/discovery/v2/suggest', {
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
    })
    
    axios.get('https://api.stubhub.com/sellers/search/events/v3', {
      params: {
        q: formValue,
      },
      headers: {
        'Authorization': 'Bearer kkdYmnxlNAdt7Me5BShGcwtIHgHP',
      }
    })
    .then((res) => {
      console.log('stubhub api response')
      console.log(res.data);
      dispatch(setStubHubResultsAction(res.data));
    })
    .catch((err) => {
      console.log('stubhub api rejection')
      console.log(err);
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
    </React.Fragment>
  ) 
}