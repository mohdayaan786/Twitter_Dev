const CrudRepository = require('./crud-repository');
const Comment = require('../models/comments');

class CommentRepository extends CrudRepository {
    constructor() {
        super(Comment);
    }

    async getCommentsByCommentableId(commentableId) {
        try {
            const comments = await this.model.find({ commentable: commentableId }).populate('userId', 'name email');
            return comments;
        } catch (error) {
            throw error;
        }
    }

    async getCommentsByUserId(userId) {
        try {
            const comments = await this.model.find({ userId }).populate('userId', 'name email');
            return comments;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = CommentRepository;