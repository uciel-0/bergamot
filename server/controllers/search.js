import {getTicketMasterSearchResults} from './ticketmaster';
import {getSeatGeekSearchResults, getSeatGeekEvents} from './seatgeek';
import {getStubhubSearchResults, getStubhubEvents} from './stubhub'
import {groupByDay, formatDate, formatLocalDate, formatTime} from '../utils/dateUtils';
import Cache from '../cache';
// final modifications to the array we recieve on the front-end are made here 
export const wideSearchResults = (req, res) => {
  const ticketmaster = getTicketMasterSearchResults(req, res);
  const stubhub = getStubhubSearchResults(req, res);
  const seatgeek = getSeatGeekSearchResults(req, res);
  return Promise.all([ticketmaster, stubhub, seatgeek])
  .then((data) => {
    data[0].events.map(e => {
      e.source = 'ticketmaster';
      e.sourceUrl = 'https://ticketmaster.com';
      e.date = formatDate(e.dates.start.dateTime) || formatLocalDate(e.dates.start.localDate);
      e.time = e.dates.start.localTime;
      e.venueName = e._embedded.venues[0].name;
      e.venueCity = e._embedded.venues[0].city.name + ', ' + e._embedded.venues[0].state.stateCode;
      if (e.priceRanges) {
        e.priceBeforeFees = e.priceRanges[0].min;
        e.priceAfterFees = Math.round(e.priceRanges[0].min * 1.3);
      } else {
        e.priceBeforeFees = null;
        e.priceAfterFees = null;
      }
    });
    data[1].events.map(e => {
      e.source = 'stubhub';
      e.sourceUrl = 'https://stubhub.com';
      e.date = formatDate(e.eventDateLocal);
      e.venueName = e.venue.name;
      e.venueCity = e.venue.city + ', ' + e.venue.state;
      e.priceBeforeFees = e.ticketInfo.minListPrice;
      e.priceAfterFees = e.ticketInfo.minPrice
    });
    data[2].events.map(e => {
      e.source = 'seatgeek';
      e.sourceUrl = 'https://seatgeek.com';
      e.date = formatDate(e.datetime_utc);
      e.time = formatTime(e.datetime_local);
      e.venueName = e.venue.name;
      e.venueCity = e.venue.display_location;
      e.name = e.title;
      e.priceBeforeFees = e.stats.lowest_sg_base_price;
      e.priceAfterFees = e.stats.lowest_price;
    });
    const combinedData = {
      ticketmaster: data[0].events,
      stubhub: data[1].events,
      seatgeek: data[2].events
    }
    res.send(combinedData);
  })
  .catch((err) => {
    console.log('error in master search', err);
    res.sendStatus(400);
  });
}  
// initialize the cache here
const ttl = 60 * 60 * 1;
const cache = new Cache(ttl);
// this is the api call we're using
export const getEvents = (req, res) => {
  const ticketmaster = getTicketMasterSearchResults(req, res);
  const stubhub = getStubhubEvents(req, res);
  const seatgeek = getSeatGeekEvents(req, res); 
  // create the key under which this data will be stored 
  const key = `getEvents_${req.query.keyword}`;
  // when the response is complete, store it in the cache 
  return cache.get(key, () => Promise.all([ticketmaster, stubhub, seatgeek]))
  .then(data => {
    // Step 1) Set some custom fields for easy front end access
    // ticketmaster events
    data[0].events.map(e => {
      e.source = 'ticketmaster';
      e.sourceUrl = 'https://ticketmaster.com';
      e.status = e.dates.status.code;
      e.date = formatDate(e.dates.start.dateTime) || formatLocalDate(e.dates.start.localDate);
      // ticketmaster's date arrives in UTC, this is the format we expect from the rest of the apis as well
      e.time = e.dates.start.noSpecificTime ? 'No Specific Time': formatTime(e.dates.start.localDate + 'T' + e.dates.start.localTime);
      e.venueName = e._embedded.venues[0].name;
      e.venueCity = e._embedded.venues[0].city.name + ', ' + e._embedded.venues[0].state.stateCode;
      e.isPriceEstimated = false;
      if (e.priceRanges) {
        e.priceBeforeFees = e.priceRanges[0].min;
        e.priceAfterFees = Math.round(e.priceRanges[0].min * 1.3);
        e.isPriceEstimated = true;
      } else {
        e.priceBeforeFees = null;
        e.priceAfterFees = null;
      }
    });
    // stubhub events
    data[1].events.map(e => {
      e.source = 'stubhub';
      e.sourceUrl = 'https://stubhub.com';
      e.status = null;
      e.date = formatLocalDate(e.eventDateLocal);
      e.time = formatTime(e.eventDateUTC);
      e.venueName = e.venue.name;
      e.venueCity = e.venue.city + ', ' + e.venue.state;
      e.priceBeforeFees = e.ticketInfo.minListPrice;
      e.priceAfterFees = e.ticketInfo.minPrice;
      e.isPriceEstimated = false;
      e.url = "https://www.stubhub.com/" + e.webURI;
    });
    // seatgeek events
    data[2].events.map(e => {
      e.source = 'seatgeek';
      e.sourceUrl = 'https://seatgeek.com';
      e.status = null;
      e.date = e.date_tbd ? null : formatDate(e.datetime_utc);
      e.time = e.datetime_tbd ? null : formatTime(e.datetime_utc + "Z");
      e.venueName = e.venue.name;
      e.venueCity = e.venue.display_location;
      e.name = e.title;
      e.priceBeforeFees = e.stats.lowest_sg_base_price;
      e.priceAfterFees = e.stats.lowest_price;
      e.isPriceEstimated = false;
    });
    // Step 2) Combinine the data into one set
    const combinedData = [...data[0].events, ...data[1].events, ...data[2].events];
    // Step 3) Find the minimum and maximum values from the whole data set
    const minMax = combinedData.reduce((accumulator, currentValue) => {
      const minPrice = currentValue.priceAfterFees ? Math.min(currentValue.priceAfterFees, accumulator[0]) :  Math.min(Number.POSITIVE_INFINITY, accumulator[0]);
      const maxPrice = currentValue.priceAfterFees ? Math.max(currentValue.priceAfterFees, accumulator[1]) : Math.max(Number.NEGATIVE_INFINITY, accumulator[1]);
      return [
        Math.round(minPrice),
        Math.round(maxPrice)
      ]
    }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]); 
    // Step 4) Sort the data chronologically
    const sortChronologically = combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    // Step 5a) Group the chronologically sorted data by date
    const groupedData = groupByDay(sortChronologically);
    // Data with an unknown date ends up sorted into a null bucket by default
    // Step 5b) This chunk makes it so that null bucket is the last item, so it will show up last in the front end
    if (groupedData[0].date === 'null') {
      const datesTBD = groupedData.shift();
      groupedData.push(datesTBD);
    };
    // Step 6) Determine which distributor returned data in this query
    const hasTicketmasterData = data[0].events.length > 0;
    const hasStubhubData = data[1].events.length > 0;
    const hasSeatgeekData = data[2].events.length > 0;
    // Step 7) Arrange the data together
    const response = {
      data: groupedData,
      source: {
        ticketmaster: hasTicketmasterData,
        stubhub: hasStubhubData,
        seatgeek: hasSeatgeekData,
      },
      minPrice: minMax[0],
      maxPrice: minMax[1]
    }
    // Step 8) Send the data
    res.send(response);
  })
  .catch((err) => {
    console.log('error in event search', err);
    res.sendStatus(400);
  });
}
// you also want to map out the individual arrays for the stuff they always return 
// this way you're able to pull data off them