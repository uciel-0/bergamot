// in this file we'll define the XHR calls to the stubhub and ticketmaster backend 
// for now, we'll just do the stubhub calls since they're the ones giving us a hard time
import axios from 'axios';
import { Router } from 'express';
// this has got to take in some input from the front end 
export const getStubhubPerformers = (req, res) => {
  const keyword = req.query.keyword;
  return axios.get('https://api.stubhub.com/partners/search/performers/v3', {
    params: {
      q: keyword
    },
    headers: {
      'Authorization': 'Bearer kkdYmnxlNAdt7Me5BShGcwtIHgHP'
    }
  }).then((data) => {
    console.log('stubhub performers api response', data.data)
    return data.data
  })
  .catch((err) => {
    console.error('stubhub performers api rejection', err);
    return err
  })
}
// good 
export const getStubhubEvents = (req, res) => {
  const keyword = req.query.keyword;
  return axios.get('https://api.stubhub.com/sellers/search/events/v3', {
    params: {
      q: keyword,
    },
    headers: {
      'Authorization': 'Bearer kkdYmnxlNAdt7Me5BShGcwtIHgHP',
      'Accept': 'application/json'
    }
  })
  .then((data) => {
    console.log('stubhub events api response', data.data)
    return data.data
  })
  .catch((err) => {
    console.err('stubhub events api rejection', err)
    return err
  });
}

export const getStubhubVenues = (req, res) => {
  const keyword = req.query.keyword;
  return axios.get('https://api.stubhub.com/partners/search/venues/v3', {
    params: {
      q: keyword,
    },
    headers: {
      'Authorization': 'Bearer kkdYmnxlNAdt7Me5BShGcwtIHgHP',
      'Accept': 'application/json'
    }
  })
  .then((data) => {
    console.log('stubhub venues api response', data.data)
    return data.data
  })
  .catch((err) => {
    console.err('stubhub venues api rejection', err)
    return err
  });
}
// good 
export const getStubhubLocations = (req, res) => {
  const keyword = req.query.keyword;
  return axios.get('https://api.stubhub.com/sellers/search/locations/v3', {
    params: {
      q: keyword,
    },
    headers: {
      'Authorization': 'Bearer kkdYmnxlNAdt7Me5BShGcwtIHgHP',
      'Accept': 'application/json'
    }
  })
  .then((data) => {
    return data.data
  })
  .catch((err) => {
    console.err('stubhub locations api rejection', err)
    return err
  });
}

export const getStubhubSuggestions = (req, res) => {
  const performers = getStubhubPerformers(req, res);
  const events = getStubhubEvents(req, res);
  const venues = getStubhubVenues(req, res);
  const locations = getStubhubLocations(req, res);
  Promise.all([performers, events, venues, locations])
  .then((data) => {
    let suggestionsResponse = {
      performers: data[0].performers,
      events: data[1].events,
      venues: data[2].venues,
      locations: data[3].locations
    }
    res.send(suggestionsResponse);
  })
  .catch((err) => {
    console.log('all calls did not resolve successfully', err);
    res.sendStatus(400)
  })
}
