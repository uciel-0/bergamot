import express from 'express';
import * as controller from './controllers';

const router = express.Router();

router.get('/api/stubhub/search', controller.getStubhubSuggestions);

export default router;