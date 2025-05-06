const Hashtag = require('../models/hashtags');

class HashtagRepository {
    async create(data) {
        return await Hashtag.create(data);
    }

    async get(id) {
        return await Hashtag.findById(id);
    }

    async bulkCreate(data) {
        return await Hashtag.insertMany(data);
    } 

    async getWithComments(id) {
        return await Hashtag.findById(id).populate({path : 'comments'}).lean();
    }
 
    async update(tweetId, data) {
        return await Hashtag.findByIdAndUpdate(tweetId,data, {new:true});
    }

    async delete(id) {
        return await Hashtag.findByIdAndDelete(id);
    }

    async getAll(offset, limit) {
        return await Hashtag.find().skip(offset).limit(limit);
    }
    async findByName(titleList) {
        return await Hashtag.find({ title: titleList });
    }
}
module.exports = HashtagRepository;