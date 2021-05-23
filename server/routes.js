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
// individual api calls
// router.get('/api/ticketmaster/events', controller.ticketmaster.getTicketMasterSearchResults);
// router.get('/api/stubhub/events', controller.seatgeek.getSeatGeekEvents);
// router.get('/api/stubhub/events', controller.stubhub.getStubhubEvents);
export default router;