import * as React from 'react';
import axios from 'axios';
import { setShowSeatgeekAction, setShowStubhubAction, setShowTicketmasterAction, setIsStableAction, setSearchResults, setNoResultsState, setShowCancelledAction, setShowNoListingsAction } from '../store/searchResults/Actions';
import { SearchResultsContext } from '../store/searchResults/Context';
import { RangeSlider, DateRangePicker } from 'rsuite';
import { SpinnerContext } from '../store/spinner/Context';
import { setSpinnerState } from '../store/spinner/Actions';

export const Filter = () => {
  const {searchResultsState, searchResultsDispatch} = React.useContext(SearchResultsContext);
  const {spinnerDispatch} = React.useContext(SpinnerContext);
  const [ticketmasterFilter, setTicketmasterFilter] = React.useState<boolean>(false);
  const [stubhubFilter, setStubhubFilter] = React.useState<boolean>(false);
  const [seatgeekFilter, setSeatgeekFilter] = React.useState<boolean>(false);
  const [cancelledFilter, setCancelledFilter] = React.useState<boolean>(false);
  const [noListingsFilter, setNoListingsFilter] = React.useState<boolean>(false);
  // const [readyToFire, setReadyToFire] = React.useState<boolean>(false);
  const globalShowTicketmasterState = searchResultsState.searchFilters.showTicketmaster;
  const globalShowStubhubState = searchResultsState.searchFilters.showStubhub;
  const globalShowSeatgeekState = searchResultsState.searchFilters.showSeatgeek;
  const globalShowCancelledState = searchResultsState.searchFilters.showCancelled;
  const globalShowNoListingsState = searchResultsState.searchFilters.showNoListings;
  const isStable = searchResultsState.isStable;
  // fires when the filter states from global context are updated 
  // first fire is when state is initialized; second is when call is made
  React.useEffect(() => {
    if (!isStable) {
      setTicketmasterFilter(globalShowTicketmasterState);
      setStubhubFilter(globalShowStubhubState);
      setSeatgeekFilter(globalShowSeatgeekState);
      setCancelledFilter(globalShowCancelledState);
      setNoListingsFilter(globalShowNoListingsState);
    } else if (!globalShowTicketmasterState && !globalShowStubhubState && !globalShowSeatgeekState) {
      searchResultsDispatch(setNoResultsState(true));
    } else if (isStable) {
      const callCacheForFiltering = () => {
        spinnerDispatch(setSpinnerState(true));
        axios.get('http://localhost:8080/api/cache/events', {
          params: {
            keyword: searchResultsState.lastQuery,
            showTicketmaster: globalShowTicketmasterState,
            showStubhub: globalShowStubhubState,
            showSeatgeek: globalShowSeatgeekState,
            showCancelled: globalShowCancelledState,
            showNoListings: globalShowNoListingsState,
          }
        }).then(res => {
          console.log('cache response for artist', searchResultsState.lastQuery, ":", res.data.data);
          console.log('total length of events:', res.data.totalResultsLength);
          console.log('ticketmaster events:', res.data.providerResultLengths[0]);
          console.log('stubhub events:', res.data.providerResultLengths[1]);
          console.log('seatgeek events:', res.data.providerResultLengths[2]);
          spinnerDispatch(setSpinnerState(false))
          searchResultsDispatch(setNoResultsState(false));
          searchResultsDispatch(setSearchResults(res.data.data));
        }).catch(err => {
          console.log('filter function api call error', err);
          setNoResultsState(true);
          spinnerDispatch(setSpinnerState(false));
        })
      }
      callCacheForFiltering();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalShowTicketmasterState, globalShowStubhubState, globalShowSeatgeekState, globalShowCancelledState, globalShowNoListingsState]);

  React.useEffect(() => {
    if (ticketmasterFilter || stubhubFilter || seatgeekFilter) {
      searchResultsDispatch(setIsStableAction(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketmasterFilter, stubhubFilter, seatgeekFilter])

  const handleFilterToggle = (event: any) => {
    const target = event.target;
    const name = target.name;
    const newCheckState = target.checked;
    if (name === "showTicketmaster") {
      searchResultsDispatch(setShowTicketmasterAction(newCheckState));
    } else if (name === "showStubhub") {
      searchResultsDispatch(setShowStubhubAction(newCheckState));
    } else if (name === "showSeatgeek") {
      searchResultsDispatch(setShowSeatgeekAction(newCheckState));
    } else if (name === "showCancelled") {
      searchResultsDispatch(setShowCancelledAction(newCheckState));
    } else if (name === "showNoListings") {
      searchResultsDispatch(setShowNoListingsAction(newCheckState));
    }
  }

  return (
    <div className="Filter">
      <form className="Filter_section">
      <b>Vendors</b>
      <br></br>
        {
          ticketmasterFilter && isStable && (
            <label htmlFor="showTicketmaster">
              <input 
                type="checkbox" 
                name="showTicketmaster" 
                checked={globalShowTicketmasterState}
                onChange={handleFilterToggle}
              />
              Ticketmaster
              <br></br>
            </label>
          )
        }
        {
          stubhubFilter && isStable && (
            <label htmlFor="showStubhub">
              <input
                type="checkbox" 
                name="showStubhub" 
                checked={globalShowStubhubState}
                onChange={handleFilterToggle}
              />   
              Stubhub
              <br></br>
            </label>
          )
        }
        {
          seatgeekFilter && isStable && (
            <label htmlFor="showSeatgeek">
              <input 
                type="checkbox" 
                name="showSeatgeek"  
                checked={globalShowSeatgeekState}
                onChange={handleFilterToggle}
              />
              SeatGeek
              <br></br>
            </label>
          )
        }
        <b>Status Filters</b>
        <br></br>
        {
          cancelledFilter && isStable && (
            <label htmlFor="showCancelled">
            <input 
              type="checkbox" 
              name="showCancelled"  
              checked={globalShowCancelledState}
              onChange={handleFilterToggle}
            />
            Cancelled Events
            <br></br>
          </label>
          )
        }
        {
          noListingsFilter && isStable && (
            <label htmlFor="showNoListings">
              <input 
                type="checkbox" 
                name="showNoListings"  
                checked={globalShowNoListingsState}
                onChange={handleFilterToggle}
              />
              Events Without Listings
              <br></br>
            </label>
          )
        }
        <RangeSlider 
          defaultValue={[10, 50]}
          progress={true}
        />
        <DateRangePicker block 
          beforeToday={false}
          cleanable={true}
          appearance={'default'}
        />
      </form>
    </div>
  )
}