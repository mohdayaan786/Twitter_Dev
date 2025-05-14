const { createComm, commentService } = require('../../src/controllers/comment-controller');

describe('CommentController - createComm', () => {
    let req, res;

    beforeEach(() => {
        req = {
            query: {
                modelId: 'model123',
                modelType: 'Tweet'
            },
            user: {
                id: 'user123'
            },
            body: {
                content: 'This is a test comment.'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should return 200 and success response when comment is created', async () => {
        const mockComment = { id: 'comment123', content: 'This is a test comment.' };
        jest.spyOn(commentService, 'createComment').mockResolvedValue(mockComment);

        await createComm(req, res);

        expect(commentService.createComment).toHaveBeenCalledWith('model123', 'Tweet', 'user123', 'This is a test comment.');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            data: mockComment,
            success: true,
            message: 'Comment created successfully',
            err: {}
        });
    });

    test('should return 500 and error response on failure', async () => {
        jest.spyOn(commentService, 'createComment').mockRejectedValue(new Error('Database error'));

        await createComm(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            data: {},
            success: false,
            message: 'Error in creating comment',
            err: expect.any(Error)
        });
    });
});
