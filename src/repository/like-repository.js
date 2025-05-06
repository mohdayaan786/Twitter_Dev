const Like = require('../models/like');
const CrudRepository = require('./crud-repository');

class LikeRepository extends CrudRepository {
    constructor() {
        super(Like);
    }

    async create(data) {
        return await Like.create(data);
    }

    async getAll(offset, limit) {
        return await Like.find().skip(offset).limit(limit);
    }

    async getByUserAndLikeable(data) {
        return await Like.findOne(data);
    }
}

module.exports = LikeRepository;