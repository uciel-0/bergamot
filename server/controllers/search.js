import {getTicketMasterSearchResults} from './ticketmaster';
import {getSeatGeekSearchResults, getSeatGeekEvents} from './seatgeek';
import {getStubhubSearchResults, getStubhubEvents} from './stubhub'
// final modifications to the array we recieve on the front-end are made here 
export const wideSearchResults = (req, res) => {
  const ticketmaster = getTicketMasterSearchResults(req, res);
  const stubhub = getStubhubSearchResults(req, res);
  const seatgeek = getSeatGeekSearchResults(req, res);
  return Promise.all([ticketmaster, stubhub, seatgeek])
  .then((data) => {
    data[0].events.map(e => {
      e.source = 'ticketmaster';
      e.date = normalizeDate(e.dates.start.dateTime) || normalizeDate(e.dates.start.localDate);
      if (e.priceRanges) {
        e.minPrice = e.priceRanges[0].min;
      }
    });
    data[1].events.map(e => {
      e.source = 'stubhub';
      e.date = normalizeDate(e.eventDateLocal);
      e.minPrice = e.ticketInfo.minPrice;
    });
    data[2].events.map(e => {
      e.source = 'seatgeek';
      e.date = normalizeDate(e.datetime_local);
      e.name = e.title;
      e.minPrice = e.stats.lowest_price;
    });
    const combinedData = [...data[0].events, ...data[1].events, ...data[2].events];
    const dataSortedByDate = combinedData.sort((a, b) => new Date(a.date) - new Date(b.date));
    res.send(dataSortedByDate);
  })
  .catch((err) => {
    console.log('error in master search', err);
    res.sendStatus(400);
  });
}

export const getEvents = (req, res) => {
  const ticketmaster = getTicketMasterSearchResults(req, res);
  const stubhub = getStubhubEvents(req, res);
  const seatgeek = getSeatGeekEvents(req, res); 
  return Promise.all([ticketmaster, stubhub, seatgeek])
  .then(data => {
    // set some custom fields for easy front end access
    data[0].events.map(e => {
      e.source = 'ticketmaster';
      e.date = normalizeDate(e.dates.start.dateTime) || normalizeDate(e.dates.start.localDate);
      if (e.priceRanges) {
        e.minPrice = e.priceRanges[0].min;
      }
    })
    data[1].events.map(e => {
      e.source = 'stubhub';
      e.date = normalizeDate(e.eventDateLocal);
      e.minPrice = e.ticketInfo.minPrice;
    });
    data[2].events.map(e => {
      e.source = 'seatgeek';
      e.date = normalizeDate(e.datetime_local);
      e.name = e.title;
      e.minPrice = e.stats.lowest_price;
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

const normalizeDate = (date) => {
  if (date) {
    let dateObject = new Date(date);
    const offset = dateObject.getTimezoneOffset();
    dateObject = new Date(dateObject.getTime() + (offset*60*100))
    return dateObject.toISOString().split('T')[0]
  } else return false;
}

const groupByDay = (data) => {
  console.log(data, 'grouped data from inside the set');
  // array of objects 
  let groupedData = {};
  let eventsOnSameDay = [];
  data.forEach((e) => {
    const date = e.date;
    const event = e;
    if (!groupedData[date]) {
      eventsOnSameDay = [];
      groupedData[date] = eventsOnSameDay;
      eventsOnSameDay.push(event);
    } else if (groupedData[date]) {
      eventsOnSameDay.push(event);
    }
  });
  console.log('GROUPEDDATASTART',groupedData, 'GROUPEDDATAEND');
  return groupedData;
}
