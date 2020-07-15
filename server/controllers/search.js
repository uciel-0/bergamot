import {getTicketMasterSearchResults} from './ticketmaster';
import {getSeatGeekSearchResults} from './seatgeek';
import {getStubhubSearchResults} from './stubhub'

export const searchEvents = (req, res) => {
  const ticketmaster = getTicketMasterSearchResults(req, res);
  const stubhub = getStubhubSearchResults(req, res);
  const seatgeek = getSeatGeekSearchResults(req, res);
  return Promise.all([ticketmaster, stubhub, seatgeek])
  .then((data) => {
    data[0].events.map(e => {
      e.source = 'ticketmaster';
      e.date = e.dates.start.dateTime || e.dates.start.localDate;
      if (e.priceRanges) {
        e.minPrice = e.priceRanges[0].min;
      }
    });
    data[1].events.map(e => {
      e.source = 'stubhub';
      e.date = e.eventDateLocal;
      e.minPrice = e.ticketInfo.minPrice;
    });
    data[2].events.map(e => {
      e.source = 'seatgeek';
      e.date = e.datetime_local;
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