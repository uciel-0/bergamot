import {getTicketMasterSearchResults} from './ticketmaster';
import {getSeatGeekSearchResults, getSeatGeekEvents} from './seatgeek';
import {getStubhubSearchResults, getStubhubEvents} from './stubhub'
import {groupByDay, formatDate} from '../utils/dateUtils';
// final modifications to the array we recieve on the front-end are made here 
export const wideSearchResults = (req, res) => {
  const ticketmaster = getTicketMasterSearchResults(req, res);
  const stubhub = getStubhubSearchResults(req, res);
  const seatgeek = getSeatGeekSearchResults(req, res);
  return Promise.all([ticketmaster, stubhub, seatgeek])
  .then((data) => {
    data[0].events.map(e => {
      e.source = 'ticketmaster';
      e.date = formatDate(e.dates.start.dateTime) || formatDate(e.dates.start.localDate);
      e.venue = e._embedded.venues[0].name;
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
      e.date = formatDate(e.eventDateLocal);
      e.venue = e.venue.name;
      e.priceBeforeFees = e.ticketInfo.minListPrice;
      e.priceAfterFees = e.ticketInfo.minPrice
    });
    data[2].events.map(e => {
      e.source = 'seatgeek';
      e.date = formatDate(e.datetime_utc);
      e.venue = e.venue.name;
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
// this is the api call we're using
export const getEvents = (req, res) => {
  const ticketmaster = getTicketMasterSearchResults(req, res);
  const stubhub = getStubhubEvents(req, res);
  const seatgeek = getSeatGeekEvents(req, res); 
  return Promise.all([ticketmaster, stubhub, seatgeek])
  .then(data => {
    // set some custom fields for easy front end access
    // ticketmaster events
    data[0].events.map(e => {
      e.source = 'ticketmaster';
      e.date = formatDate(e.dates.start.dateTime) || formatDate(e.dates.start.localDate);
      e.venue = e._embedded.venues[0].name;
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
      e.date = formatDate(e.eventDateLocal);
      e.venue = e.venue.name;
      e.priceBeforeFees = e.ticketInfo.minListPrice;
      e.priceAfterFees = e.ticketInfo.minPrice;
      e.isPriceEstimated = false;
    });
    // seatgeek events
    data[2].events.map(e => {
      e.source = 'seatgeek';
      e.date = formatDate(e.datetime_utc);
      e.venue = e.venue.name;
      e.name = e.title;
      e.priceBeforeFees = e.stats.lowest_sg_base_price;
      e.priceAfterFees = e.stats.lowest_price;
      e.isPriceEstimated = false;
    });
    const combinedData = [...data[0].events, ...data[1].events, ...data[2].events];
    const sortChronologically = combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    const groupedData = groupByDay(sortChronologically);
    res.send(groupedData);
  })
  .catch((err) => {
    console.log('error in event search', err);
    res.sendStatus(400);
  });
}
// you also want to map out the individual arrays for the stuff they always return 
// this way you're able to pull data off them