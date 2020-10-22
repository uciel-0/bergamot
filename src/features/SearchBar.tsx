import * as React from 'react';
import axios from 'axios';
import {SearchResultsContext} from '../store/searchResults/Context';
import {SpinnerContext} from '../store/spinner/Context';
import {setSearchResults, setBulkFilterAction, setIsStableAction,setMaxPriceAction,setMinPriceAction} from '../store/searchResults/Actions';
import {setSpinnerState} from '../store/spinner/Actions';
import {BopIcon} from '../components/BopIcon';
import {useHistory} from 'react-router-dom';


export const SearchBar = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const {searchResultsDispatch} = React.useContext(SearchResultsContext);
  const {spinnerDispatch} = React.useContext(SpinnerContext);
  // const {} = React.useContext();
  let history = useHistory();

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formValue === "") {
      return;
    }
    spinnerDispatch(setSpinnerState(true));
    // reset the isStable flag so the distributor filters can reset as expected
    searchResultsDispatch(setIsStableAction(false));
    axios.get('http://localhost:8080/api/search/events', {
      params: {
        keyword: formValue,
      }
    })
    .then((res) => {
      console.log('master search api response', res.data);
      history.push('/search');
      // set our search result data to the response from the api call
      searchResultsDispatch(setSearchResults(res.data.data));
      // from the data, determine which distributor actually returned data for this search query
      // set these booleans in the filter state so we can use them to render the checkboxes appropriately
      searchResultsDispatch(setBulkFilterAction(res.data.source.ticketmaster, res.data.source.stubhub, res.data.source.seatgeek));
      spinnerDispatch(setSpinnerState(false));
      //set min/max price from the backend.
      searchResultsDispatch(setMinPriceAction(res.data.minPrice));
      searchResultsDispatch(setMaxPriceAction(res.data.maxPrice));
      searchResultsDispatch(setNoResultsState(false));
    })
    .catch((err) => {
      spinnerDispatch(setSpinnerState(false));
      history.push('/error');
      console.log('master search api rejection', err)
    });
    // for testing puposes
    axios.get('http://localhost:8080/api/search/wide', {
      params: {
        keyword: formValue,
      }
    })
    .then((res) => {
      console.log('individual api responses', res.data);
    })
    .catch((err) => {
      console.log('individual api responses', err)
    });

  }

  return (
    <div className="Search">
      <BopIcon />
      <form onSubmit={(e) => onSubmit(e)}>
        <input 
          data-test="search-bar"
          className="Search-input"
          placeholder="search for events, artists, teams or venues" 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)}
        />
      </form>
    </div>
  )
}