import axios from 'axios';
const client_id = 'MTg4ODAyNjN8MTU4OTU3NDI4NS44NQ';
// working
export const getSeatGeekEvents = (req) => {
  const keyword = req.query.keyword.trim().replace(/\s/g, '-');
  const client_id = 'MTg4ODAyNjN8MTU4OTU3NDI4NS44NQ';
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const dateRangeString = startDate && endDate ? `&datetime_utc.gte=${startDate}&datetime_utc.lte=${endDate}` : '';
  const endpoint = `https://api.seatgeek.com/2/events?client_id=${client_id}&performers.slug=${keyword}${dateRangeString}`
  return axios.get(endpoint)
  .then((data) => {
    // console.log('seatgeek endpoint string', endpoint);
    return data.data;
  })
  .catch((err) => {
    console.log('seatgeek events api rejection', err);
    return err;
  })
}

const getSeatGeekPerformers = (req) => {
  const keyword = req.query.keyword.trim().replace(/\s/g, '-');
  return axios.get('https://api.seatgeek.com/2/performers', {
    params: {
      client_id,
      slug: keyword,
    }
  })
  .then((data) => {
    return data.data;
  })
  .catch((err) => {
    console.log(err);
    return err;
  })
}

const getSeatGeekVenues = (req) => {
  const keyword = req.query.keyword;
  return axios.get('https://api.seatgeek.com/2/venues', {
    params: {
      client_id,
      q: keyword,
    }
  })
  .then((data) => {
    return data.data;
  })
  .catch((err) => {
    return err
  })
}

export const getSeatGeekSearchResults = (req) => {
  const events = getSeatGeekEvents(req);
  const performers = getSeatGeekPerformers(req);
  const venues = getSeatGeekVenues(req);
  return Promise.all([events, performers, venues])
  .then((data) => {
    let searchResults = {
      events: data[0].events,
      performers: data[1].performers,
      venues: data[2].venues
    }
    return searchResults;
  })
  .catch((err) => {
    console.log('error with seatgeek api calls', err);
    return err 
  })
}

export const getSeatgeekEventsNearYou = (q, lat, lon) => {
  return axios.get(`https://api.seatgeek.com/2/events`, {
    params: {
      client_id,
      lat, 
      lon, 
      q
    }
  })
  .then(data => {
    //  console.log('seatgeekdata', data.data.events);
     return data.data.events;
  })
  .catch(err => {
    console.log('stubhub events near your call failed', err);
    return [];
  })
}