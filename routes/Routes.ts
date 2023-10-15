import express from 'express';
import * as searchController from '../controllers/searchController';
import * as showController from '../controllers/showController'

const router = express.Router();

router.get('/api/search', searchController.getSearch);
router.get('/api/show', showController.getShowById)

export default router;
