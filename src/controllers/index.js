const TweetService = require('../services/tweet-service');

module.exports = {
    TweetController : require('./tweet-controller')(new TweetService()),
    LikeController : require('./like-controller'),
    CommentController : require('./comment-controller'),
    AuthController : require('./auth-controller'),
};
