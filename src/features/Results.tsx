import * as React from 'react';
import {SearchResultsContext} from '../store/searchResults/Context';
import {Card} from '../components/Card';

export const Results = () => {
  const {searchResultsState} = React.useContext(SearchResultsContext);
  return (
    <div className="Results">
      <div>
        {
          searchResultsState.searchResults.map((e: any, index) => 
            <Card name={e.name} date={e.date} price={e.minPrice} source={e.source} key={index}/>
          )
        }
      </div>
    </div>
  )
}