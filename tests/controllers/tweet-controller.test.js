const {
    create,
    getImage,
    getTweetById,
    tweetService
} = require('../../src/controllers/tweet-controller');

describe('TweetController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: { content: 'Test tweet' },
            file: { buffer: Buffer.from('image data') },
            query: { id: 'tweet123' }
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            set: jest.fn(),
            send: jest.fn()
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('create', () => {
        it('should return 201 on successful tweet creation', async () => {
            const mockTweet = { id: 'tweet123', content: 'Test tweet' };
            jest.spyOn(tweetService, 'create').mockResolvedValue(mockTweet);

            await create(req, res);

            expect(tweetService.create).toHaveBeenCalledWith(req.body, req.file);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Tweet created successfully",
                data: mockTweet,
                err: {}
            });
        });

        it('should return 500 on failure', async () => {
            jest.spyOn(tweetService, 'create').mockRejectedValue(new Error('Creation failed'));

            await create(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "Something went wrong!",
                data: {},
                err: "Creation failed"
            }));
        });
    });

    describe('getTweetById', () => {
        it('should return 200 with tweet data', async () => {
            const mockTweet = { id: 'tweet123', content: 'Tweet content' };
            jest.spyOn(tweetService, 'getTweetById').mockResolvedValue(mockTweet);

            await getTweetById(req, res);

            expect(tweetService.getTweetById).toHaveBeenCalledWith('tweet123');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                success: true,
                message: "Tweet fetched successfully",
                data: mockTweet,
                err: {}
            });
        });

        it('should return 500 on failure', async () => {
            jest.spyOn(tweetService, 'getTweetById').mockRejectedValue(new Error('Fetch failed'));

            await getTweetById(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "Something went wrong!",
                data: {},
                err: "Fetch failed"
            }));
        });
    });

    describe('getImage', () => {
        it('should return image buffer if image exists', async () => {
            const mockTweet = {
                id: 'tweet123',
                image: {
                    contentType: 'image/png',
                    data: { buffer: Buffer.from('image buffer') }
                }
            };
            jest.spyOn(tweetService, 'getTweetById').mockResolvedValue(mockTweet);

            await getImage(req, res);

            expect(res.set).toHaveBeenCalledWith('Content-Type', 'image/png');
            expect(res.send).toHaveBeenCalledWith(Buffer.from('image buffer'));
        });

        it('should return 404 if image is not found', async () => {
            const mockTweet = { id: 'tweet123', image: null };
            jest.spyOn(tweetService, 'getTweetById').mockResolvedValue(mockTweet);

            await getImage(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                success: false,
                message: "Image not found",
                data: {},
                err: {}
            });
        });

        it('should return 500 on error', async () => {
            jest.spyOn(tweetService, 'getTweetById').mockRejectedValue(new Error('Error retrieving image'));

            await getImage(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: "Something went wrong!",
                data: {},
                err: "Error retrieving image"
            }));
        });
    });
});
