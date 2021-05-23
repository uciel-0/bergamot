import * as React from 'react';
import axios from 'axios';
import { SearchResultsContext } from '../store/searchResults/Context';
import { useHistory, useLocation } from 'react-router-dom';
import {
  setSearchResults,
  setBulkFilterAction,
  setNoResultsState,
  setNumberOfResults
} from '../store/searchResults/Actions';
import {MagnifyingGlass} from '../svg/MagnifyingGlass';

export const SearchComponent = () => {
  let history = useHistory();
  const [formValue, setFormValue] = React.useState<string>('');
  const { searchResultsDispatch } = React.useContext(SearchResultsContext);
  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formValue.trim() === "") {
      setFormValue('');
      return;
    }
    setFormValue(formValue.trim());
    // console.log('dateState - startDate:', dateRangeState[0], 'endDate:', dateRangeState[1])
    // reset the isStable flag so the distributor filters can reset as expected
    // searchResultsDispatch(setLastQuery(formValue));
    // searchResultsDispatch(setIsStableAction(false));
    // searchResultsDispatch(setBulkFilterAction(CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, [], [], [], []));
    // searchResultsDispatch(setPriceRangeAction([0,0]));
    // searchResultsDispatch(setUserPriceRangeSelected(false));
    axios.get('http://localhost:8080/api/search/events', {
      params: {
        keyword: formValue,
        // startDate: dateRangeState[0],
        // endDate: dateRangeState[1],
      }
    })
      .then((res) => {
        console.log('master search api response for artist:', formValue, res.data);
        history.push('/search');
        // set our search result data to the response from the api call
        searchResultsDispatch(setSearchResults(res.data.data));
        searchResultsDispatch(setNumberOfResults(res.data.numberOfResults));
        console.log('total length of events:', res.data.totalResultsLength);
        console.log('ticketmaster events:', res.data.providerResultLengths[0]);
        console.log('seatgeek events:', res.data.providerResultLengths[1]);
        console.log('stubhub events:', res.data.providerResultLengths[2]);
        // from the data, determine which distributor actually returned data for this search query
        // set these booleans in the filter state so we can use them to render the checkboxes appropriately
        const maxMinPriceRange = res.data.priceRange;
        const maxMinDateRange = [res.data.dateRange[0], res.data.dateRange[1]];
        searchResultsDispatch(setBulkFilterAction(res.data.vendorState.ticketmaster, res.data.vendorState.stubhub, res.data.vendorState.seatgeek, res.data.hasCancelledEvents, res.data.hasNoListingEvents, maxMinPriceRange, maxMinDateRange, maxMinPriceRange, maxMinDateRange));
        searchResultsDispatch(setNoResultsState(false));
      })
      .catch((err) => {
        history.push('/search');
        searchResultsDispatch(setNoResultsState(true));
        console.log('master search api rejection', err);
      });
    // for testing puposes
    // axios.get('http://localhost:8080/api/search/wide', {
    //   params: {
    //     keyword: formValue,
    //   }
    // })
    // .then((res) => {
    //   console.log('individual api responses', res.data);
    // })
    // .catch((err) => {
    //   console.log('individual api responses', err)
    // });
  }
  // const searchBarStyle = location.pathname === '/home' ? 'search__input'
  return (
    <div className="home-container">
      <video className="home-container_video"
        loop
        muted
        autoPlay
        preload="auto">
        <source src="concert.mp4" type="video/mp4"></source>
           Not supported
      </video>
      <div className="home-container_sb-container">
        <form className="home-container_sb-container_form" onSubmit={(e) => onSubmit(e)}>
          <input
            data-test="search-bar"
            type="text"
            className={"home-container_sb-container_searchbar"}
            style={{
              borderRadius: ".5em", 
              justifyContent: "center",
              margin: "50%",
              width: "55em", 
              height: "4.5em"
            }}
            placeholder="search for events, artists, teams or venues"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
        </form>
        <button className="home-container_sb-container_btn">
          <MagnifyingGlass className="search__icon"/>
        </button>
      </div>

    </div>

  )
}



