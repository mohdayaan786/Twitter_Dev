const CommentRepository = require('../../src/repository/comment-repository');
const Comment = require('../../src/models/comments');

jest.mock('../../src/models/comments');

describe('CommentRepository', () => {
    let commentRepository;

    beforeEach(() => {
        commentRepository = new CommentRepository();
        jest.clearAllMocks();
    });

    describe('getCommentsByCommentableId', () => {
        it('should return comments for the given commentableId', async () => {
            const mockComments = [
                { _id: '1', content: 'Great post!', userId: { name: 'John', email: 'john@example.com' } }
            ];

            const populateMock = jest.fn().mockResolvedValue(mockComments);
            Comment.find.mockReturnValue({ populate: populateMock });

            const result = await commentRepository.getCommentsByCommentableId('123');

            expect(Comment.find).toHaveBeenCalledWith({ commentable: '123' });
            expect(populateMock).toHaveBeenCalledWith('userId', 'name email');
            expect(result).toEqual(mockComments);
        });

        it('should throw an error if query fails', async () => {
            Comment.find.mockImplementation(() => {
                throw new Error('DB Error');
            });

            await expect(commentRepository.getCommentsByCommentableId('123'))
                .rejects
                .toThrow('DB Error');
        });
    });

    describe('getCommentsByUserId', () => {
        it('should return comments for the given userId', async () => {
            const mockComments = [
                { _id: '2', content: 'Nice article!', userId: { name: 'Alice', email: 'alice@example.com' } }
            ];

            const populateMock = jest.fn().mockResolvedValue(mockComments);
            Comment.find.mockReturnValue({ populate: populateMock });

            const result = await commentRepository.getCommentsByUserId('user123');

            expect(Comment.find).toHaveBeenCalledWith({ userId: 'user123' });
            expect(populateMock).toHaveBeenCalledWith('userId', 'name email');
            expect(result).toEqual(mockComments);
        });

        it('should throw an error if query fails', async () => {
            Comment.find.mockImplementation(() => {
                throw new Error('DB Error');
            });

            await expect(commentRepository.getCommentsByUserId('user123'))
                .rejects
                .toThrow('DB Error');
        });
    });
});
