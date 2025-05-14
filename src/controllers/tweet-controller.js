const {TweetService} = require('../services/index');
const tweetService = new TweetService();

const create = async (req, res) => {
    try {
        const userId = req.user.id; // assuming authentication middleware sets req.user
        const tweet = await tweetService.create(req.body, req.file, userId);
        
        res.status(201).json({
            success: true,
            message: "Tweet created successfully",
            data: tweet,
            err: {}
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {},
            err: err.message
        });
    }
};


const retweet = async (req, res) => {
    try {
        const { tweetId, content = '' } = req.body;
        const userId = req.user.id;

        if (!tweetId) {
            return res.status(400).json({
                success: false,
                message: "tweetId is required",
                data: {},
                err: {}
            });
        }

        const retweet = await tweetService.retweet(tweetId, userId, content);
        res.status(201).json({
            success: true,
            message: "Retweet successful",
            data: retweet,
            err: {}
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong during retweet!",
            data: {},
            err: err.message
        });
    }
};



const getImage = async (req, res) => {
    try {
        const tweet = await tweetService.getTweetById(req.query.id);
        if (!tweet || !tweet.image) {
            return res.status(404).json({
                success: false,
                message: "Image not found",
                data: {},
                err: {}
            });
        }
        res.set('Content-Type', tweet.image.contentType);
        const bufferData = Buffer.from(tweet.image.data.buffer);
        res.send(bufferData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {},
            err: err.message
        });
    }
};

const getTweetById = async (req, res) => {
    try {
        const tweet = await tweetService.getTweetById(req.query.id);
        res.status(200).json({
            success: true,
            message: "Tweet fetched successfully",
            data: tweet,
            err: {}
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Something went wrong!",
            data: {},
            err: err.message
        });
    }
};

module.exports = {
    create,
    getImage,
    getTweetById,
    tweetService,
    retweet
};

