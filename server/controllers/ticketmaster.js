import axios from 'axios';
const apikey = 'BBCLAjLv49NKWn8ridowEhErPKvuxJfT';
const countryCode = 'US';

export const getTicketMasterSearchResults = (req) => {
  const keyword = req.query.keyword;
  const startDateTime = req.query.startDate || '';
  const endDateTime = req.query.endDate || '';
  return axios.get('https://app.ticketmaster.com/discovery/v2/events', {
    params: {
      apikey,
      countryCode,
      keyword,
      startDateTime,
      endDateTime
    }
  })
  .then((data) => {
    console.log('ticketmaster startDateTime', startDateTime, ' and endDateTime', endDateTime);
    return data.data._embedded;
  })
  .catch((err) => {
    console.log('ticketmaster api call rejection', err);
    return err;
  });
}

export const getTicketmasterImages = (eventName) => {
  return axios.get('https://app.ticketmaster.com/discovery/v2/attractions', {
    params: {
      apikey,
      countryCode,
      keyword: eventName
    }
  })
  .then((data) => {
    console.log('ticketmaster images api call sucess', eventName);
    const ticketmasterResponse = data.data._embedded.attractions[0];
    const imagesObject = {
      name: ticketmasterResponse.name,
      images: ticketmasterResponse.images.filter(image => image.width === 640 && image.height === 360 && image),
    }
    return imagesObject;
  })
  .catch((err) => {
    console.log('ticketmaster api call rejection', err);
    return err;
  });
}

export const getTicketmasterEventsNearYou = (keyword, lat, long) => {
  return axios.get('https://app.ticketmaster.com/discovery/v2/events', {
    params: {
      apikey,
      keyword,
      countryCode,
      latlong:  lat + ',' + long,
      radius: '30',
      unit: 'miles'
    }
  })
  .then(data => {
    return data.data._embedded.events;
  })
  .catch(err => {
    console.log('ticketmaster events near your call failed', err);
    return [];
  })
}