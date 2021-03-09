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
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment, { Moment } from 'moment';

export const SearchBar = () => {
  const [formValue, setFormValue] = React.useState<string>('');
  const [dateRangeState, setDateRangeState] = React.useState<(Moment | string | null)[]>([null, null]);
  const {searchResultsDispatch} = React.useContext(SearchResultsContext);
  const {spinnerDispatch} = React.useContext(SpinnerContext);
  const today = moment().startOf('day').format();
  const [endDateMinValue, setEndDateMinValue] = React.useState<string>('');
  const [startDateMaxValue, setStartDateMaxValue] = React.useState<string>('');

  const [searchEnabled, setSearchEnabled] = React.useState<boolean>(true);

  let history = useHistory();

  React.useEffect(() => {
    console.log(dateRangeState);
    if ((!dateRangeState[0] && !dateRangeState[1]) || (dateRangeState[0] && dateRangeState[1])) {
      setSearchEnabled(true);
    } else if ((!dateRangeState[0] && dateRangeState[1]) || (dateRangeState[0] && !dateRangeState[1])) {
      setSearchEnabled(false);
    }
  }, [dateRangeState]);

  const handleStartDateSelect = (newStartDate: MaterialUiPickersDate) => {
    // searchResultsDispatch(setUserDateRangeSelectedAction(true));
    const formattedStartDate = moment(newStartDate).startOf('day').format();
    setDateRangeState([formattedStartDate, dateRangeState[1]]);
    setEndDateMinValue(formattedStartDate);
  }

  const handleEndDateSelect = (newEndDate: MaterialUiPickersDate) => {
    // searchResultsDispatch(setUserDateRangeSelectedAction(true));
    const formattedEndDate = moment(newEndDate).endOf('day').format();
    setDateRangeState([dateRangeState[0], formattedEndDate]);
    setStartDateMaxValue(formattedEndDate);
  }

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (formValue === "") {
      return;
    }
    console.log('dateState - startDate:', dateRangeState[0], 'endDate:', dateRangeState[1])
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
        startDate: dateRangeState[0],
        endDate: dateRangeState[1],
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

  const searchStyle = searchEnabled ? 'search__button' : 'search__button search__button--disabled';
  return (
    <header className="header">
      <div className="logo-box" onClick={() => history.push('/home')}>
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
        <button className={searchStyle}>
          <MagnifyingGlass className="search__icon"/>
        </button>
      </form>
      <div className="DatePicker_container">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
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