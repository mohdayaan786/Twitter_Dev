const Tweet = require('../models/tweet');

class TweetRepository {
    async create(data) {
        return await Tweet.create(data);
    }

    async get(id) {
        return await Tweet.findById(id);
    }

    async getWithComments(id) {
        return await Tweet.findById(id).populate({path : 'comments'}).lean();
    }
 
    async update(tweetId, data) {
        return await Tweet.findByIdAndUpdate(tweetId,data, {new:true});
    }

    async delete(id) {
        return await Tweet.findByIdAndDelete(id);
    }

    async getAll(offset, limit) {
        return await Tweet.find().skip(offset).limit(limit);
    }
}
module.exports = TweetRepository;