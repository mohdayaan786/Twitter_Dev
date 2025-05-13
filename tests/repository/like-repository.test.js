const LikeRepository = require('../../src/repository/like-repository');
const Like = require('../../src/models/like');

// Mock the Like model
jest.mock('../../src/models/like');

describe('LikeRepository', () => {
    let likeRepository;

    beforeEach(() => {
        likeRepository = new LikeRepository();
        jest.clearAllMocks();
    });

    test('should create a like', async () => {
        const data = { user: 'user123', likeableId: 'tweet123', onModel: 'Tweet' };
        const createdLike = { _id: 'like123', ...data };

        Like.create.mockResolvedValue(createdLike);

        const result = await likeRepository.create(data);

        expect(Like.create).toHaveBeenCalledWith(data);
        expect(result).toEqual(createdLike);
    });

    test('should get all likes with pagination', async () => {
        const likes = [{ _id: '1' }, { _id: '2' }];
        const mockFind = {
            skip: jest.fn().mockReturnThis(),
            limit: jest.fn().mockResolvedValue(likes),
        };

        Like.find.mockReturnValue(mockFind);

        const result = await likeRepository.getAll(0, 2);

        expect(Like.find).toHaveBeenCalled();
        expect(mockFind.skip).toHaveBeenCalledWith(0);
        expect(mockFind.limit).toHaveBeenCalledWith(2);
        expect(result).toEqual(likes);
    });

    test('should get like by user and likeable', async () => {
        const data = { user: 'user123', likeableId: 'tweet123', onModel: 'Tweet' };
        const like = { _id: 'like123', ...data };

        Like.findOne.mockResolvedValue(like);

        const result = await likeRepository.getByUserAndLikeable(data);

        expect(Like.findOne).toHaveBeenCalledWith(data);
        expect(result).toEqual(like);
    });
});
