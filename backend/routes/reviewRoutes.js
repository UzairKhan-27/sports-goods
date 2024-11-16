import express from 'express';
import { AddReviewController,DeleteReviewController,GetReviewController } from '../controllers/ReviewsController.js';
import {verifyUser} from '../middlewares/userauth.js'
const router = express.Router();
router.post('/addreview',verifyUser,AddReviewController);
router.post('/deleteReview',verifyUser,DeleteReviewController);
router.get('/reviews',verifyUser,GetReviewController);
export default router;