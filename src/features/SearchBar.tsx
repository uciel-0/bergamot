import * as React from 'react';
import axios from 'axios';
import {SearchResultsContext} from '../store/searchResults/Context';
import {SpinnerContext} from '../store/spinner/Context';
import {
  setSearchResults, 
  setBulkFilterAction,
  setIsStableAction,
  setPriceRangeAction,
  setNoResultsState, 
  setLastQuery, 
  setUserDateRangeSelectedAction 
} from '../store/searchResults/Actions';
import {setSpinnerState} from '../store/spinner/Actions';
import {BopIcon} from '../svg/BopIcon';
import {MagnifyingGlass} from '../svg/MagnifyingGlass';
import {Bookmark} from '../svg/Bookmark';
import {useHistory} from 'react-router-dom';
import { CheckboxShading } from '../store/searchResults/Reducer';
import { Chat } from '../svg/Chat';

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
    searchResultsDispatch(setLastQuery(formValue));
    searchResultsDispatch(setIsStableAction(false));
    searchResultsDispatch(setBulkFilterAction(CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, [], [], [], []));
    searchResultsDispatch(setPriceRangeAction([0,0]));
    searchResultsDispatch(setUserDateRangeSelectedAction(false));
    axios.get('http://localhost:8080/api/search/events', {
      params: {
        keyword: formValue,
      }
    })
    .then((res) => {
      console.log('master search api response for artist:', formValue, res.data);
      history.push('/search');
      // set our search result data to the response from the api call
      searchResultsDispatch(setSearchResults(res.data.data));
      console.log('total length of events:', res.data.totalResultsLength);
      console.log('ticketmaster events:', res.data.providerResultLengths[0]);
      console.log('seatgeek events:', res.data.providerResultLengths[1]);
      console.log('stubhub events:', res.data.providerResultLengths[2]);
      // from the data, determine which distributor actually returned data for this search query
      // set these booleans in the filter state so we can use them to render the checkboxes appropriately
      const maxMinPriceRange = res.data.priceRange;
      const maxMinDateRange = [res.data.dateRange[0], res.data.dateRange[1]];
      searchResultsDispatch(setBulkFilterAction(res.data.vendorState.ticketmaster, res.data.vendorState.stubhub, res.data.vendorState.seatgeek, res.data.hasCancelledEvents, res.data.hasNoListingEvents, maxMinPriceRange, maxMinDateRange, maxMinPriceRange, maxMinDateRange));
      spinnerDispatch(setSpinnerState(false));
      searchResultsDispatch(setNoResultsState(false));
    })
    .catch((err) => {
      history.push('/search');
      spinnerDispatch(setSpinnerState(false));
      searchResultsDispatch(setNoResultsState(true));
      console.log('master search api rejection', err);
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
    <header className="header">
      <div className="logo-box">
        <BopIcon className={"logo"}/>
      </div>
      <form className="search" onSubmit={(e) => onSubmit(e)}>
        <input 
          data-test="search-bar"
          type="text"
          className="search__input"
          placeholder="search for events, artists, teams or venues" 
          value={formValue} 
          onChange={(e) => setFormValue(e.target.value)}
        />
        <button className="search__button">
          <MagnifyingGlass className="search__icon"/>
        </button>
      </form>
      <nav className="user-nav">
        <div className="user-nav__icon-box">
          <Bookmark className={'user-nav__icon'}/>
          <span className="user-nav__notification">7</span>
        </div>
        <div className="user-nav__icon-box">
          <Chat className={'user-nav__icon'}/>
          <span className="user-nav__notification">13</span>
        </div>
        <div className="user-nav__user">
          <img src="\default-profile-pic.png" alt="user headshot" className="user-nav__user-photo"/>
          {/* <span className="user_nav__user-name">Jonas</span> */}
        </div>
      </nav>
    </header>
  )
}