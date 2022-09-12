import express from 'express';
import * as controller from './controllers';
const router = express.Router();

// one call, returns across all categories
router.get('/search/wide', controller.search.wideSearchResults);
// categories = events, preformers, venues, locations
router.get('/search/events', controller.search.getEvents);
router.get('/cache/flush', controller.search.flushCache);
router.get('/cache/events', controller.search.getCachedEvents);
router.get('/info', controller.info.getInfo);
router.get('/images/batch', controller.images.getArrayOfImages);
router.get('/location/nearby', controller.location.getEventsNearYou);
// individual api calls
// router.get('/api/ticketmaster/events', controller.ticketmaster.getTicketMasterSearchResults);
// router.get('/api/stubhub/events', controller.seatgeek.getSeatGeekEvents);
// router.get('/api/stubhub/events', controller.stubhub.getStubhubEvents);
export default router;