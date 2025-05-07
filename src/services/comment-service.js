const {CommentRepository, TweetRepository} = require('../repository');

class CommentService {
    constructor() {
        this.commentRepository = new CommentRepository();
        this.tweetRepository = new TweetRepository();
    }

    async createComment(modelId, modelType, userId, content) {
        if(modelType=='Tweet'){
            var commentable = await this.tweetRepository.get(modelId);
        }
        else if(modelType=='Comment'){
            var commentable = await this.commentRepository.get(modelId);
        }
        else {
            throw new Error('Invalid model type');
        }
        const comment = await this.commentRepository.create({
            content,
            userId,
            onModel: modelType,
            commentable: modelId,
            comments: []
        });
        commentable.comments.push(comment);
        await commentable.save();
        return comment;
    }

    async getCommentsByCommentableId(commentableId) {
        try {
            const comments = await this.commentRepository.getCommentsByCommentableId(commentableId);
            return comments;
        } catch (error) {
            throw error;
        }
    }

    async getCommentsByUserId(userId) {
        try {
            const comments = await this.commentRepository.getCommentsByUserId(userId);
            return comments;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CommentService;