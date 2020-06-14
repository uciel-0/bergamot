import express from 'express';
import * as controller from './controllers';

const router = express.Router();

router.get('/api/stubhub/search', controller.stubhub.getStubhubSearchResults);
router.get('/api/ticketmaster/search', controller.ticketmaster.getTicketMasterSearchResults)

export default router;