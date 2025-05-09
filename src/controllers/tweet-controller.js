const TweetService = require('../services/tweet-service');
const tweetService = new TweetService();

const create = async (req, res) => {
    try {
        const tweet = await tweetService.create(req.body, req.file);  // pass req.file for image
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
        const bufferData = Buffer.from(tweet.image.data.buffer);  // <- important line
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
    getTweetById,
    getImage
};
