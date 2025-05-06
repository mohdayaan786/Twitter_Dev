const TweetService = require('../services/tweet-service');

const tweetService = new TweetService();

const create = async(req,res) => {
    try{
        const tweet = await tweetService.create(req.body);
        res.status(201).json({
            success: true,
            message: "Tweet created successfully",
            data: tweet,
            err : {}
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Something went wrong !"});
    }
}

module.exports = {
    create
}