import * as React from 'react';
import { toggleSeatgeekFilterAction, toggleStubhubFilterAction, toggleTicketMasterFilterAction } from '../store/searchResults/Actions';
import { SearchResultsContext } from '../store/searchResults/Context';

export const Filter = () => {
  const {searchResultsState, searchResultsDispatch} = React.useContext(SearchResultsContext);

  const handleFilterToggle = (event: any) => {
    const target = event.target;
    const name = target.name;
    const newCheckState = target.checked;

    if (name === "filterTicketmaster") {
      searchResultsDispatch(toggleTicketMasterFilterAction(newCheckState));
    } else if (name === "filterStubhub") {
      searchResultsDispatch(toggleStubhubFilterAction(newCheckState));
    } else if (name === "filterSeatgeek") {
      searchResultsDispatch(toggleSeatgeekFilterAction(newCheckState))
    }
  }

  return (
    <div className="Filter">
      Filters
      <form className="Filter_section">
        <label>
          <input 
            type="checkbox" 
            name="filterTicketmaster" 
            checked={searchResultsState.searchFilters.filterTicketmaster}
            onChange={handleFilterToggle}
          />
          Ticketmaster
        </label>
        <label htmlFor="stubhub">
          <input
            type="checkbox" 
            name="filterStubhub" 
            checked={searchResultsState.searchFilters.filterStubhub}
            onChange={handleFilterToggle}
          />      
          Stubhub
        </label>
        <label htmlFor="seatgeek">
          <input 
            type="checkbox" 
            name="filterSeatgeek"  
            checked={searchResultsState.searchFilters.filterSeatgeek}
            onChange={handleFilterToggle}
          />
          SeatGeek
        </label>
      </form>
    </div>
  )
}