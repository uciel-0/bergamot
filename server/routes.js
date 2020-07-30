import express from 'express';
import * as controller from './controllers';
const router = express.Router();

// one call, returns across all categories
router.get('/api/search/wide', controller.search.wideSearchResults);
// categories = events, preformers, venues, locations
router.get('/api/search/events', controller.search.getEvents);

export default router;