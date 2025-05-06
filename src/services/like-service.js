const {TweetRepository, LikeRepository} = require('../repository');

class LikeService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.likeRepository = new LikeRepository();
    }

    async toggleLike(modelId, modelType, userId) {
        if(modelType == 'Tweet'){
            var likeable = await this.tweetRepository.get(modelId).populate('likes');
        }
        else if(modelType == 'Comment'){
            var likeable = await this.tweetRepository.getWithComments(modelId).populate('likes');
        }
        else{
            throw new Error('Invalid model type');
        }
        const exists = await this.likeRepository.getByUserAndLikeable({
            user: userId,
            likeable: modelId,
            onModel: modelType
        });
        if(exists) {
            likeable.likes.pull(exists._id);
            await likeable.save();
            await exists.remove();
            var isRemoved = true;
        }
        else {
            const newLike = await this.likeRepository.create({
                user: userId,
                likeable: modelId,
                onModel: modelType
            });
            likeable.likes.push(newLike);  //XXX
            await likeable.save();
            var isRemoved = false;
        }
        return isRemoved;
    }
}

