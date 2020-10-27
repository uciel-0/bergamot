import * as React from 'react';
import axios from 'axios';
import { setSeatgeekFilterAction, setStubhubFilterAction, setTicketMasterFilterAction, setIsStableAction, setSearchResults, setNoResultsState } from '../store/searchResults/Actions';
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
  const globalFilterTicketmasterState = searchResultsState.searchFilters.filterTicketmaster;
  const globalFilterStubhubState = searchResultsState.searchFilters.filterStubhub;
  const globalFilterSeatgeekState = searchResultsState.searchFilters.filterSeatgeek;
  const isStable = searchResultsState.isStable;
  // fires when the filter states from global context are updated 
  // first fire is when state is initialized; second is when call is made
  React.useEffect(() => {
    if (!isStable) {
      console.log('!isStable: setting local form checkboxes to what arrived in search call', isStable);
      setTicketmasterFilter(globalFilterTicketmasterState);
      setStubhubFilter(globalFilterStubhubState);
      setSeatgeekFilter(globalFilterSeatgeekState);
    } else if (!globalFilterTicketmasterState && !globalFilterStubhubState && !globalFilterSeatgeekState) {
      console.log('is this every happening')
      searchResultsDispatch(setNoResultsState(true));
    } else if (isStable) {
      console.log(isStable, 'somehow this is stable');
      const callCacheForFiltering = () => {
        console.log('firing cache call for artist: ', searchResultsState.lastQuery);
        spinnerDispatch(setSpinnerState(true));
        axios.get('http://localhost:8080/api/cache/events', {
          params: {
            keyword: searchResultsState.lastQuery,
            filterTicketmaster: globalFilterTicketmasterState,
            filterStubhub: globalFilterStubhubState,
            filterSeatgeek: globalFilterSeatgeekState,
          }
        }).then(res => {
          console.log('response from filtered cache data', res.data.data);
          searchResultsDispatch(setNoResultsState(false));
          searchResultsDispatch(setSearchResults(res.data.data));
          spinnerDispatch(setSpinnerState(false));
        }).catch(err => {
          setNoResultsState(true);
          spinnerDispatch(setSpinnerState(false));
          console.log('filter function api call error', err);
        })
      }
      callCacheForFiltering();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalFilterTicketmasterState, globalFilterStubhubState, globalFilterSeatgeekState]);

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
    if (name === "filterTicketmaster") {
      searchResultsDispatch(setTicketMasterFilterAction(newCheckState));
    } else if (name === "filterStubhub") {
      searchResultsDispatch(setStubhubFilterAction(newCheckState));
    } else if (name === "filterSeatgeek") {
      searchResultsDispatch(setSeatgeekFilterAction(newCheckState))
    }
  }

  return (
    <div className="Filter">
      Filters
      <form className="Filter_section">
        {
          ticketmasterFilter && isStable && (
            <label htmlFor="ticketmaster">
              <input 
                type="checkbox" 
                name="filterTicketmaster" 
                checked={globalFilterTicketmasterState}
                onChange={handleFilterToggle}
              />
              Ticketmaster
              <br></br>
            </label>
          )
        }
        {
          stubhubFilter && isStable && (
            <label htmlFor="stubhub">
              <input
                type="checkbox" 
                name="filterStubhub" 
                checked={globalFilterStubhubState}
                onChange={handleFilterToggle}
              />   
              Stubhub
              <br></br>
            </label>
          )
        }
        {
          seatgeekFilter && isStable && (
            <label htmlFor="seatgeek">
              <input 
                type="checkbox" 
                name="filterSeatgeek"  
                checked={globalFilterSeatgeekState}
                onChange={handleFilterToggle}
              />
              SeatGeek
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