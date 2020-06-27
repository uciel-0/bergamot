import * as React from 'react';
import axios from 'axios';
import {SearchResultsContext} from '../store/Store';
import {setSearchResults} from '../store/searchResults/Actions';
import {BopIcon} from '../components/BopIcon';

export const Search = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const {dispatch} = React.useContext(SearchResultsContext);

  const onSubmit = (e: any) => {
    e.preventDefault();
    axios.get('http://localhost:8080/api/search/events', {
      params: {
        keyword: formValue,
      }
    })
    .then((res) => {
      console.log('master search api response', res.data)
      dispatch(setSearchResults(res.data));
    })
    .catch((err) => {
      console.log('master search api rejection', err)
    });
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