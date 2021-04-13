import * as React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import { SearchResultsContext } from '../store/searchResults/Context';
import { 
  setSearchResults,
  setNoResultsState,
  setSortType,
} from '../store/searchResults/Actions';
import {SortType} from '../store/searchResults/Reducer';

export const Sort = () => {
  const {searchResultsState, searchResultsDispatch} = React.useContext(SearchResultsContext);
  const [localSortType, setLocalSortType] = React.useState<SortType>(SortType.DEFAULT);
  const globalSortTypeState = searchResultsState.sortType;

  React.useEffect(() => {
    setLocalSortType(globalSortTypeState);
  }, [globalSortTypeState]);

  React.useEffect(() => {
    if (localSortType !== SortType.DEFAULT) {
      callCacheForFiltering();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localSortType]);

  const callCacheForFiltering = () => {
    axios.get('http://localhost:8080/api/cache/events', {
      params: {
        keyword: searchResultsState.lastQuery,
        ticketmasterState: searchResultsState.searchFilters.ticketmasterState,
        stubhubState: searchResultsState.searchFilters.stubhubState,
        seatgeekState: searchResultsState.searchFilters.seatgeekState,
        showCancelled: searchResultsState.searchFilters.showCancelled,
        showNoListings: searchResultsState.searchFilters.showNoListings,
        minPrice: searchResultsState.searchFilters.filteredPriceRange[0],
        maxPrice:searchResultsState.searchFilters.filteredPriceRange[1],
        earliestDate: searchResultsState.searchFilters.dateRange[0],
        latestDate: searchResultsState.searchFilters.dateRange[1],
        sortType: globalSortTypeState
      }
    })
    .then(res => {
      searchResultsDispatch(setSearchResults(res.data.data));
    })
    .catch(err => {
      searchResultsDispatch(setNoResultsState(true));
    })
  }

  const handleDropdownSelect = (event: any) => searchResultsDispatch(setSortType(event.target.value));

  const renderSelectValue = (value: any) => `Sort by: ${value}`
  
  return (
    <section className="Sort_container">
      <div className="Sort_menu-container">
        <FormControl className="Sort_menu">
          {/* <InputLabel id="Sort_label" >Sort by</InputLabel> */}
          <Select 
            id="Sort_select"
            value={globalSortTypeState}
            onChange={handleDropdownSelect}
            autoWidth
            displayEmpty
            renderValue={renderSelectValue}
            
          >
            <MenuItem value={SortType.DATE}>Date</MenuItem>
            <MenuItem value={SortType.PRICE_ASCENDING}>Price: Low to High</MenuItem>
            <MenuItem value={SortType.PRICE_DESCENDING}>Price: High to Low</MenuItem>
            {/* <MenuItem value={SortType.POPULAR}>Popular</MenuItem> */}
          </Select>
        </FormControl>
      </div>
    </section>
  )
}

