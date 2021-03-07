import axios from 'axios';
import moment from 'moment';
// this has got to take in some input from the front end 
export const getStubhubEvents = (req) => {
  const keyword = req.query.keyword;
  const startDate = req.query.startDate ? moment(req.query.startDate).utc().format(`yyyy-MM-DD`) : undefined;
  const endDate = req.query.endDate ? moment(req.query.endDate).utc().format('yyyy-MM-DD') : undefined;
  const dateRangeString = startDate && endDate ? `${startDate} TO ${endDate}` : '';
  return axios.get('https://api.stubhub.com/sellers/search/events/v3', {
    params: {
      name: keyword,
      date: dateRangeString
    },
    headers: {
      'Authorization': 'Bearer uAooAIJblDT83nKP0mzWdL3hhNg1',
      'Accept': 'application/json'
    }
  })
  .then((data) => {
    console.log('stubhub dateRangeString', dateRangeString);
    return data.data
  })
  .catch((err) => {
    console.log('stubhub events api rejection', err)
    return err;
  });
}

const getStubhubPerformers = (req) => {
  const keyword = req.query.keyword;
  return axios.get('https://api.stubhub.com/partners/search/performers/v3', {
    params: {
      name: keyword
    },
    headers: {
      'Authorization': 'Bearer uAooAIJblDT83nKP0mzWdL3hhNg1'
    }
  }).then((data) => {
    return data.data
  })
  .catch((err) => {
    console.error('stubhub performers api rejection', err);
    return err
  })
}

const getStubhubVenues = (req) => {
  const keyword = req.query.keyword;
  return axios.get('https://api.stubhub.com/partners/search/venues/v3', {
    params: {
      name: keyword,
    },
    headers: {
      'Authorization': 'Bearer uAooAIJblDT83nKP0mzWdL3hhNg1',
      'Accept': 'application/json'
    }
  })
  .then((data) => {
    return data.data
  })
  .catch((err) => {
    console.err('stubhub venues api rejection', err)
    return err
  });
}
// good 
const getStubhubLocations = (req) => {
  const keyword = req.query.keyword;
  return axios.get('https://api.stubhub.com/sellers/search/locations/v3', {
    params: {
      name: keyword,
    },
    headers: {
      'Authorization': 'Bearer uAooAIJblDT83nKP0mzWdL3hhNg1',
      'Accept': 'application/json'
    }
  })
  .then((data) => {
    return data.data;
  })
  .catch((err) => {
    console.err('stubhub locations api rejection', err)
    return err
  });
}
// the searchResults object returns across multiple categories
export const getStubhubSearchResults = (req, res) => {
  const events = getStubhubEvents(req);
  const performers = getStubhubPerformers(req);
  const venues = getStubhubVenues(req);
  const locations = getStubhubLocations(req);
  return Promise.all([events, performers, venues, locations])
  .then((data) => {
    let searchResults = {
      events: data[0].events,
      performers: data[1].performers,
      venues: data[2].venues,
      locations: data[3].locations
    }
    return searchResults;
  })
  .catch((err) => {
    console.log('all calls did not resolve successfully', err);
    return err
  })
}