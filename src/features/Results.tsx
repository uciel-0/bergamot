import * as React from 'react';
import {SearchResultsContext} from '../store/searchResults/Context';
import {Card} from '../components/Card';
import {Filter} from './Filter';
import {Sort} from './Sort';
import { ErrorScreen } from './ErrorScreen';
export interface SearchResult {
  date: string;
  events: any[];
  showPricesWithFees: boolean;
}

export const Results = () => {
  const {searchResultsState} = React.useContext(SearchResultsContext);
  console.log(searchResultsState, 'searchResultsState');
  return (
    <div className="LowerHalf_container">
      <div className="Toolbar">
        <div className="Toolbar_results-count">
          {`${searchResultsState.numberOfResults} Search Result${(searchResultsState.numberOfResults > 1 || searchResultsState.numberOfResults === 0 ? 's' : '')}` }
        </div>
        <Sort/>
      </div>
      <div className="Bop">
        <div className="SearchResults">
          <div className="Results">
            <Filter />
            <div className="Cards">
              {
                !searchResultsState.noResults ? 
                searchResultsState.searchResults.eventsNearYou.length > 0 && 
                <p className="Cards_header">Events Near You</p> : null
              }
              {
                !searchResultsState.noResults ? 
                searchResultsState.searchResults.eventsNearYou.length > 0 ? searchResultsState.searchResults.eventsNearYou.map((e: any, index) => 
                  <CardsGroup date={e.date} events={e.events} key={index} showPricesWithFees={searchResultsState.showPricesWithFees}/>
                ) : null : null
              }
              {
                !searchResultsState.noResults ? 
                searchResultsState.searchResults.eventsNearYou.length > 0 && 
                <div className="Cards_divider"/> : null
              }
              {
                !searchResultsState.noResults ? 
                searchResultsState.searchResults.events.length > 0 && 
                <p className="Cards_header">All Events</p> : null
              }
              { 
                !searchResultsState.noResults ? 
                searchResultsState.searchResults.events.length > 0 ? searchResultsState.searchResults.events.map((e: any, index) => 
                  <CardsGroup date={e.date} events={e.events} key={index} showPricesWithFees={searchResultsState.showPricesWithFees}/>
                ) : null : <ErrorScreen/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CardsGroup = (searchResult: SearchResult) => 
  <div className="Cards_group">
    <h1 className="Cards_date">{searchResult.date !== 'null' ? searchResult.date : 'Date TBD'}</h1>
    {
      searchResult.events.map((e: any, index: number) => 
        <Card 
          name={e.name} 
          status={e.status}
          date={e.date} 
          time={e.time}
          priceBeforeFees={e.priceBeforeFees}
          priceAfterFees={e.priceAfterFees}
          isPriceEstimated={e.isPriceEstimated}
          source={e.source} 
          venueName={e.venueName}
          venueCity={e.venueCity}
          url={e.url}
          sourceUrl={e.sourceUrl}
          key={index}
          showPricesWithFees={searchResult.showPricesWithFees}
        />
      )
    }
  </div>
  
// we need to start keeping track of the custom fields on the objects which we always expect to have
// they are the crucial bits of the front end and should be treated as such in the code