import * as React from 'react';
import { setSeatgeekFilterAction, setStubhubFilterAction, setTicketMasterFilterAction, setIsStableAction } from '../store/searchResults/Actions';
import { SearchResultsContext } from '../store/searchResults/Context';

export const Filter = () => {
  const {searchResultsState, searchResultsDispatch} = React.useContext(SearchResultsContext);
  const [ticketmasterFilter, setTicketmasterFilter] = React.useState<boolean>(false);
  const [stubhubFilter, setStubhubFilter] = React.useState<boolean>(false);
  const [seatgeekFilter, setSeatgeekFilter] = React.useState<boolean>(false);
  const isStable = searchResultsState.isStable;
  // fires when the filter states from global context are updated 
  // first fire is when state is initialized; second is when call is made
  React.useEffect(() => {
    if (!isStable) {
      setTicketmasterFilter(searchResultsState.searchFilters.filterTicketmaster);
      setStubhubFilter(searchResultsState.searchFilters.filterStubhub);
      setSeatgeekFilter(searchResultsState.searchFilters.filterSeatgeek);
    }
  }, [searchResultsState.searchFilters.filterTicketmaster, searchResultsState.searchFilters.filterStubhub, searchResultsState.searchFilters.filterSeatgeek, isStable]);

  React.useEffect(() => {
    if (ticketmasterFilter || stubhubFilter || seatgeekFilter) {
      searchResultsDispatch(setIsStableAction(true));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketmasterFilter, stubhubFilter, seatgeekFilter])

  const handleFilterToggle = (event: any) => {
    // if (onlyOneCheckboxLeftCheck()) {
    //   return;
    // }
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

  // const onlyOneCheckboxLeftCheck = (): boolean => {
  //   const filters = [
  //     searchResultsState.searchFilters.filterSeatgeek, 
  //     searchResultsState.searchFilters.filterTicketmaster, 
  //     searchResultsState.searchFilters.filterStubhub
  //   ];
  //   const numberOfUncheckedBoxes = filters.reduce((total, currentVal) => {
  //    return !currentVal ? total += 1 : total + 0;
  //   }, 0);
  //   console.log(numberOfUncheckedBoxes, 'numberof unchecked boxes')
  //   if (numberOfUncheckedBoxes === 2) {
  //     return true;
  //   } else return false;
  // }

  return (
    <div className="Filter">
      Filters
      <form className="Filter_section">
        {
          ticketmasterFilter && isStable && (
            <label>
              <input 
                type="checkbox" 
                name="filterTicketmaster" 
                checked={searchResultsState.searchFilters.filterTicketmaster}
                onChange={handleFilterToggle}
              />
              Ticketmaster
            </label>
          )
        }
        {
          stubhubFilter && isStable && (
            <label htmlFor="stubhub">
              <input
                type="checkbox" 
                name="filterStubhub" 
                checked={searchResultsState.searchFilters.filterStubhub}
                onChange={handleFilterToggle}
              />   
              Stubhub
            </label>
          )
        }
        {
          seatgeekFilter && isStable && (
            <label htmlFor="seatgeek">
              <input 
                type="checkbox" 
                name="filterSeatgeek"  
                checked={searchResultsState.searchFilters.filterSeatgeek}
                onChange={handleFilterToggle}
              />
              SeatGeek
            </label>
          )
        }
      </form>
    </div>
  )
}