import moment from 'moment'

export const calculateMinMaxOfSet = (set) => 
  set.reduce((accumulator, currentValue) => {
    const minPrice = currentValue.priceAfterFees ? Math.min(currentValue.priceAfterFees, accumulator[0]) : Math.min(Number.POSITIVE_INFINITY, accumulator[0]);
    const maxPrice = currentValue.priceAfterFees ? Math.max(currentValue.priceAfterFees, accumulator[1]) : Math.max(Number.NEGATIVE_INFINITY, accumulator[1]);
    return [
        Math.floor(minPrice),
        Math.ceil(maxPrice)
    ]
  }
  , [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]); 

export const calculateEarliestLatestOfSetLocal = (set) => set.filter(e => e.datetime_local).map(e => moment(e.datetime_local));

export const calculateEarliestLatestOfSetUTC = (set) => set.filter(e => e.datetime_utc).map(e => moment.utc(e.datetime_utc));

export const determineIfSetHasCancelledEvents = (set) => set.reduce((result, event) => 
  event.status === 'cancelled' ? true : result
, false);

export const determineIfSetHasEventsWithoutListings = (set) => set.reduce((result, event) => 
  !event.priceAfterFees ? true : result
, false);