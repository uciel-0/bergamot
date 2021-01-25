import * as React from 'react';
import axios from 'axios';
import { 
  // setShowSeatgeekAction, 
  // setShowStubhubAction, 
  // setShowTicketmasterAction, 
  setTicketmasterStateAction,
  setStubhubStateAction,
  setSeatgeekStateAction,
  setIsStableAction, 
  setSearchResults,
  setNoResultsState, 
  setShowCancelledAction,
  setShowNoListingsAction, 
  setUserDateRangeSelectedAction,
  setBulkFilterAction
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
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {CheckboxShading} from '../store/searchResults/Reducer';
// import { Checkbox } from '@material-ui/core';

export const Filter = () => {
  const {searchResultsState, searchResultsDispatch} = React.useContext(SearchResultsContext);
  const {spinnerDispatch} = React.useContext(SpinnerContext);
  // const [ticketmasterFilter, setTicketmasterFilter] = React.useState<boolean>(false);
  // const [stubhubFilter, setStubhubFilter] = React.useState<boolean>(false);
  // const [seatgeekFilter, setSeatgeekFilter] = React.useState<boolean>(false);
  const [cancelledFilter, setCancelledFilter] = React.useState<CheckboxShading>(CheckboxShading.OFF);
  const [noListingsFilter, setNoListingsFilter] = React.useState<CheckboxShading>(CheckboxShading.OFF);
  const [maxMinPriceRange, setMaxMinPriceRange] = React.useState<number[]>([0,0]);
  const [dateRangeState, setDateRangeState] = React.useState<(Moment | string)[]>([]);
  const [priceRangeState, setPriceRangeState] = React.useState<number[]>([]);
  const [ticketmasterState, setTicketmasterState] = React.useState<CheckboxShading>(CheckboxShading.OFF);
  const [stubhubState, setStubhubState] = React.useState<CheckboxShading>(CheckboxShading.OFF);
  const [seatgeekState, setSeatgeekState] = React.useState<CheckboxShading>(CheckboxShading.OFF);
  // const globalShowTicketmasterState: boolean = searchResultsState.searchFilters.showTicketmaster;
  // const globalShowStubhubState: boolean = searchResultsState.searchFilters.showStubhub;
  // const globalShowSeatgeekState: boolean = searchResultsState.searchFilters.showSeatgeek;
  const globalTicketmasterShadingState: CheckboxShading = searchResultsState.searchFilters.ticketmasterState;
  const globalStubhubShadingState: CheckboxShading = searchResultsState.searchFilters.stubhubState;
  const globalSeatgeekShadingState: CheckboxShading = searchResultsState.searchFilters.seatgeekState;
  const globalShowCancelledState: CheckboxShading = searchResultsState.searchFilters.showCancelled;
  const globalShowNoListingsState: CheckboxShading = searchResultsState.searchFilters.showNoListings;
  const globalPriceRangeState: number[] = searchResultsState.searchFilters.priceRange;
  const globalDateRangeState: Moment[] = searchResultsState.searchFilters.dateRange;
  const globalFilteredPriceRangeState: number[] = searchResultsState.searchFilters.filteredPriceRange;
  const globalFilteredDateRangeState: Moment[] = searchResultsState.searchFilters.filteredDateRange;
  const globalUserDateRangeSelectedState: boolean = searchResultsState.userDateRangeSelected;
  const isStable: boolean = searchResultsState.isStable;
  // fires when the filter states from global context are updated 
  // first fire is when state is initialized; second is when call is made
  React.useEffect(() => {
    if (!isStable) {
      // setTicketmasterFilter(globalShowTicketmasterState);
      // setStubhubFilter(globalShowStubhubState);
      // setSeatgeekFilter(globalShowSeatgeekState);
      setTicketmasterState(globalTicketmasterShadingState);
      setStubhubState(globalStubhubShadingState);
      setSeatgeekState(globalSeatgeekShadingState);
      // setCancelledFilter(globalShowCancelledState);
      // setNoListingsFilter(globalShowNoListingsState);
    } else if (
      globalTicketmasterShadingState === CheckboxShading.OFF && globalStubhubShadingState === CheckboxShading.OFF && globalSeatgeekShadingState === CheckboxShading.OFF) {
      searchResultsDispatch(setNoResultsState(true));
    } else if (isStable) {
      console.log('filter cache call firing');
      console.log('globalTicketmasterShadingState', globalTicketmasterShadingState);
      console.log('globalStubhubShadingState', globalStubhubShadingState);
      console.log('globalSeatgeekShadingState', globalSeatgeekShadingState);
      callCacheForFiltering(false, false, true, false);
    }
  // globalShowTicketmasterState, globalShowStubhubState, globalShowSeatgeekState,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalTicketmasterShadingState, globalStubhubShadingState, globalSeatgeekShadingState]);

  React.useEffect(() => {
    if (!isStable) {
      setCancelledFilter(globalShowCancelledState);
      setNoListingsFilter(globalShowNoListingsState);
    } else {
      callCacheForFiltering(false, false, false, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalShowCancelledState, globalShowNoListingsState]);

  React.useEffect(() => {
    if (ticketmasterState === CheckboxShading.CHECKED || stubhubState === CheckboxShading.CHECKED || seatgeekState === CheckboxShading.CHECKED) {
      searchResultsDispatch(setIsStableAction(true));
    }
  // ticketmasterFilter, stubhubFilter, seatgeekFilter
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketmasterState, stubhubState, seatgeekState]);

  React.useEffect(() => {
    setMaxMinPriceRange(globalPriceRangeState);
  }, [globalPriceRangeState]);

  React.useEffect(() => {
    setPriceRangeState(globalFilteredPriceRangeState);
  }, [globalFilteredPriceRangeState]);

  React.useEffect(() => {
    setDateRangeState(globalDateRangeState);
  }, [globalDateRangeState]);

  React.useEffect(() => {
    if (globalUserDateRangeSelectedState) {
      callCacheForFiltering(false, true, false, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalUserDateRangeSelectedState, dateRangeState]);

  React.useEffect(() => {
    console.log(ticketmasterState === CheckboxShading.GREYED, ticketmasterState, 'ticketmasterState');
    console.log(stubhubState === CheckboxShading.GREYED, stubhubState, 'stubhubState');
    console.log(seatgeekState === CheckboxShading.GREYED, seatgeekState, 'seatgeekState');
  }, [ticketmasterState, stubhubState, seatgeekState]);

  const callCacheForFiltering = (isSliderCall: boolean, isCalendarCall: boolean, isVendorFilterCall: boolean, isStatusFilterCall: boolean) => {
    spinnerDispatch(setSpinnerState(true));
    searchResultsDispatch(setUserDateRangeSelectedAction(false));
    console.log('callCacheForFiltering firing');
    console.log('globalTicketmasterShadingState',globalTicketmasterShadingState);
    console.log('globalStubhubShadingState', globalStubhubShadingState);
    console.log('globalSeatgeekShadingState', globalSeatgeekShadingState);
    axios.get('http://localhost:8080/api/cache/events', {
      params: {
        keyword: searchResultsState.lastQuery,
        // showTicketmaster: globalShowTicketmasterState,
        // showStubhub: globalShowStubhubState,
        // showSeatgeek: globalShowSeatgeekState,
        ticketmasterState: globalTicketmasterShadingState,
        stubhubState: globalStubhubShadingState,
        seatgeekState: globalSeatgeekShadingState,
        showCancelled: globalShowCancelledState,
        showNoListings: globalShowNoListingsState,
        minPrice: priceRangeState[0],
        maxPrice: priceRangeState[1],
        earliestDate: dateRangeState[0],
        latestDate: dateRangeState[1],
        isSliderCall,
        isCalendarCall,
        isVendorFilterCall,
        isStatusFilterCall,
      }
    }).then(res => {
      searchResultsDispatch(setIsStableAction(false))
      if (res.data.data.length === 0) {
        searchResultsDispatch(setNoResultsState(true));
        spinnerDispatch(setSpinnerState(false));
      } else {
        console.log('cache response for artist', searchResultsState.lastQuery, ":", res.data);
        console.log('total length of events:', res.data.totalResultsLength);
        console.log('ticketmaster events:', res.data.providerResultLengths[0]);
        console.log('stubhub events:', res.data.providerResultLengths[1]);
        console.log('seatgeek events:', res.data.providerResultLengths[2]);
        searchResultsDispatch(setNoResultsState(false));
        searchResultsDispatch(setSearchResults(res.data.data));
        // update the filter results as the cache results come back 
        spinnerDispatch(setSpinnerState(false));
        searchResultsDispatch(
          setBulkFilterAction(
            res.data.vendorState.ticketmaster,
            res.data.vendorState.stubhub,
            res.data.vendorState.seatgeek,
            res.data.hasCancelledEvents,
            res.data.hasNoListingEvents, 
            res.data.priceRange, 
            res.data.dateRange, 
            res.data.filteredPriceRange, 
            res.data.filteredDateRange
          )
        );
      }
    }).catch(err => {
      console.log('filter function api call error', err);
      searchResultsDispatch(setNoResultsState(true));
      spinnerDispatch(setSpinnerState(false));
    })
  }

  const handleVendorFilterToggle = (event: any) => {
    const target = event.target;
    const name = target.name;
    const newCheckState = target.checked ? CheckboxShading.CHECKED : CheckboxShading.UNCHECKED;
    console.log('vendorFilterToggle working', name, newCheckState);
    searchResultsDispatch(setIsStableAction(true));
    if (name === "showTicketmaster") {
      searchResultsDispatch(setTicketmasterStateAction(newCheckState));
    } else if (name === "showStubhub") {
      searchResultsDispatch(setStubhubStateAction(newCheckState));
    } else if (name === "showSeatgeek") {
      searchResultsDispatch(setSeatgeekStateAction(newCheckState));
    } 
  }

  const handleStatusFilterToggle = (event: any) => {
    const target = event.target;
    const name = target.name;
    const newCheckState = target.checked ? CheckboxShading.CHECKED : CheckboxShading.UNCHECKED;
    console.log('statusFilterToggle working', newCheckState);
    searchResultsDispatch(setIsStableAction(true));
    if (name === "showCancelled") {
      searchResultsDispatch(setShowCancelledAction(newCheckState));
    } else if (name === "showNoListings") {
      searchResultsDispatch(setShowNoListingsAction(newCheckState));
    }
  }

  const handleSliderChange = (event: any, values: number[]) => {
    searchResultsDispatch(setUserDateRangeSelectedAction(false));
    // if the lowest value equals the highest value
    if (values[0] === globalPriceRangeState[1]) {
      // force the low value to be one lower than the highest value
      setPriceRangeState([globalPriceRangeState[1]-1, globalPriceRangeState[1]]);
    } // if the highest value is equal to the lowest value
    else if (values[1] === globalPriceRangeState[0]) {
      // set the high value to be one higher than the lowest value
      setPriceRangeState([globalPriceRangeState[0], globalPriceRangeState[0] + 1])
    } // otherwise set the values as usual
    else setPriceRangeState(values)
  }

  const handleStartDateSelect = (newStartDate: MaterialUiPickersDate) => {
    searchResultsDispatch(setUserDateRangeSelectedAction(true));
    setDateRangeState([moment(newStartDate).startOf('day').format(), dateRangeState[1]]);
  }

  const handleEndDateSelect = (newEndDate: MaterialUiPickersDate) => {
    searchResultsDispatch(setUserDateRangeSelectedAction(true));
    setDateRangeState([dateRangeState[0], moment(newEndDate).endOf('day').format()])
  }

  const ticketmasterDataState = globalTicketmasterShadingState === CheckboxShading.GREYED;
  const stubhubDataState = globalStubhubShadingState === CheckboxShading.GREYED;
  const seatgeekDataState = globalSeatgeekShadingState === CheckboxShading.GREYED;
 
  return (
    <div className="Filter">
      <form className="Filter_section">
      <b>Vendors</b>
      <br></br>
        {
          (ticketmasterState !== CheckboxShading.OFF) && (
            <label htmlFor="showTicketmaster" className={ticketmasterDataState ? 'Filter_label--disabled' : ''}>
              <input 
                type="checkbox" 
                name="showTicketmaster" 
                checked={globalTicketmasterShadingState === CheckboxShading.CHECKED}
                onChange={handleVendorFilterToggle}
                className={ticketmasterDataState ? 'Filter_checkbox--disabled' : ''}
              />
              Ticketmaster
              <br></br>
            </label>
          )
        }
        {
          (stubhubState !== CheckboxShading.OFF) && (
            <label htmlFor="showStubhub" className={stubhubDataState ? 'Filter_label--disabled' : ''}>
              <input
                type="checkbox" 
                name="showStubhub" 
                checked={globalStubhubShadingState === CheckboxShading.CHECKED}
                onChange={handleVendorFilterToggle}
                className={stubhubDataState ? 'Filter_checkbox--disabled': ''}
              />   
              Stubhub
              <br></br>
            </label>
          )
        }
        {
          (seatgeekState !== CheckboxShading.OFF) && (
            <label htmlFor="showSeatgeek" className={seatgeekDataState ? 'Filter_label--disabled' : ''}>
              <input 
                type="checkbox" 
                name="showSeatgeek"  
                checked={globalSeatgeekShadingState === CheckboxShading.CHECKED}
                onChange={handleVendorFilterToggle}
                className={seatgeekDataState ? 'Filter_checkbox--disabled' : ''}
              />
              SeatGeek
              <br></br>
            </label>
          )
        }
        {
         (cancelledFilter !== CheckboxShading.OFF || noListingsFilter !== CheckboxShading.OFF) && (
          <div>
            <b>Status Filters</b>
            <br></br>
          </div>
         )
        }
        {
          (cancelledFilter !== CheckboxShading.OFF) && (
          <label htmlFor="showCancelled">
            <input 
              type="checkbox" 
              name="showCancelled"  
              checked={globalShowCancelledState === CheckboxShading.CHECKED}
              onChange={handleStatusFilterToggle}
            />
            Cancelled Events
            <br></br>
          </label>
          )
        }
        {
          (noListingsFilter !== CheckboxShading.OFF) && (
            <label htmlFor="showNoListings">
              <input 
                type="checkbox" 
                name="showNoListings"  
                checked={globalShowNoListingsState === CheckboxShading.CHECKED}
                onChange={handleStatusFilterToggle}
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
            value={priceRangeState}
            min={maxMinPriceRange[0]}
            max={maxMinPriceRange[1]}
            onChange={(event: React.ChangeEvent<{}>, values: any) => handleSliderChange(event, values)}
            onChangeCommitted={() => callCacheForFiltering(true, false, false, false)}
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
                value={globalFilteredDateRangeState[0]}
                onChange={(newStartDate: MaterialUiPickersDate) => handleStartDateSelect(newStartDate)}
                variant="inline"
                format="MMM, d, yyyy"
                disableToolbar
                disablePast
                autoOk
              />
              <DatePicker
                minDate={globalDateRangeState[0]}
                maxDate={globalDateRangeState[1]}
                value={globalFilteredDateRangeState[1]}
                onChange={(newEndDate: MaterialUiPickersDate) => handleEndDateSelect(newEndDate)}
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