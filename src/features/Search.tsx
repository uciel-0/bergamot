import * as React from 'react';
import axios from 'axios';
import {SearchResultsContext} from '../store/searchResults/Context';
import {SpinnerContext} from '../store/spinner/Context';
import {setSearchResults} from '../store/searchResults/Actions';
import {setSpinnerState} from '../store/spinner/Actions';
import {BopIcon} from '../components/BopIcon';

export const Search = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const {searchResultsDispatch} = React.useContext(SearchResultsContext);
  const {spinnerDispatch} = React.useContext(SpinnerContext);

  const onSubmit = (e: any) => {
    e.preventDefault();
    spinnerDispatch(setSpinnerState(true));
    axios.get('http://localhost:8080/api/search/events', {
      params: {
        keyword: formValue,
      }
    })
    .then((res) => {
      console.log('master search api response', res.data);
      searchResultsDispatch(setSearchResults(res.data));
      spinnerDispatch(setSpinnerState(false));
    })
    .catch((err) => {
      spinnerDispatch(setSpinnerState(false));
      console.log('master search api rejection', err)
    });
  }

  return (
    <div className="Search">
      <BopIcon />
      <form onSubmit={(e) => onSubmit(e)}>
        <input 
          className="Search-input"
          placeholder="search for events, artists, teams or venues" 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)}
        />
      </form>
    </div>
  ) 
}