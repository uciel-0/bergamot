import express from 'express';
import * as controller from './controllers';
const router = express.Router();

// one call, returns across all categories
router.get('/api/search/wide', controller.search.wideSearchResults);
// categories = events, preformers, venues, locations
router.get('/api/search/events', controller.search.getEvents);
router.get('/api/cache/flush', controller.search.flushCache);
router.get('/api/cache/events', controller.search.getCachedEvents);
router.get('/api/info', controller.info.getInfo);
router.get('/api/images/singleEvent', controller.images.getSingleEventImage);
router.get('/api/images/concertsOne', controller.images.getTopEightConcertsOne);
router.get('/api/images/concertsTwo', controller.images.getTopEightConcertsTwo);
router.get('/api/images/sportsOne', controller.images.getTopEightSportsOne);
router.get('/api/images/sportsTwo', controller.images.getTopEightSportsTwo);
router.get('/api/images/festivalsOne', controller.images.getTopEightFestivalsOne);
router.get('/api/images/festivalsTwo', controller.images.getTopEightFestivalsTwo);
router.get('/api/images/theatreOne', controller.images.getTopEightTheatreOne);
router.get('/api/images/theatreTwo', controller.images.getTopEightTheatreTwo);
router.get('/api/images/batch', controller.images.getArrayOfImages);
// individual api calls
// router.get('/api/ticketmaster/events', controller.ticketmaster.getTicketMasterSearchResults);
// router.get('/api/stubhub/events', controller.seatgeek.getSeatGeekEvents);
// router.get('/api/stubhub/events', controller.stubhub.getStubhubEvents);
export default router;