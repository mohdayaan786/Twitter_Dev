const { toggleLike, likeService } = require('../../src/controllers/like-controller');

describe('LikeController - toggleLike', () => {
    let req, res;

    beforeEach(() => {
        req = {
            query: {
                modelId: 'model123',
                modelType: 'Tweet',
            },
            user: {
                id: 'user123'
            }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    test('should return 200 and success response when like toggled successfully', async () => {
        jest.spyOn(likeService, 'toggleLike').mockResolvedValue(true);

        await toggleLike(req, res);

        expect(likeService.toggleLike).toHaveBeenCalledWith('model123', 'Tweet', 'user123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            data: true,
            message: 'Like toggled successfully',
            error: {}
        });
    });

    test('should return 500 and error message on failure', async () => {
        jest.spyOn(likeService, 'toggleLike').mockRejectedValue(new Error('Something went wrong'));

        await toggleLike(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Internal server error',
            error: 'Something went wrong',
            success: false
        });
    });
});