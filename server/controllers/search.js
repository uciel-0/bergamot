import {getTicketMasterSearchResults} from './ticketmaster';
import {getSeatGeekSearchResults, getSeatGeekEvents} from './seatgeek';
import {getStubhubSearchResults, getStubhubEvents} from './stubhub'
import {groupByDay, formatDate, formatLocalDate, formatTime} from '../utils/dateUtils';
import moment from 'moment';
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
  cache.set(key, () => Promise.all([ticketmaster, stubhub, seatgeek]))
  .then(data => {
    // Step 1) Set some custom fields for easy front end access
    // ticketmaster events
    data[0].events.forEach(e => {
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
    data[1].events.forEach(e => {
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
    data[2].events.forEach(e => {
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
    // determine whether or not to send this data set based on the filters and if this is a filter call
    // Step 2) Combinine the data into one set
    const combinedData = [...data[0].events, ...data[1].events, ...data[2].events];
    // Step 2a) Check to see if there any cancelled events in here
    const hasCancelledEvents = combinedData.reduce((result, event) => 
      event.status === 'cancelled' ? true : result
    , false);
    // Step 2c) Check to see if there are any events with no listings 
    const hasNoListingEvents = combinedData.reduce((result, event) => 
        event.priceAfterFees ? true : result
    , false);
    // Step 3) Find the minimum and maximum values from the whole data set
    const minMax = combinedData.reduce((accumulator, currentValue) => {
      const minPrice = currentValue.priceAfterFees ? Math.min(currentValue.priceAfterFees, accumulator[0]) : Math.min(Number.POSITIVE_INFINITY, accumulator[0]);
      const maxPrice = currentValue.priceAfterFees ? Math.max(currentValue.priceAfterFees, accumulator[1]) : Math.max(Number.NEGATIVE_INFINITY, accumulator[1]);
      return [
        Math.round(minPrice),
        Math.round(maxPrice)
      ]
    }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]); 
    const dates = combinedData.map(e => moment(e.date));
    const latestDate = moment.max(dates);
    const earliestDate = moment.min(dates);
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
    const providerResultLengths = [data[0].events.length, data[1].events.length, data[2].events.length]
    const totalResultsLength = providerResultLengths.reduce((total, current) => total += current, 0)
    // Step 7) Arrange the data together
    const response = {
      data: groupedData,
      source: {
        ticketmaster: hasTicketmasterData,
        stubhub: hasStubhubData,
        seatgeek: hasSeatgeekData,
      },
      minPrice: minMax[0],
      maxPrice: minMax[1], 
      hasCancelledEvents,
      hasNoListingEvents,
      providerResultLengths,
      totalResultsLength,
      earliestDate,
      latestDate
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

export const flushCache = (req, res) => {
  cache.flush();
  res.sendStatus(200);
}

export const getCachedEvents = (req, res) => {
  const key = `getEvents_${req.query.keyword}`;
  const showTicketmaster = req.query.showTicketmaster;
  const showStubhub = req.query.showStubhub;
  const showSeatgeek = req.query.showSeatgeek;
  const showCancelled = req.query.showCancelled;
  const showNoListings = req.query.showNoListings;
  const minPrice = req.query.minPrice
  const maxPrice = req.query.maxPrice;
  console.log('maxMin price range from slider recieved on back end', minPrice, maxPrice);
  // call the cache for this data 
  cache.get(key).then(data => {
    // let ticketmasterResults
    let ticketmasterEvents = [];
    if (showTicketmaster === "true") {
      data[0].events.forEach(e => {
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
      ticketmasterEvents = data[0].events;
    }
       // stubhub events
    let stubhubEvents = [];
    if (showStubhub === "true") {
      data[1].events.forEach(e => {
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
      stubhubEvents = data[1].events;
    }
    // seatgeek events
    let seatgeekEvents = [];
    if (showSeatgeek === "true") {
      data[2].events.forEach(e => {
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
      seatgeekEvents = data[2].events;
    }
    
    let combinedData = [...ticketmasterEvents, ...stubhubEvents, ...seatgeekEvents];
    if (combinedData.length === 0) {
      res.send({data: []})
      return;
    }

    if (showCancelled === 'false') {
      combinedData = combinedData.filter(e => e.status !== 'cancelled');
    }

    if (showNoListings === 'false') {
      combinedData = combinedData.filter(e => e.priceAfterFees);
    }
  
    const minMax = combinedData.reduce((accumulator, currentValue) => {
      const minPrice = currentValue.priceAfterFees ? Math.min(currentValue.priceAfterFees, accumulator[0]) : Math.min(Number.POSITIVE_INFINITY, accumulator[0]);
      const maxPrice = currentValue.priceAfterFees ? Math.max(currentValue.priceAfterFees, accumulator[1]) : Math.max(Number.NEGATIVE_INFINITY, accumulator[1]);
      return [
        Math.round(minPrice),
        Math.round(maxPrice)
      ]
    }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]); 

    if (minPrice > minMax[0] || maxPrice < minMax[1]) {
      combinedData = combinedData.filter(e => e.priceAfterFees >= minPrice && e.priceAfterFees <= maxPrice);
      if (combinedData.length === 0) {
        res.send({data: []});
        return;
      }
    }

    const sortChronologically = combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedData = groupByDay(sortChronologically);

    if (groupedData[0].date === 'null') {
      const datesTBD = groupedData.shift();
      groupedData.push(datesTBD);
    };

    const providerResultLengths = [ticketmasterEvents.length, stubhubEvents.length, seatgeekEvents.length]
    const totalResultsLength = providerResultLengths.reduce((total, current) => total += current, 0)

    const response = {
      data: groupedData,
      minPrice: minMax[0],
      maxPrice: minMax[1],
      providerResultLengths,
      totalResultsLength
    }

    res.send(response);
  }) 
  .catch(err => {
    console.log('error in cache filtering call', err);
    res.sendStatus(400);
  });
}