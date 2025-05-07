const express = require('express');
const router = express.Router();

const {create, getTweetById} = require('../../controllers/tweet-controller');
const {toggleLike} = require('../../controllers/like-controller');
const {createComm} = require('../../controllers/comment-controller');

router.post('/tweets', create);
router.get('/tweet', getTweetById);
router.post('/likes/toggle', toggleLike);
router.post('/comments', createComm);

module.exports = router;