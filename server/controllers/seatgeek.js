import axios from 'axios';
// working
const getSeatGeekEvents = (req) => {
  const keyword = req.query.keyword.replace(/\s/g, '-');
  const client_id = 'MTg4ODAyNjN8MTU4OTU3NDI4NS44NQ'
  const endpoint = `https://api.seatgeek.com/2/events?client_id=${client_id}&performers.slug=${keyword}`
  return axios.get(endpoint)
  .then((data) => {
    return data.data;
  })
  .catch((err) => {
    return err;
  })
}

const getSeatGeekPerformers = (req) => {
  const keyword = req.query.keyword.replace(/\s/g, '-');
  console.log('seatgeek performers api call')
  return axios.get('https://api.seatgeek.com/2/performers', {
    params: {
      client_id: 'MTg4ODAyNjN8MTU4OTU3NDI4NS44NQ',
      slug: keyword,
    }
  })
  .then((data) => {
    console.log(keyword, 'from seatgeek performers api');
    console.log('seatkgeek performers api response', data);
    return data.data;
  })
  .catch((err) => {
    return err;
  })
}

const getSeatGeekVenues = (req) => {
  const keyword = req.query.keyword;
  console.log('seatgeek venues api call')
  return axios.get('https://api.seatgeek.com/2/venues', {
    params: {
      client_id: 'MTg4ODAyNjN8MTU4OTU3NDI4NS44NQ',
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

export const getSeatGeekSearchResults = (req, res) => {
  const events = getSeatGeekEvents(req);
  const performers = getSeatGeekPerformers(req);
  const venues = getSeatGeekVenues(req);
  Promise.all([events, performers, venues])
  .then((data) => {
    console.log('seatgeek search results response', data);
    let searchResults = {
      events: data[0].events,
      performers: data[1].performers,
      venues: data[2].venues
    }
    res.send(searchResults);
  })
  .catch((err) => {
    console.log('error with seatgeek api calls', err);
    res.sendStatus(400);
  })
}