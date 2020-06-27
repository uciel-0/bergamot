import * as React from 'react';
import {SearchResultsContext} from '../store/Store';
import {Card} from '../components/Card';

export const Results = () => {
  const {state} = React.useContext(SearchResultsContext);
  return (
    <div className="Results">
      <div>
        {
          state.searchResults.map((e: any) => 
            <Card name={e.name} date={e.date} price={e.minPrice} source={e.source}/>
          ) 
        }
      </div>
    </div>
  )
}