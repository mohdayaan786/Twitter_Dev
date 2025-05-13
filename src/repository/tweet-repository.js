const Tweet = require('../models/tweet');
const CrudRepository = require('./crud-repository');

class TweetRepository extends CrudRepository {
    constructor() {
        super(Tweet);
    }

    async create(data) {
        try {
            return await Tweet.create(data);
        } catch (error) {
            console.error('Error creating tweet:', error);
            throw error; // rethrow so service/controller can handle it
        }
    }

    async getWithComments(id) {
        try {
            return await Tweet.findById(id).populate({ path: 'comments' }).lean();
        } catch (error) {
            console.error(`Error fetching tweet with comments for ID ${id}:`, error);
            throw error;
        }
    }

    async getAll(offset = 0, limit = 10) {
        try {
            return await Tweet.find().skip(offset).limit(limit);
        } catch (error) {
            console.error('Error fetching all tweets:', error);
            throw error;
        }
    }
}

module.exports = TweetRepository;
