import {getTicketMasterSearchResults} from './ticketmaster';
import {getSeatGeekSearchResults, getSeatGeekEvents} from './seatgeek';
import {getStubhubSearchResults, getStubhubEvents} from './stubhub'
import {groupByDay, formatDate, formatLocalDate ,formatTime, normalizeUTCDate, normalizeLocalDate} from '../utils/dateUtils';
import {vendorShadingState, statusShadingState} from '../utils/sortUtils';
import moment from 'moment';
import Cache from '../cache';
// final modifications to the array we recieve on the front-end are made here 
export const wideSearchResults = (req, res) => {
  const ticketmaster = getTicketMasterSearchResults(req, res);
  const stubhub = getStubhubSearchResults(req, res);
  const seatgeek = getSeatGeekSearchResults(req, res);
  return Promise.all([ticketmaster, stubhub, seatgeek])
  .then((data) => {
    let ticketmasterEvents = [];
    if (data[0].events) {
      data[0].events.forEach(e => {
        e.source = 'ticketmaster';
        e.sourceUrl = 'https://ticketmaster.com';
        e.date = formatDate(e.dates.start.dateTime) || formatDate(e.dates.start.localDate);
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
      ticketmasterEvents = data[0].events;
    }
    let stubhubEvents = [];
    if (data[1].events) {
      data[1].events.forEach(e => {
        e.source = 'stubhub';
        e.sourceUrl = 'https://stubhub.com';
        e.date = formatDate(e.eventDateLocal);
        e.venueName = e.venue.name;
        e.venueCity = e.venue.city + ', ' + e.venue.state;
        e.priceBeforeFees = e.ticketInfo.minListPrice;
        e.priceAfterFees = e.ticketInfo.minPrice
      });
      stubhubEvents = data[1].events;
    }
    let seatgeekEvents = [];
    if (data[2].events) {
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
      seatgeekEvents = data[2].events;
    }
    const combinedData = {
      ticketmasterEvents,
      stubhubEvents,
      seatgeekEvents
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
  console.log('getEventsCall firing');
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
    let ticketmasterEvents = [];
    if (data[0].events) {
      data[0].events.forEach(e => {
        e.source = 'ticketmaster';
        e.sourceUrl = 'https://ticketmaster.com';
        e.status = e.dates.status.code;
        // combine the local date and time fields to create a local dateTime string - if no localtime, use start of day (00:00:00)
        e.datetime_local = normalizeLocalDate(e.dates.start.localDate + 'T' + (e.dates.start.localTime || '00:00:00'), e.dates.timezone);
        // if the datetime field exists, its already in UTC, use that one. Otherwise, get the UTC time from our computed datetime_local
        e.datetime_utc = e.dates.start.dateTime ? normalizeUTCDate(e.dates.start.dateTime) : normalizeUTCDate(e.datetime_local);
        e.date = formatLocalDate(e.datetime_local);
        e.time = e.dates.start.noSpecificTime ? 'No Specific Time': formatTime(e.datetime_local);
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
    if (data[1].events) {
      data[1].events.forEach(e => {
        e.source = 'stubhub';
        e.sourceUrl = 'https://stubhub.com';
        e.status = null;
        e.datetime_local = e.eventDateLocal;
        e.datetime_utc = normalizeUTCDate(e.eventDateUTC);
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
    if (data[2].events) {
      data[2].events.forEach(e => {
        e.source = 'seatgeek';
        e.sourceUrl = 'https://seatgeek.com';
        e.status = null;
        e.datetime_utc = normalizeUTCDate(e.datetime_utc);
        e.datetime_local = normalizeLocalDate(e.datetime_local, e.venue.timezone);
        e.date = e.date_tbd ? null : formatLocalDate(e.datetime_local);
        e.time = e.datetime_tbd ? null : formatTime(e.datetime_local);
        e.venueName = e.venue.name;
        e.venueCity = e.venue.display_location;
        e.name = e.title;
        e.priceBeforeFees = e.stats.lowest_sg_base_price;
        e.priceAfterFees = e.stats.lowest_price;
        e.isPriceEstimated = false;
      });
      seatgeekEvents = data[2].events;
    }
    // determine whether or not to send this data set based on the filters and if this is a filter call
    // Step 2) Combinine the data into one set
    const combinedData = [...ticketmasterEvents, ...stubhubEvents, ...seatgeekEvents];
    // Step 2a) Check to see if there any cancelled events in here
    const hasCancelledEvents = combinedData.reduce((result, event) => 
      event.status === 'cancelled' ? true : result
    , false);
    // Step 2c) Check to see if there are any events with no listings 
    const hasNoListingEvents = combinedData.reduce((result, event) => 
        !event.priceAfterFees ? true : result
    , false);
    // Step 3) Find the minimum and maximum values from the whole data set
    const minMax = combinedData.reduce((accumulator, currentValue) => {
      const minPrice = currentValue.priceAfterFees ? Math.min(currentValue.priceAfterFees, accumulator[0]) : Math.min(Number.POSITIVE_INFINITY, accumulator[0]);
      const maxPrice = currentValue.priceAfterFees ? Math.max(currentValue.priceAfterFees, accumulator[1]) : Math.max(Number.NEGATIVE_INFINITY, accumulator[1]);
      return [
        Math.floor(minPrice),
        Math.ceil(maxPrice)
      ]
    }
    , [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]); 
    // Step ) Get the latest and earliest dates of the data set 
    const dates = combinedData.map(e => moment(e.datetime_local));
    const earliestOfWholeSet = moment.min(dates);
    const latestOfWholeSet = moment.max(dates);
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
    const hasTicketmasterData = ticketmasterEvents.length > 0;
    const hasStubhubData = stubhubEvents.length > 0;
    const hasSeatgeekData = seatgeekEvents.length > 0;

    const providerResultLengths = [0,0,0];
    groupedData.forEach((data) => {
      data.events.forEach((e) => {
        if (e.source === 'ticketmaster') {
          providerResultLengths[0] += 1
        } else if (e.source === 'stubhub') {
          providerResultLengths[1] += 1;
        } else if (e.source === 'seatgeek') {
          providerResultLengths[2] += 1;
        }
      });
    });

    const totalResultsLength = groupedData.reduce((total, current) => total += current.events.length, 0);
    // Step 7) Arrange the data together
    const response = {
      data: groupedData,
      source: {
        ticketmaster: hasTicketmasterData,
        stubhub: hasStubhubData,
        seatgeek: hasSeatgeekData,
      },
      vendorState: {
        ticketmaster: hasTicketmasterData ? 'CHECKED' : 'OFF',
        stubhub: hasStubhubData ? 'CHECKED' : 'OFF',
        seatgeek: hasSeatgeekData ? 'CHECKED' : 'OFF',
      },
      priceRange: minMax,
      dateRange: [earliestOfWholeSet.format(), latestOfWholeSet.format()],
      hasCancelledEvents: hasCancelledEvents ? 'CHECKED' : 'OFF',
      hasNoListingEvents: hasNoListingEvents ? 'CHECKED' : 'OFF',
      providerResultLengths,
      totalResultsLength,
    }
    // Step 8) Send the data
   res.send(response);
  })
  .catch((err) => {
    console.log('error in event search', err);
    res.sendStatus(400);
  });
}

export const flushCache = (req, res) => {
  cache.flush();
  res.sendStatus(200);
}
// NEXT THING TO DO 
// replace showTicketmaster booleans with ON, OFF or GREYED 
// make it so if the state is ON or GREYED, the vendor is included in the filters 
// fix this in the front end as well 
export const getCachedEvents = (req, res) => {
  console.log('cache call starting');
  const key = `getEvents_${req.query.keyword}`;
  // const showTicketmaster = Boolean(req.query.showTicketmaster === "true");
  // const showStubhub = Boolean(req.query.showStubhub === "true");
  // const showSeatgeek = Boolean(req.query.showSeatgeek === "true");
  const ticketmasterState = req.query.ticketmasterState; // CHECKED, UNCHECKED, GREYED, OFF
  const stubhubState = req.query.stubhubState; // CHECKED, UNCHECKED, GREYED, OFF
  const seatgeekState = req.query.seatgeekState; // CHECKED, UNCHECKED, GREYED, OFF
  console.log(ticketmasterState, 'ticketmasterState in cache call');
  console.log(stubhubState, 'stubhubState in cache call');
  console.log(seatgeekState, 'seatgeekState in cache call');
  const showCancelled = req.query.showCancelled;
  const showNoListings = req.query.showNoListings;
  const isSliderCall = Boolean(req.query.isSliderCall === "true");
  const isCalendarCall = Boolean(req.query.isCalendarCall === "true");
  const frontEndPriceFilterRange = [Number(req.query.minPrice), Number(req.query.maxPrice)];
  const isVendorFilterCall = Boolean(req.query.isVendorFilterCall === 'true');
  const isStatusFilterCall = Boolean(req.query.isStatusFilterCall === 'true');
  // call the cache for this data 
  cache.get(key).then(data => {
    // let ticketmasterResults
    let ticketmasterEvents = [];
    let ticketmasterInWholeSet;
    data[0].events.forEach(e => {
      e.source = 'ticketmaster';
      e.sourceUrl = 'https://ticketmaster.com';
      e.status = e.dates.status.code;
      e.datetime_local = normalizeLocalDate(e.dates.start.localDate + 'T' + (e.dates.start.localTime || '00:00:00'), e.dates.timezone);
      // if the datetime field exists, its already in UTC, use that one. Otherwise, get the UTC time from our computed datetime_local
      e.datetime_utc = e.dates.start.dateTime ? normalizeUTCDate(e.dates.start.dateTime) : normalizeUTCDate(e.datetime_local);
      e.date = formatLocalDate(e.datetime_local);
      e.time = e.dates.start.noSpecificTime ? 'No Specific Time': formatTime(e.datetime_local);
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
    ticketmasterInWholeSet = ticketmasterEvents.length > 0;
    // stubhub events
    let stubhubEvents = [];
    let stubhubInWholeSet;
    data[1].events.forEach(e => {
      e.source = 'stubhub';
      e.sourceUrl = 'https://stubhub.com';
      e.status = null;
      e.datetime_local = e.eventDateLocal;
      e.datetime_utc = normalizeUTCDate(e.eventDateUTC);
      e.date = formatLocalDate(e.eventDateLocal);
      e.time = formatTime(e.eventDateUTC);
      e.venueName = e.venue.name;
      e.venueCity = e.venue.city + ', ' + e.venue.state;
      e.priceBeforeFees = e.ticketInfo.minListPrice || null;
      e.priceAfterFees = e.ticketInfo.minPrice || null;
      e.isPriceEstimated = false;
      e.url = "https://www.stubhub.com/" + e.webURI;
    });
    stubhubEvents = data[1].events;
    stubhubInWholeSet = stubhubEvents.length > 0;
    // seatgeek events
    let seatgeekEvents = [];
    let seatgeekInWholeSet;
    data[2].events.forEach(e => {
      e.source = 'seatgeek';
      e.sourceUrl = 'https://seatgeek.com';
      e.status = null;
      e.datetime_utc = normalizeUTCDate(e.datetime_utc);
      e.datetime_local = normalizeLocalDate(e.datetime_local, e.venue.timezone);
      e.date = e.date_tbd ? null : formatLocalDate(e.datetime_local);
      e.time = e.datetime_tbd ? null : formatTime(e.datetime_local);
      e.venueName = e.venue.name;
      e.venueCity = e.venue.display_location;
      e.name = e.title;
      e.priceBeforeFees = e.stats.lowest_sg_base_price || null;
      e.priceAfterFees = e.stats.lowest_price || null;
      e.isPriceEstimated = false;
    });
    seatgeekEvents = data[2].events;
    seatgeekInWholeSet = seatgeekEvents.length > 0;

    let combinedData = [...ticketmasterEvents, ...stubhubEvents, ...seatgeekEvents];
    if (combinedData.length === 0) {
      res.send({data: []});
      return;
    }
    // DATA RANGE VARIABLE CALCULATIONS
    // a) Get the highest and lowest prices before any filtration happens
    const minMaxPriceOfWholeSet = combinedData.reduce((accumulator, currentValue) => {
      const minPrice = currentValue.priceAfterFees ? Math.min(currentValue.priceAfterFees, accumulator[0]) : Math.min(Number.POSITIVE_INFINITY, accumulator[0]);
      const maxPrice = currentValue.priceAfterFees ? Math.max(currentValue.priceAfterFees, accumulator[1]) : Math.max(Number.NEGATIVE_INFINITY, accumulator[1]);
      return [
        Math.floor(minPrice),
        Math.ceil(maxPrice)
      ]
    }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);
    // b) Get the earliest and latest dates, before any filtration happens
    // normalize the results to UTC
    const dates = combinedData.map(e => moment.utc(e.datetime_utc));
    const earliestOfWholeSet = moment.min(dates);
    const latestOfWholeSet = moment.max(dates);

    if (ticketmasterState === 'OFF' || ticketmasterState === 'UNCHECKED' || ticketmasterState === 'GREYED') { ticketmasterEvents = [] }
    if (stubhubState === 'OFF' || stubhubState === 'UNCHECKED' || stubhubState === 'GREYED') { stubhubEvents = [] }
    if (seatgeekState === 'OFF' || seatgeekState === 'UNCHECKED' || seatgeekState === 'GREYED') { seatgeekEvents = [] }

    combinedData = [...ticketmasterEvents, ...stubhubEvents, ...seatgeekEvents];

    if (showCancelled === 'UNCHECKED') {
      combinedData = combinedData.filter(e => e.status !== 'cancelled');
    }
    if (showNoListings === 'UNCHECKED') {
      combinedData = combinedData.filter(e => e.priceAfterFees);
    }
    // FILTRATION INITIATION
    let filteredData = JSON.parse(JSON.stringify(combinedData));
    // let filteredPriceRange;
    let filteredEarliestDate;
    let filteredLatestDate;
    // 2) Do your filtrations 
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;
    let earliestDate = moment.utc(req.query.earliestDate);
    let latestDate = moment.utc(req.query.latestDate);
    // if the call comes from the checkboxes, search against both the filters
    if (isVendorFilterCall || isStatusFilterCall) {
      if (minPrice >= minMaxPriceOfWholeSet[0] || maxPrice <= minMaxPriceOfWholeSet[1]) {
        filteredData = filteredData.filter(e => (e.priceAfterFees >= minPrice && e.priceAfterFees <= maxPrice) || !e.priceAfterFees);
        if (filteredData.length === 0) {
          res.send({data: []});
          return;
        }
      }

      if (earliestDate.isAfter(earliestOfWholeSet) || latestDate.isBefore(latestOfWholeSet)) {
        filteredData = filteredData.filter(e => moment.utc(e.datetime_utc).isBetween(earliestDate, latestDate, undefined, '[]'));
        if (filteredData.length === 0) {
          res.send({data: []});
          return;
        }
      }
    }
    // if the call comes from the calendar, filter the set down to events only within those dates
     else if (isCalendarCall) {
      minPrice = minMaxPriceOfWholeSet[0];
      maxPrice = minMaxPriceOfWholeSet[1];
      // filter the set down via the provided dates 
      if (earliestDate.isAfter(earliestOfWholeSet) || latestDate.isBefore(latestOfWholeSet)) {
        filteredData = filteredData.filter(e => moment.utc(e.datetime_utc).isBetween(earliestDate, latestDate, undefined, '[]'));
        if (filteredData.length === 0) {
          res.send({data: []});
          return;
        }
      }
    }
    // if the call comes from the slider, filter the entire set based on the price 
    else if (isSliderCall) {
      earliestDate = earliestOfWholeSet;
      latestDate = latestOfWholeSet;
      // filter the set down via the provided price range
      if (minPrice >= minMaxPriceOfWholeSet[0] || maxPrice <= minMaxPriceOfWholeSet[1]) {
        filteredData = filteredData.filter(e => (e.priceAfterFees >= minPrice && e.priceAfterFees <= maxPrice) || !e.priceAfterFees);
        if (filteredData.length === 0) {
          res.send({data: []});
          return;
        }
      }
    }
    // get the highest and lowest price from the filtered set
    // filteredPriceRange = filteredData.reduce((accumulator, currentValue) => {
    //   const minPrice = currentValue.priceAfterFees ? Math.min(currentValue.priceAfterFees, accumulator[0]) : Math.min(Number.POSITIVE_INFINITY, accumulator[0]);
    //   const maxPrice = currentValue.priceAfterFees ? Math.max(currentValue.priceAfterFees, accumulator[1]) : Math.max(Number.NEGATIVE_INFINITY, accumulator[1]);
    //   return [
    //     Math.floor(minPrice),
    //     Math.ceil(maxPrice)
    //   ]
    // }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);
    // now that the data set is filtered, get the earliest and latest local dates, to be sent to the front end
    const filteredDates = filteredData.map(e => moment(e.datetime_local));
    filteredEarliestDate = moment.min(filteredDates);
    filteredLatestDate = moment.max(filteredDates);

    const hasCancelledEvents = filteredData.reduce((result, event) => 
      event.status === 'cancelled' ? true : result
    , false);

    const hasNoListingEvents = filteredData.reduce((result, event) => 
      !event.priceAfterFees ? true : result
    , false);

    const cancelledEventsShadingState = statusShadingState('hasCancelledEvents', hasCancelledEvents, showCancelled);
    const noListingsShadingState = statusShadingState('hasNoListingsEvents', hasNoListingEvents, showNoListings);

    const hasTicketmasterData = filteredData.reduce((result, e) => e.source === 'ticketmaster' ? true : result, false);
    const hasStubhubData = filteredData.reduce((result, e) => e.source === 'stubhub' ? true : result, false);
    const hasSeatgeekData = filteredData.reduce((result, e) => e.source === 'seatgeek' ? true : result, false);

    const ticketMasterShadingState = vendorShadingState('ticketmaster', ticketmasterInWholeSet, hasTicketmasterData, ticketmasterState, isVendorFilterCall, isStatusFilterCall, isSliderCall, isCalendarCall);
    const stubhubShadingState = vendorShadingState('stubhub', stubhubInWholeSet, hasStubhubData, stubhubState, isVendorFilterCall, isStatusFilterCall, isSliderCall, isCalendarCall);
    const seatgeekShadingState = vendorShadingState('seatgeek', seatgeekInWholeSet, hasSeatgeekData, seatgeekState, isVendorFilterCall, isStatusFilterCall, isSliderCall, isCalendarCall);

    const sortChronologically = filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedData = groupByDay(sortChronologically);
    if (groupedData[0].date === 'null') {
      const datesTBD = groupedData.shift();
      groupedData.push(datesTBD);
    };
    // count the number of events being returned for every provider
    const providerResultLengths = [0,0,0];
    groupedData.forEach((data) => {
      data.events.forEach((e) => {
        if (e.source === 'ticketmaster') {
          providerResultLengths[0] += 1
        } else if (e.source === 'stubhub') {
          providerResultLengths[1] += 1;
        } else if (e.source === 'seatgeek') {
          providerResultLengths[2] += 1;
        }
      });
    });
    // 3) Get your highs and lows, earliests and latest on FILTERED data set
    const totalResultsLength = groupedData.reduce((total, current) => total += current.events.length, 0);

    const response = {
      data: groupedData,
      source: {
        ticketmaster: hasTicketmasterData,
        stubhub: hasStubhubData,
        seatgeek: hasSeatgeekData,
      },
      vendorState: {
        ticketmaster: ticketMasterShadingState,
        stubhub: stubhubShadingState,
        seatgeek: seatgeekShadingState,
      },
      priceRange: minMaxPriceOfWholeSet,
      dateRange: [earliestOfWholeSet, latestOfWholeSet],
      filteredDateRange: [filteredEarliestDate, filteredLatestDate],
      filteredPriceRange: frontEndPriceFilterRange,
      providerResultLengths,
      totalResultsLength,
      hasCancelledEvents: cancelledEventsShadingState,
      hasNoListingEvents: noListingsShadingState,
    }
    console.log('response object', {
      source: {
        ticketmaster: hasTicketmasterData,
        stubhub: hasStubhubData,
        seatgeek: hasSeatgeekData,
      },
      vendorShadingState: {
        ticketmaster: ticketMasterShadingState,
        stubhub: stubhubShadingState,
        seatgeek:seatgeekShadingState,
      },
      priceRange: minMaxPriceOfWholeSet,
      dateRange: [earliestOfWholeSet, latestOfWholeSet],
      filteredDateRange: [filteredEarliestDate, filteredLatestDate],
      filteredPriceRange: frontEndPriceFilterRange,
      providerResultLengths,
      totalResultsLength,
      hasCancelledEvents: cancelledEventsShadingState,
      hasNoListingEvents: noListingsShadingState,
    });
    console.log('');
    console.log('');
    console.log('');
    res.send(response);
  }) 
  .catch(err => {
    console.log('error in cache filtering call', err);
    res.sendStatus(400);
  });
}