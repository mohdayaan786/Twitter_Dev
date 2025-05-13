const tweetControllerFactory = require('../../src/controllers/tweet-controller');

describe('TweetController', () => {
    let mockTweetService, controller, mockReq, mockRes;

    beforeEach(() => {
        mockTweetService = {
            create: jest.fn(),
            getTweetById: jest.fn()
        };
        controller = tweetControllerFactory(mockTweetService);

        mockReq = {
            body: { content: 'This is a test #tweet' },
            file: {
                buffer: Buffer.from('image-data'),
                mimetype: 'image/png'
            },
            query: { id: 'tweet123' }
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            set: jest.fn(),
            send: jest.fn()
        };
    });

    describe('create', () => {
        it('should create tweet and return 201', async () => {
            const mockTweet = { _id: 'abc123', content: mockReq.body.content };
            mockTweetService.create.mockResolvedValue(mockTweet);

            await controller.create(mockReq, mockRes);

            expect(mockTweetService.create).toHaveBeenCalledWith(mockReq.body, mockReq.file);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ data: mockTweet }));
        });

        it('should return 500 on error', async () => {
            mockTweetService.create.mockRejectedValue(new Error('Failure'));

            await controller.create(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(500);
            expect(mockRes.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        });
    });

    describe('getTweetById', () => {
        it('should fetch tweet by ID', async () => {
            const tweet = { _id: 'tweet123', content: 'hello' };
            mockTweetService.getTweetById.mockResolvedValue(tweet);

            await controller.getTweetById(mockReq, mockRes);

            expect(mockTweetService.getTweetById).toHaveBeenCalledWith('tweet123');
            expect(mockRes.status).toHaveBeenCalledWith(200);
        });
    });

    describe('getImage', () => {
        it('should send image if exists', async () => {
            const imageData = Buffer.from('img');
            const tweet = { image: { data: { buffer: imageData }, contentType: 'image/png' } };

            mockTweetService.getTweetById.mockResolvedValue(tweet);

            await controller.getImage(mockReq, mockRes);

            expect(mockRes.set).toHaveBeenCalledWith('Content-Type', 'image/png');
            expect(mockRes.send).toHaveBeenCalledWith(imageData);
        });

        it('should return 404 if no tweet or image', async () => {
            mockTweetService.getTweetById.mockResolvedValue(null);

            await controller.getImage(mockReq, mockRes);

            expect(mockRes.status).toHaveBeenCalledWith(404);
        });
    });
});
