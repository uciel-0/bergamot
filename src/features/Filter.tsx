import * as React from 'react';
import axios from 'axios';
import { 
  setShowSeatgeekAction, 
  setShowStubhubAction, 
  setShowTicketmasterAction, 
  setIsStableAction, 
  setSearchResults,
  setNoResultsState, 
  setShowCancelledAction,
  setShowNoListingsAction, 
  setUserDateRangeSelectedAction
} from '../store/searchResults/Actions';
import { SearchResultsContext } from '../store/searchResults/Context';
// import { DateRangePicker } from 'rsuite';
import { SpinnerContext } from '../store/spinner/Context';
import { setSpinnerState } from '../store/spinner/Actions';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import moment, { Moment } from 'moment';

export const Filter = () => {
  const {searchResultsState, searchResultsDispatch} = React.useContext(SearchResultsContext);
  const {spinnerDispatch} = React.useContext(SpinnerContext);
  const [ticketmasterFilter, setTicketmasterFilter] = React.useState<boolean>(false);
  const [stubhubFilter, setStubhubFilter] = React.useState<boolean>(false);
  const [seatgeekFilter, setSeatgeekFilter] = React.useState<boolean>(false);
  const [cancelledFilter, setCancelledFilter] = React.useState<boolean>(false);
  const [noListingsFilter, setNoListingsFilter] = React.useState<boolean>(false);
  const [maxMinPriceRange, setMaxMinPriceRange] = React.useState<number[]>([0,0]);
  const [dateRangeState, setDateRangeState] = React.useState<Moment[]>([]);

  const globalShowTicketmasterState: boolean = searchResultsState.searchFilters.showTicketmaster;
  const globalShowStubhubState: boolean = searchResultsState.searchFilters.showStubhub;
  const globalShowSeatgeekState: boolean = searchResultsState.searchFilters.showSeatgeek;
  const globalShowCancelledState: boolean = searchResultsState.searchFilters.showCancelled;
  const globalShowNoListingsState: boolean = searchResultsState.searchFilters.showNoListings;
  const globalPriceRangeState: number[] = searchResultsState.searchFilters.priceRange;
  const globalDateRangeState: Moment[] = searchResultsState.searchFilters.dateRange;
  const globalUserDateRangeSelectedState: boolean = searchResultsState.userDateRangeSelected;
  // const globalStartDateState: Moment = searchResultsState.searchFilters.earliestDate;
  // const globalEndDateState: Moment = searchResultsState.searchFilters.latestDate;
  const isStable: boolean = searchResultsState.isStable;
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
      callCacheForFiltering();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalShowTicketmasterState, globalShowStubhubState, globalShowSeatgeekState, globalShowCancelledState, globalShowNoListingsState]);

  React.useEffect(() => {
    if (ticketmasterFilter || stubhubFilter || seatgeekFilter) {
      searchResultsDispatch(setIsStableAction(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketmasterFilter, stubhubFilter, seatgeekFilter]);

  React.useEffect(() => {
    setMaxMinPriceRange(globalPriceRangeState);
  }, [globalPriceRangeState]);

  React.useEffect(() => {
    setDateRangeState(globalDateRangeState);
  }, [globalDateRangeState]);

  React.useEffect(() => {
    if (globalUserDateRangeSelectedState) {
      callCacheForFiltering();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalUserDateRangeSelectedState, dateRangeState]);

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
        minPrice: maxMinPriceRange[0],
        maxPrice: maxMinPriceRange[1],
        earliestDate: dateRangeState[0],
        latestDate: dateRangeState[1],
      }
    }).then(res => {
      if (res.data.data.length === 0) {
        searchResultsDispatch(setNoResultsState(true));
        spinnerDispatch(setSpinnerState(false));
      } else {
        console.log('cache response for artist', searchResultsState.lastQuery, ":", res.data.data);
        console.log('total length of events:', res.data.totalResultsLength);
        console.log('ticketmaster events:', res.data.providerResultLengths[0]);
        console.log('stubhub events:', res.data.providerResultLengths[1]);
        console.log('seatgeek events:', res.data.providerResultLengths[2]);
        spinnerDispatch(setSpinnerState(false));
        searchResultsDispatch(setNoResultsState(false));
        searchResultsDispatch(setSearchResults(res.data.data));
      }
    }).catch(err => {
      console.log('filter function api call error', err);
      searchResultsDispatch(setNoResultsState(true));
      spinnerDispatch(setSpinnerState(false));
    })
  }

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

  const handleSliderChange = (event: any, values: number[]) => {
    // if the lowest value equals the highest value
    if (values[0] === globalPriceRangeState[1]) {
      // force the low value to be one lower than the highest value
      setMaxMinPriceRange([globalPriceRangeState[1]-1, globalPriceRangeState[1]]);
    } // if the highest value is equal to the lowest value
    else if (values[1] === globalPriceRangeState[0]) {
      // set the high value to be one higher than the lowest value
      setMaxMinPriceRange([globalPriceRangeState[0], globalPriceRangeState[0] + 1])
    } // otherwise set the values as usual
    else setMaxMinPriceRange(values)
  }

  const handleDateSelect = (newDateRange: Moment[]) => {
    searchResultsDispatch(setUserDateRangeSelectedAction(true));
    setDateRangeState(newDateRange);
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
        {
         (cancelledFilter || noListingsFilter) && (
          <div>
            <b>Status Filters</b>
            <br></br>
          </div>
         )
        }
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
        <div>
          <b>Price</b>
          <br></br>
          <Slider 
            aria-labelledby="range-slider"
            valueLabelDisplay="on"
            value={maxMinPriceRange}
            min={globalPriceRangeState[0]}
            max={globalPriceRangeState[1]}
            onChange={(event: React.ChangeEvent<{}>, values: any) => handleSliderChange(event, values)}
            onChangeCommitted={() => callCacheForFiltering()}
            valueLabelFormat={(x) => '$' + x.toLocaleString()}
            className="Filter_priceSlider"
          />
        </div>
        <div>
          <b>Dates</b>
          <br></br>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <DatePicker
                minDate={globalDateRangeState[0]}
                maxDate={globalDateRangeState[1]}
                value={dateRangeState[0]}
                onChange={(newStartDate: any) => handleDateSelect([moment(newStartDate), dateRangeState[1]])}
                variant="inline"
                format="MMM, d, yyyy"
                disableToolbar
                disablePast
                autoOk
              />
              <DatePicker
                minDate={globalDateRangeState[0]}
                maxDate={globalDateRangeState[1]}
                value={dateRangeState[1]}
                onChange={(newEndDate: any) => handleDateSelect([dateRangeState[0], moment(newEndDate)])}
                variant="inline"
                format="MMM, d, yyyy"
                disableToolbar
                disablePast
                autoOk
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
      </form>
    </div>
  )
}