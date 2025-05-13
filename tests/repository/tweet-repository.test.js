const TweetRepository = require('../../src/repository/tweet-repository');
const Tweet = require('../../src/models/tweet');

jest.mock('../../src/models/tweet');

describe('TweetRepository', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create a tweet', async () => {
        const data = { content: 'Hello World' };
        const spy = jest.spyOn(Tweet, 'create').mockImplementation(() => {
            return { ...data, createdAt: new Date(), updatedAt: new Date() };
        })
        const tweetRepository = new TweetRepository();
        const tweet = await tweetRepository.create(data);

        expect(spy).toHaveBeenCalledWith(data);
        expect(tweet.content).toBe(data.content);
    });

    test('should get a tweet with comments', async () => {
        const tweetId = '12345';
        const tweetData = {
            _id: tweetId,
            content: 'Hello World',
            comments: [{ _id: '67890', text: 'Nice!' }],
        };

        const spy = jest.spyOn(Tweet, 'findById').mockImplementation(() => {
            return {
                populate: jest.fn().mockReturnValue({
                    lean: jest.fn().mockResolvedValue(tweetData),
                }),
            };
        });

        const tweetRepository = new TweetRepository();
        const tweet = await tweetRepository.getWithComments(tweetId);

        expect(spy).toHaveBeenCalledWith(tweetId);
        expect(tweet).toEqual(tweetData);
    });

    test('should get all tweets with pagination', async () => {
        const offset = 0;
        const limit = 10;
        const tweetData = [
            { _id: '12345', content: 'Hello World' },
            { _id: '67890', content: 'Goodbye World' },
        ];

        const spy = jest.spyOn(Tweet, 'find').mockImplementation(() => {
            return {
                skip: jest.fn().mockReturnValue({
                    limit: jest.fn().mockResolvedValue(tweetData),
                }),
            };
        });

        const tweetRepository = new TweetRepository();
        const tweets = await tweetRepository.getAll(offset, limit);

        expect(spy).toHaveBeenCalled();
        expect(tweets).toEqual(tweetData);
    });

    // 🔴 Grouped Negative Tests
    describe('Negative Cases', () => {
        beforeAll(() => {
            jest.spyOn(console, 'error').mockImplementation(() => { }); // silence console.error
        });

        afterAll(() => {
            console.error.mockRestore();
        });
        test('should throw error if create fails', async () => {
            const data = { content: 'Hello World' };
            jest.spyOn(Tweet, 'create').mockRejectedValue(new Error('DB Error'));

            const tweetRepository = new TweetRepository();

            await expect(tweetRepository.create(data)).rejects.toThrow('DB Error');
        });

        test('should return null if tweet with comments not found', async () => {
            const leanMock = jest.fn().mockResolvedValue(null);
            const populateMock = jest.fn().mockReturnValue({ lean: leanMock });

            jest.spyOn(Tweet, 'findById').mockReturnValue({ populate: populateMock });

            const tweetRepository = new TweetRepository();
            const tweet = await tweetRepository.getWithComments('non-existent-id');

            expect(tweet).toBeNull();
        });

        test('should throw error if getAll fails', async () => {
            const limitMock = jest.fn().mockRejectedValue(new Error('DB Error'));
            const skipMock = jest.fn().mockReturnValue({ limit: limitMock });

            jest.spyOn(Tweet, 'find').mockReturnValue({ skip: skipMock });

            const tweetRepository = new TweetRepository();

            await expect(tweetRepository.getAll(0, 10)).rejects.toThrow('DB Error');
        });
    });

    // 🔴 Grouped Edge Cases
    describe('Edge Cases', () => {
        test('should return null if null id is provided to getWithComments', async () => {
            const tweetRepository = new TweetRepository();
            const tweet = await tweetRepository.getWithComments(null);
            expect(tweet).toBeNull();
        });

    })
});


// This test suite covers the TweetRepository class, which interacts with the Tweet model.
// It includes tests for creating a tweet, getting a tweet with comments, and getting all tweets with pagination.