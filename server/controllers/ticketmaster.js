import axios from 'axios';

export const getTicketMasterSearchResults = (req, res) => {
  const keyword = req.query.keyword;
  return axios.get('https://app.ticketmaster.com/discovery/v2/suggest', {
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
    console.err('ticketmaster api call rejection', err)
    return err;
  });
}