import * as React from 'react';
import axios from 'axios';
import { SearchResultsContext } from '../store/searchResults/Context';
import {LoaderContext} from '../store/loader/Context';
import { useHistory, useLocation } from 'react-router-dom';
import {
  setSearchResults,
  setBulkFilterAction,
  setNoResultsState,
  setNumberOfResults,
  setLastQuery,
  setIsStableAction,
  setPriceRangeAction,
  setUserPriceRangeSelected,
  setSortType
} from '../store/searchResults/Actions';
import {setLoaderState} from '../store/loader/Actions';
import {MagnifyingGlass} from '../svg/MagnifyingGlass';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { CheckboxShading, SortType } from '../store/searchResults/Reducer';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment, { Moment } from 'moment';

export const SearchComponent = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const [dateRangeState, setDateRangeState] = React.useState<(Moment | string | null)[]>([null, null]);
  const [startDateMaxValue, setStartDateMaxValue] = React.useState<string>('');
  const [endDateMinValue, setEndDateMinValue] = React.useState<string>('');
  const [searchEnabled, setSearchEnabled] = React.useState<boolean>(true);
  const { searchResultsDispatch } = React.useContext(SearchResultsContext);
  const { loaderDispatch } = React.useContext(LoaderContext);

  const today = moment().startOf('day').format();
  let history = useHistory();
  let location = useLocation();

  React.useEffect(() => {
    console.log(dateRangeState);
    if ((!dateRangeState[0] && !dateRangeState[1]) || (dateRangeState[0] && dateRangeState[1])) {
      setSearchEnabled(true);
    } else if ((!dateRangeState[0] && dateRangeState[1]) || (dateRangeState[0] && !dateRangeState[1])) {
      setSearchEnabled(false);
    }
  }, [dateRangeState]);

  React.useEffect(() => {
    if (history.location.pathname === '/home') {
      setFormValue('');
    }
  }, [history.location]);

  const handleStartDateSelect = (newStartDate: MaterialUiPickersDate) => {
    const formattedStartDate = moment(newStartDate).startOf('day').format();
    setDateRangeState([formattedStartDate, dateRangeState[1]]);
    setEndDateMinValue(formattedStartDate);
  }

  const handleEndDateSelect = (newEndDate: MaterialUiPickersDate) => {
    const formattedEndDate = moment(newEndDate).endOf('day').format();
    setDateRangeState([dateRangeState[0], formattedEndDate]);
    setStartDateMaxValue(formattedEndDate);
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formValue.trim() === "") {
      setFormValue('');
      return;
    }
    setFormValue(formValue.trim());
    console.log('dateState - startDate:', dateRangeState[0], 'endDate:', dateRangeState[1]);
    loaderDispatch(setLoaderState(true));
    // reset the isStable flag so the distributor filters can reset as expected
    if (location.pathname !== 'home') {
      searchResultsDispatch(setLastQuery(formValue));
      searchResultsDispatch(setIsStableAction(false));
      searchResultsDispatch(setBulkFilterAction(CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, [], [], [], []));
      searchResultsDispatch(setPriceRangeAction([0,0]));
      searchResultsDispatch(setUserPriceRangeSelected(false));
      searchResultsDispatch(setSortType(SortType.DEFAULT));
    }
    axios.get('http://localhost:8080/api/search/events', {
      params: {
        keyword: formValue,
        startDate: dateRangeState[0],
        endDate: dateRangeState[1],
      }
    })
    .then((res) => {
      console.log('master search api response for artist:', formValue, res.data);
      history.push('/search');
      // set our search result data to the response from the api call
      loaderDispatch(setLoaderState(false));
      searchResultsDispatch(setLastQuery(formValue));
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
      loaderDispatch(setLoaderState(false));
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
  const datePickerContainerStyle = location.pathname === '/search' ? 'DatePicker_container' : 'DatePicker_container-invisible';
  const searchIconStyle = searchEnabled ? 'search_button' : 'search_button search_button--disabled';
  const searchFormStyle =  location.pathname === '/home' ? 'search_form' : 'search_form search_form--wide';
  return (
    <React.Fragment>
      <form className={searchFormStyle} onSubmit={(e) => onSubmit(e)}>
        <button className={searchIconStyle}>
          <MagnifyingGlass className="search_icon"/>
        </button>
        <input
          className="search_input"
          data-test="search-bar"
          type="text"
          placeholder="search for events, artists, teams or venues"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
        />
        <div className={datePickerContainerStyle}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container>
              <DatePicker
                minDate={today}
                maxDate={startDateMaxValue}
                value={dateRangeState[0]}
                onChange={(newStartDate: MaterialUiPickersDate) => handleStartDateSelect(newStartDate)}
                variant="inline"
                format="MMM, d, yyyy"
                disableToolbar
                disablePast
                autoOk
                emptyLabel={"From"}
              />
              <DatePicker
                minDate={endDateMinValue}
                value={dateRangeState[1]}
                onChange={(newEndDate: MaterialUiPickersDate) => handleEndDateSelect(newEndDate)}
                variant="inline"
                format="MMM, d, yyyy"
                disableToolbar
                disablePast
                autoOk
                emptyLabel={"To"}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>
        {location.pathname !== '/home' ? <div className="fake-element"/> : null}
      </form>
    </React.Fragment>
  )
}



