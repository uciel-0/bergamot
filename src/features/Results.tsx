import * as React from 'react';
import {SearchResultsContext} from '../store/searchResults/Context';
import {Card} from '../components/Card';

export interface SearchResults {
  date: string;
  events: any[];
}

export const Results = () => {
  const {searchResultsState} = React.useContext(SearchResultsContext);
  return (
    <div className="Results">
      {
        searchResultsState.searchResults.length > 0 ? searchResultsState.searchResults.map((e: any, index) => 
          <ResultsGroup date={e.date} events={e.events} key={index}/>
        ) : null
      }
    </div>
  )
}

export const ResultsGroup = (searchResult: SearchResults) => {
  return (
    <div className="Results_group">
      <h1 className="Results_date">{searchResult.date !== 'null' ? searchResult.date : 'Date TBD'}</h1>
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
          />
        )
      }
    </div>
  )
}

// we need to start keeping track of the custom fields on the objects which we always expect to have
// they are the crucial bits of the front end and should be treated as such in the code