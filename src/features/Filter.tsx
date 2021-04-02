import * as React from 'react';
import axios from 'axios';
import { 
  setTicketmasterStateAction,
  setStubhubStateAction,
  setSeatgeekStateAction,
  setIsStableAction, 
  setSearchResults,
  setNoResultsState, 
  setShowCancelledAction,
  setShowNoListingsAction, 
  setUserPriceRangeSelected,
  setBulkFilterAction,
  setNumberOfResults,
  setShowPricesWithFees,
} from '../store/searchResults/Actions';
import { SearchResultsContext } from '../store/searchResults/Context';
import { LoaderContext } from '../store/loader/Context';
import { setLoaderState } from '../store/loader/Actions';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import { Moment } from 'moment';
import {CheckboxShading} from '../store/searchResults/Reducer';

export const Filter = () => {
  const {searchResultsState, searchResultsDispatch} = React.useContext(SearchResultsContext);
  const {LoaderDispatch} = React.useContext(LoaderContext);
  const [cancelledFilter, setCancelledFilter] = React.useState<CheckboxShading>(CheckboxShading.GREYED);
  const [noListingsFilter, setNoListingsFilter] = React.useState<CheckboxShading>(CheckboxShading.GREYED);
  const [feesToggle, setFeesToggle] = React.useState<boolean>(true);
  const [maxMinPriceRange, setMaxMinPriceRange] = React.useState<number[]>([0,0]);
  const [dateRangeState, setDateRangeState] = React.useState<(Moment | string)[]>([]);
  const [priceRangeState, setPriceRangeState] = React.useState<number[]>([]);
  const [ticketmasterState, setTicketmasterState] = React.useState<CheckboxShading>(CheckboxShading.GREYED);
  const [stubhubState, setStubhubState] = React.useState<CheckboxShading>(CheckboxShading.GREYED);
  const [seatgeekState, setSeatgeekState] = React.useState<CheckboxShading>(CheckboxShading.GREYED);

  const globalTicketmasterShadingState: CheckboxShading = searchResultsState.searchFilters.ticketmasterState;
  const globalStubhubShadingState: CheckboxShading = searchResultsState.searchFilters.stubhubState;
  const globalSeatgeekShadingState: CheckboxShading = searchResultsState.searchFilters.seatgeekState;
  const globalShowCancelledState: CheckboxShading = searchResultsState.searchFilters.showCancelled;
  const globalShowNoListingsState: CheckboxShading = searchResultsState.searchFilters.showNoListings;
  const globalPriceRangeState: number[] = searchResultsState.searchFilters.priceRange;
  const globalDateRangeState: Moment[] = searchResultsState.searchFilters.dateRange;
  const globalFilteredPriceRangeState: number[] = searchResultsState.searchFilters.filteredPriceRange;
  const globalUserDateRangeSelectedState: boolean = searchResultsState.userDateRangeSelected;
  // const globalUserPriceRangeSelectedState: boolean = searchResultsState.userPriceRangeSelected;
  const globalShowPricesWithFeesState: boolean = searchResultsState.showPricesWithFees;
  const isStable: boolean = searchResultsState.isStable;
  // fires when the filter states from global context are updated 
  // first fire is when state is initialized; second is when call is made
  React.useEffect(() => {
    if (!isStable) {
      setTicketmasterState(globalTicketmasterShadingState);
      setStubhubState(globalStubhubShadingState);
      setSeatgeekState(globalSeatgeekShadingState);
    } else if (
      globalTicketmasterShadingState === CheckboxShading.GREYED && globalStubhubShadingState === CheckboxShading.GREYED && globalSeatgeekShadingState === CheckboxShading.GREYED) {
      searchResultsDispatch(setNoResultsState(true));
    } else if (isStable) {
      console.log('filter cache call firing');
      console.log('globalTicketmasterShadingState', globalTicketmasterShadingState);
      console.log('globalStubhubShadingState', globalStubhubShadingState);
      console.log('globalSeatgeekShadingState', globalSeatgeekShadingState);
      callCacheForFiltering(false, false, true, false);
    }
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
    setFeesToggle(globalShowPricesWithFeesState);
  }, [globalShowPricesWithFeesState]);

  const callCacheForFiltering = (isSliderCall: boolean, isCalendarCall: boolean, isVendorFilterCall: boolean, isStatusFilterCall: boolean) => {
    LoaderDispatch(setLoaderState(true));
    console.log('callCacheForFiltering firing');
    console.log('globalTicketmasterShadingState',globalTicketmasterShadingState);
    console.log('globalStubhubShadingState', globalStubhubShadingState);
    console.log('globalSeatgeekShadingState', globalSeatgeekShadingState);
    axios.get('http://localhost:8080/api/cache/events', {
      params: {
        keyword: searchResultsState.lastQuery,
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
        sortType: searchResultsState.sortType
      }
    }).then(res => {
      searchResultsDispatch(setIsStableAction(false))
      if (res.data.data.length === 0) {
        searchResultsDispatch(setNoResultsState(true));
        LoaderDispatch(setLoaderState(false));
      } else {
        console.log('cache response for artist', searchResultsState.lastQuery, ":", res.data);
        console.log('total length of events:', res.data.totalResultsLength);
        console.log('ticketmaster events:', res.data.providerResultLengths[0]);
        console.log('stubhub events:', res.data.providerResultLengths[1]);
        console.log('seatgeek events:', res.data.providerResultLengths[2]);
        searchResultsDispatch(setNoResultsState(false));
        searchResultsDispatch(setSearchResults(res.data.data));
        // update the filter results as the cache results come back 
        LoaderDispatch(setLoaderState(false));
        searchResultsDispatch(setNumberOfResults(res.data.numberOfResults));
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
      LoaderDispatch(setLoaderState(false));
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
    searchResultsDispatch(setIsStableAction(true));
    if (name === "showCancelled") {
      searchResultsDispatch(setShowCancelledAction(newCheckState));
    } else if (name === "showNoListings") {
      searchResultsDispatch(setShowNoListingsAction(newCheckState));
    }
  }

  const handleSliderChange = (event: any, values: number[]) => {
    searchResultsDispatch(setUserPriceRangeSelected(true));
    // needs to be reset whenever someone triggers a new search
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

  const handleFeesToggle = (event: any) => searchResultsDispatch(setShowPricesWithFees(event.target.checked));

  const labelState = (stateName: CheckboxShading): string => stateName === CheckboxShading.GREYED ? 'Filter_label Filter_label--disabled' : 'Filter_label';
  const checkboxState = (stateName: CheckboxShading): string => stateName === CheckboxShading.GREYED ? 'Filter_checkbox Filter_checkbox--disabled' : 'Filter_checkbox';
 
  return (
    <div className="Filter">
      <form className="Filter_form">
        <div className="Filter_total-results">
          {`${searchResultsState.numberOfResults} Search Result${(searchResultsState.numberOfResults > 1 || searchResultsState.numberOfResults === 0 ? 's' : '')}` }
        </div>
        <div className="Filter_price-toggle">
          <FormGroup row>
            <FormControlLabel
              control={<Switch checked={globalShowPricesWithFeesState} onChange={handleFeesToggle} name="fees-toggle" color="primary"/>}
              label="Show prices with fees*"
            />
          </FormGroup>
          <p>*Fees may be an estimated amount due to provider’s varying fees.</p>
        </div>
        <div className="Filter_vendors">
          <b className="Filter_row-title">Distributor</b>
          <br></br>
          <label htmlFor="showTicketmaster" className={labelState(globalTicketmasterShadingState)}>
            <input 
              type="checkbox" 
              name="showTicketmaster" 
              checked={globalTicketmasterShadingState === CheckboxShading.CHECKED}
              onChange={handleVendorFilterToggle}
              className={checkboxState(globalTicketmasterShadingState)}
            />
            Ticketmaster
            <br></br>
          </label>
          <label htmlFor="showStubhub" className={labelState(globalStubhubShadingState)}>
            <input
              type="checkbox" 
              name="showStubhub" 
              checked={globalStubhubShadingState === CheckboxShading.CHECKED}
              onChange={handleVendorFilterToggle}
              className={checkboxState(globalStubhubShadingState)}
            />   
            Stubhub
            <br></br>
          </label>
          <label htmlFor="showSeatgeek" className={labelState(globalSeatgeekShadingState)}>
            <input 
              type="checkbox" 
              name="showSeatgeek"  
              checked={globalSeatgeekShadingState === CheckboxShading.CHECKED}
              onChange={handleVendorFilterToggle}
              className={checkboxState(globalSeatgeekShadingState)}
            />
            SeatGeek
            <br></br>
          </label>
        </div>
        <div className="Filter_status">
          <b className="Filter_row-title">Status</b>
          <br></br>
          <label htmlFor="showCancelled" className={labelState(globalShowCancelledState)}>
            <input 
              type="checkbox" 
              name="showCancelled"  
              checked={globalShowCancelledState === CheckboxShading.CHECKED}
              onChange={handleStatusFilterToggle}
              className={checkboxState(globalShowCancelledState)}
            />
            Cancelled Events
            <br></br>
          </label>
          <label htmlFor="showNoListings" className={labelState(globalShowNoListingsState)}>
            <input 
              type="checkbox" 
              name="showNoListings"  
              checked={globalShowNoListingsState === CheckboxShading.CHECKED}
              onChange={handleStatusFilterToggle}
              className={checkboxState(globalShowNoListingsState)}
            />
            Events Without Listings
            <br></br>
          </label>
        </div>
        <div className="Filter_price">
          <b className="Filter_row-title">Price</b>
          <br></br>
          <div className="Filter_price-range">
            <div className="Filter_price-range--low">
              ${priceRangeState[0]}
            </div>
            <div className="Filter_price-range--dash">
            -
            </div>
            <div className="Filter_price-range--high">
              ${priceRangeState[1]}
            </div>
          </div>
          <Slider 
            aria-labelledby="range-slider"
            value={priceRangeState}
            min={maxMinPriceRange[0]}
            max={maxMinPriceRange[1]}
            onChange={(event: React.ChangeEvent<{}>, values: any) => handleSliderChange(event, values)}
            onChangeCommitted={() => callCacheForFiltering(true, false, false, false)}
            valueLabelFormat={(x) => '$' + x.toLocaleString()}
            className="Filter_priceSlider"
          />
        </div>
      </form>
    </div>
  )
}