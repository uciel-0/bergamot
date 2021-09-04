import * as React from 'react';
import { setLastQuery } from '../store/searchResults/Actions';
import { useHistory } from 'react-router-dom';
import {setLoaderState} from '../store/loader/Actions';
import {
  setSearchResults,
  setBulkFilterAction,
  setNoResultsState,
  setNumberOfResults,
  setIsStableAction,
  setPriceRangeAction,
  setUserPriceRangeSelected,
  setSortType
} from '../store/searchResults/Actions';
import { LoaderContext } from '../store/loader/Context';
import { SearchResultsContext } from '../store/searchResults/Context';
import { CheckboxShading, SortType } from '../store/searchResults/Reducer';
import axios from 'axios';

export interface EventObject {
    name: string;
    url: string;
}
interface EventGridItemProps {
    event: EventObject;
}

const EventGridItem = ({event}: EventGridItemProps) => {
    const { loaderDispatch } = React.useContext(LoaderContext);
    const { searchResultsDispatch } = React.useContext(SearchResultsContext);
    let history = useHistory();
  
    const onSubmit = (e: any, keyword: string) => {
      e.preventDefault();
      searchResultsDispatch(setLastQuery(keyword));
      searchResultsDispatch(setIsStableAction(false));
      searchResultsDispatch(setBulkFilterAction(CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, CheckboxShading.GREYED, [], [], [], []));
      searchResultsDispatch(setPriceRangeAction([0,0]));
      searchResultsDispatch(setUserPriceRangeSelected(false));
      searchResultsDispatch(setSortType(SortType.DEFAULT));
      // reset the isStable flag so the distributor filters can reset as expected
      axios.get('http://localhost:8080/api/search/events', {
        params: { keyword }
      })
      .then((res) => {
        history.push('/search');
        window.scrollTo(0, 0);
        // set our search result data to the response from the api call
        loaderDispatch(setLoaderState(false));
        searchResultsDispatch(setLastQuery(keyword));
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
        searchResultsDispatch(setLastQuery(keyword));
        loaderDispatch(setLoaderState(false));
        searchResultsDispatch(setNoResultsState(true));
        console.log('master search api rejection', err);
      });
    }
    
    return (
        <div className="events-grid_item" onClick={(e) => onSubmit(e, event.name)}>
            <p className="events-grid_item-name">{event.name}</p>
            <img src={event.url} alt={event.name + ' image'}/>
        </div>
    )
}

const EventsGrid = ({title, items}: any) => {
    return (
        <div className="events-grid">
            <h1 className="events-grid_title">{title}</h1>
            <div className="events-grid_container">
                {items.map((item: EventObject) => <EventGridItem event={item}/>)}
            </div>
        </div>
    )
}

export default EventsGrid;