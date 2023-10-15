import express from 'express';
import * as showController from '../controllers/searchController';

const router = express.Router();

router.get('/api/search', showController.getSearch);

export default router;
