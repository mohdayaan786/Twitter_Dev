const Tweet = require('../models/tweet');
const CrudRepository = require('./crud-repository');

class TweetRepository extends CrudRepository {

    constructor() {
        super(Tweet);
    }

    async create(data) {
        return await Tweet.create(data);
    }

    async getWithComments(id) {
        return await Tweet.findById(id).populate({path : 'comments'}).lean();
    }

    async getAll(offset, limit) {
        return await Tweet.find().skip(offset).limit(limit);
    }
}
module.exports = TweetRepository;