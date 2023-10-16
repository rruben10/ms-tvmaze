import express from 'express';
import * as searchController from '../controllers/searchController';
import * as showController from '../controllers/showController'
import * as commentController from '../controllers/commentController'

const router = express.Router();

router.get('/api/search', searchController.getSearch);
router.get('/api/show', showController.getShowById);
router.post('/api/comments', commentController.postCommentShow);

export default router;
