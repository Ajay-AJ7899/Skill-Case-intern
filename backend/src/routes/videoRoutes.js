const express = require('express');
const videoController = require('../controllers/videoController');
const commentController = require('../controllers/commentController');
const bookmarkController = require('../controllers/bookmarkController');
const authMiddleware = require('../middlewares/authMiddleware');
const asyncHandler = require('../utils/asyncHandler');

const router = express.Router();

router.post('/', asyncHandler(videoController.createVideo));
router.get('/', asyncHandler(videoController.getVideos));
router.get('/:id', asyncHandler(videoController.getVideoById));
router.post('/:id/like', authMiddleware, asyncHandler(videoController.likeVideo));
router.post(
  '/:id/comment',
  authMiddleware,
  asyncHandler(commentController.addComment)
);
router.get('/:id/comments', asyncHandler(commentController.getComments));
router.post(
  '/:id/bookmark',
  authMiddleware,
  asyncHandler(bookmarkController.addBookmark)
);

module.exports = router;
