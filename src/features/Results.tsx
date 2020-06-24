import * as React from 'react';
import {SearchResultsContext} from '../store/Store';

export const Results = () => {
  const {state} = React.useContext(SearchResultsContext);
  return (
    <div className="Results">
      <div>
        <h1>ticketmaster results</h1>
        {JSON.stringify(state.ticketmaster)}
      </div>
      <div>
        <h1>stubhub results</h1>
        {JSON.stringify(state.stubhub)}
      </div>
      <div>
        <h1>seatgeek results</h1>
        {JSON.stringify(state.seatgeek)}
      </div>
    </div>
  )
}