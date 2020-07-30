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
        searchResultsState.searchResults.map((e: any, index) => 
          <ResultsGroup date={e.date} events={e.events} key={index}/>
        )
      }
    </div>
  )
}
// expected input is {date, events}
export const ResultsGroup = (searchResult: SearchResults) => {
  const formattedDate = new Date(searchResult.date).toDateString();
  return (
    <div className="Results_group">
      <h1 className="Results_date">{formattedDate}</h1>
      {
        searchResult.events.map((e: any, index: number) => 
          <Card name={e.name} date={formattedDate} price={e.minPrice} source={e.source} key={index}/>
        )
      }
    </div>
  )
}