const LikeService = require('../../src/services/like-service');
const { TweetRepository, LikeRepository } = require('../../src/repository');

jest.mock('../../src/repository');

describe('LikeService', () => {
    let likeService;
    let mockTweet;
    let mockLike;

    beforeEach(() => {
        TweetRepository.mockClear();
        LikeRepository.mockClear();

        likeService = new LikeService();

        mockTweet = {
            likes: {
                push: jest.fn(),
                pull: jest.fn(),
            },
            save: jest.fn(),
            populate: jest.fn().mockReturnThis(),
        };

        mockLike = { _id: 'like123' };
    });

    test('should add a like if it does not exist (Tweet)', async () => {
        likeService.tweetRepository.get.mockResolvedValue(mockTweet);
        likeService.likeRepository.getByUserAndLikeable.mockResolvedValue(null);
        likeService.likeRepository.create.mockResolvedValue(mockLike);

        const result = await likeService.toggleLike('tweet123', 'Tweet', 'user456');

        expect(likeService.tweetRepository.get).toHaveBeenCalledWith('tweet123');
        expect(mockTweet.populate).toHaveBeenCalledWith({ path: 'likes' });
        expect(likeService.likeRepository.getByUserAndLikeable).toHaveBeenCalledWith({
            user: 'user456',
            likeable: 'tweet123',
            onModel: 'Tweet',
        });
        expect(likeService.likeRepository.create).toHaveBeenCalled();
        expect(mockTweet.likes.push).toHaveBeenCalledWith(mockLike);
        expect(mockTweet.save).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    test('should remove a like if it exists (Tweet)', async () => {
        likeService.tweetRepository.get.mockResolvedValue(mockTweet);
        likeService.likeRepository.getByUserAndLikeable.mockResolvedValue(mockLike);
        likeService.likeRepository.delete.mockResolvedValue(true);

        const result = await likeService.toggleLike('tweet123', 'Tweet', 'user456');

        expect(likeService.likeRepository.getByUserAndLikeable).toHaveBeenCalledWith({
            user: 'user456',
            likeable: 'tweet123',
            onModel: 'Tweet',
        });
        expect(mockTweet.likes.pull).toHaveBeenCalledWith('like123');
        expect(mockTweet.save).toHaveBeenCalled();
        expect(likeService.likeRepository.delete).toHaveBeenCalledWith('like123');
        expect(result).toBe(false);
    });

    test('should handle Comment model type', async () => {
        const commentModel = { ...mockTweet }; // Reuse the same mock shape
        likeService.tweetRepository.getWithComments.mockResolvedValue(commentModel);
        likeService.likeRepository.getByUserAndLikeable.mockResolvedValue(null);
        likeService.likeRepository.create.mockResolvedValue(mockLike);

        const result = await likeService.toggleLike('comment123', 'Comment', 'user456');

        expect(likeService.tweetRepository.getWithComments).toHaveBeenCalledWith('comment123');
        expect(result).toBe(true);
    });

    test('should throw error on invalid model type', async () => {
        await expect(likeService.toggleLike('someId', 'InvalidType', 'userId')).rejects.toThrow('Invalid model type');
    });
});
