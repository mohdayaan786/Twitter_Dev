const CommentService = require('../../src/services/comment-service');
const { CommentRepository, TweetRepository } = require('../../src/repository');

jest.mock('../../src/repository');

describe('CommentService', () => {
    let commentService;
    let mockCommentable;
    let mockComment;

    beforeEach(() => {
        CommentRepository.mockClear();
        TweetRepository.mockClear();

        commentService = new CommentService();

        mockCommentable = {
            comments: [],
            save: jest.fn()
        };

        mockComment = {
            _id: 'comment123',
            content: 'Nice tweet!',
            userId: 'user123'
        };
    });

    describe('createComment', () => {
        test('should create a comment on a tweet', async () => {
            commentService.tweetRepository.get = jest.fn().mockResolvedValue(mockCommentable);
            commentService.commentRepository.create = jest.fn().mockResolvedValue(mockComment);

            const result = await commentService.createComment('tweet123', 'Tweet', 'user123', 'Nice tweet!');

            expect(commentService.tweetRepository.get).toHaveBeenCalledWith('tweet123');
            expect(commentService.commentRepository.create).toHaveBeenCalledWith({
                content: 'Nice tweet!',
                userId: 'user123',
                onModel: 'Tweet',
                commentable: 'tweet123',
                comments: []
            });
            expect(mockCommentable.comments).toContain(mockComment);
            expect(mockCommentable.save).toHaveBeenCalled();
            expect(result).toEqual(mockComment);
        });

        test('should create a comment on a comment', async () => {
            commentService.commentRepository.get = jest.fn().mockResolvedValue(mockCommentable);
            commentService.commentRepository.create = jest.fn().mockResolvedValue(mockComment);

            const result = await commentService.createComment('commentable456', 'Comment', 'user123', 'Reply here');

            expect(commentService.commentRepository.get).toHaveBeenCalledWith('commentable456');
            expect(commentService.commentRepository.create).toHaveBeenCalledWith({
                content: 'Reply here',
                userId: 'user123',
                onModel: 'Comment',
                commentable: 'commentable456',
                comments: []
            });
            expect(mockCommentable.comments).toContain(mockComment);
            expect(mockCommentable.save).toHaveBeenCalled();
            expect(result).toEqual(mockComment);
        });

        test('should throw error on invalid model type', async () => {
            await expect(
                commentService.createComment('someId', 'InvalidModel', 'user123', 'Text')
            ).rejects.toThrow('Invalid model type');
        });
    });

    describe('getCommentsByCommentableId', () => {
        test('should return comments by commentable ID', async () => {
            const mockResult = [mockComment];
            commentService.commentRepository.getCommentsByCommentableId = jest.fn().mockResolvedValue(mockResult);

            const result = await commentService.getCommentsByCommentableId('someId');
            expect(result).toEqual(mockResult);
        });
    });

    describe('getCommentsByUserId', () => {
        test('should return comments by user ID', async () => {
            const mockResult = [mockComment];
            commentService.commentRepository.getCommentsByUserId = jest.fn().mockResolvedValue(mockResult);

            const result = await commentService.getCommentsByUserId('user123');
            expect(result).toEqual(mockResult);
        });
    });
});