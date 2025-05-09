const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { TweetController, LikeController, CommentController, AuthController } = require('../../controllers/index');
const { authenticate } = require('../../middlewares/authenticate');

router.post('/tweets', authenticate, upload.single('image'), TweetController.create);
router.get('/tweet', TweetController.getTweetById);
router.post('/likes/toggle', LikeController.toggleLike);
router.post('/comments', authenticate, CommentController.createComm);
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);
router.get('/tweets/image', TweetController.getImage);

module.exports = router;
