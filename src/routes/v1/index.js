const express = require('express');
const router = express.Router();

const { TweetController, LikeController, CommentController, AuthController } = require('../../controllers/index');
const {authenticate} = require('../../middlewares/authenticate');

router.post('/tweets', authenticate , TweetController.create);
router.get('/tweet', TweetController.getTweetById);
router.post('/likes/toggle', LikeController.toggleLike);
router.post('/comments', authenticate, CommentController.createComm);
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);

module.exports = router;