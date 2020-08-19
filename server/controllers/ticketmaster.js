import axios from 'axios';

export const getTicketMasterSearchResults = (req) => {
  const keyword = req.query.keyword;
  return axios.get('https://app.ticketmaster.com/discovery/v2/events', {
    params: {
      apikey: 'BBCLAjLv49NKWn8ridowEhErPKvuxJfT',
      countryCode: 'US',
      keyword,
    }
  })
  .then((data) => {
    return data.data._embedded
  })
  .catch((err) => {
    console.log('ticketmaster api call rejection', err)
    return err;
  });
}