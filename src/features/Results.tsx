import * as React from 'react';
import {SearchResultsContext} from '../store/Store';
import {Card} from '../components/Card';

export const Results = () => {
  const {state} = React.useContext(SearchResultsContext);
  return (
    <div className="Results">
      <div>
        <h1>ticketmaster results</h1>
        {
          state.ticketmaster._embedded ? state.ticketmaster._embedded.events.map((e: any) => 
            <Card name={e.name} date={e.dates.start.dateTime}/>
          ) : null
        }
      </div>
      <div>
        <h1>stubhub results</h1>
        {
          state.stubhub.events ? state.stubhub.events.map((e: any) => 
            <Card name={e.name} price={e.ticketInfo.minPrice} date={e.eventDateLocal}/>
          ) : null
        }
      </div>
      <div>
        <h1>seatgeek results</h1>
        {
          state.seatgeek.events ? state.seatgeek.events.map((e: any) => 
            <Card date={e.datetime_local} name={e.title} price={e.stats.lowest_price}/>
          ) : null
        }
      </div>
    </div>
  )
}
