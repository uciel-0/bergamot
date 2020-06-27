import express from 'express';
import * as controller from './controllers';

const router = express.Router();

router.get('/api/search/events', controller.search.searchEvents);

export default router;