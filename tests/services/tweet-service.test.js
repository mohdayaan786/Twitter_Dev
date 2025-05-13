const TweetService = require('../../src/services/tweet-service');
const { TweetRepository, HashtagRepository } = require('../../src/repository');

jest.mock('../../src/repository');

describe('TweetService', () => {
    let tweetService;

    beforeEach(() => {
        TweetRepository.mockClear();
        HashtagRepository.mockClear();

        tweetService = new TweetService();
    });

    describe('create', () => {
        test('should create tweet and handle hashtags correctly', async () => {
            const data = { content: 'This is a #Test #Tweet' };
            const mockTweet = { _id: 'tweet123', content: data.content };

            const mockHashtags = [
                { title: 'test', tweets: ['oldTweetId'], save: jest.fn() }
            ];

            const newTagsToCreate = [{ title: 'tweet', tweets: ['tweet123'] }];

            tweetService.tweetRepository.create.mockResolvedValue(mockTweet);
            tweetService.hashtagRepository.findByName.mockResolvedValue(mockHashtags);
            tweetService.hashtagRepository.bulkCreate.mockResolvedValue(newTagsToCreate);

            const result = await tweetService.create(data);

            expect(tweetService.tweetRepository.create).toHaveBeenCalledWith(data);
            expect(tweetService.hashtagRepository.findByName).toHaveBeenCalledWith(['test', 'tweet']);
            expect(tweetService.hashtagRepository.bulkCreate).toHaveBeenCalledWith(newTagsToCreate);
            expect(mockHashtags[0].tweets).toContain('tweet123');
            expect(mockHashtags[0].save).toHaveBeenCalled();
            expect(result).toEqual(mockTweet);
        });

        test('should handle tweet creation with no hashtags', async () => {
            const data = { content: 'Hello world!' };
            const mockTweet = { _id: 'tweet456', content: data.content };

            tweetService.tweetRepository.create.mockResolvedValue(mockTweet);
            tweetService.hashtagRepository.findByName.mockResolvedValue([]);

            const result = await tweetService.create(data);

            expect(tweetService.hashtagRepository.findByName).toHaveBeenCalledWith([]);
            expect(tweetService.hashtagRepository.bulkCreate).not.toHaveBeenCalled();
            expect(result).toEqual(mockTweet);
        });

        test('should attach image data if file is provided', async () => {
            const data = { content: 'Image test #photo' };
            const file = {
                buffer: Buffer.from('dummy-image-data'),
                mimetype: 'image/png'
            };

            const mockTweet = { _id: 'img123', content: data.content };
            tweetService.tweetRepository.create.mockResolvedValue(mockTweet);
            tweetService.hashtagRepository.findByName.mockResolvedValue([]);

            const result = await tweetService.create(data, file);

            expect(data.image).toBeDefined();
            expect(data.image.contentType).toBe('image/png');
            expect(tweetService.tweetRepository.create).toHaveBeenCalledWith(data);
            expect(result).toEqual(mockTweet);
        });
    });

    describe('getTweetById', () => {
        test('should return tweet with comments by ID', async () => {
            const tweetId = 'abc123';
            const tweetWithComments = {
                _id: tweetId,
                content: 'Test tweet',
                comments: [{ text: 'Nice!' }]
            };

            tweetService.tweetRepository.getWithComments.mockResolvedValue(tweetWithComments);

            const result = await tweetService.getTweetById(tweetId);

            expect(tweetService.tweetRepository.getWithComments).toHaveBeenCalledWith(tweetId);
            expect(result).toEqual(tweetWithComments);
        });
    });
});
