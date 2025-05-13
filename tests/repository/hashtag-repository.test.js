const Hashtag = require('../../src/models/hashtags');
const HashtagRepository = require('../../src/repository/hashtag-repository');

jest.mock('../../src/models/hashtags');

describe('HashtagRepository', () => {
    let hashtagRepository;

    beforeEach(() => {
        hashtagRepository = new HashtagRepository();
        jest.clearAllMocks();
    });

    test('should create a hashtag', async () => {
        const data = { title: '#NodeJS' };
        const mockResult = { _id: '123', ...data };
        Hashtag.create.mockResolvedValue(mockResult);

        const result = await hashtagRepository.create(data);
        expect(result).toEqual(mockResult);
        expect(Hashtag.create).toHaveBeenCalledWith(data);
    });

    test('should get hashtag by ID', async () => {
        const mockResult = { _id: '123', title: '#JS' };
        Hashtag.findById.mockResolvedValue(mockResult);

        const result = await hashtagRepository.get('123');
        expect(result).toEqual(mockResult);
        expect(Hashtag.findById).toHaveBeenCalledWith('123');
    });

    test('should bulk create hashtags', async () => {
        const data = [{ title: '#js' }, { title: '#node' }];
        const mockResult = [{ _id: '1', title: '#js' }, { _id: '2', title: '#node' }];
        Hashtag.insertMany.mockResolvedValue(mockResult);

        const result = await hashtagRepository.bulkCreate(data);
        expect(result).toEqual(mockResult);
        expect(Hashtag.insertMany).toHaveBeenCalledWith(data);
    });

    test('should get hashtag with comments', async () => {
        const populateMock = jest.fn().mockReturnThis();
        const leanMock = jest.fn().mockResolvedValue({ _id: '123', title: '#code', comments: [] });

        Hashtag.findById.mockReturnValue({ populate: populateMock, lean: leanMock });

        const result = await hashtagRepository.getWithComments('123');
        expect(result).toEqual({ _id: '123', title: '#code', comments: [] });
        expect(Hashtag.findById).toHaveBeenCalledWith('123');
    });

    test('should update hashtag', async () => {
        const data = { title: '#updated' };
        const mockResult = { _id: '123', title: '#updated' };
        Hashtag.findByIdAndUpdate.mockResolvedValue(mockResult);

        const result = await hashtagRepository.update('123', data);
        expect(result).toEqual(mockResult);
        expect(Hashtag.findByIdAndUpdate).toHaveBeenCalledWith('123', data, { new: true });
    });

    test('should delete hashtag', async () => {
        const mockResult = { _id: '123', title: '#delete' };
        Hashtag.findByIdAndDelete.mockResolvedValue(mockResult);

        const result = await hashtagRepository.delete('123');
        expect(result).toEqual(mockResult);
        expect(Hashtag.findByIdAndDelete).toHaveBeenCalledWith('123');
    });

    test('should get all hashtags with pagination', async () => {
        const mockResult = [{ _id: '1' }, { _id: '2' }];
        const skipMock = jest.fn().mockReturnThis();
        const limitMock = jest.fn().mockResolvedValue(mockResult);

        Hashtag.find.mockReturnValue({ skip: skipMock, limit: limitMock });

        const result = await hashtagRepository.getAll(0, 2);
        expect(result).toEqual(mockResult);
        expect(Hashtag.find).toHaveBeenCalled();
        expect(skipMock).toHaveBeenCalledWith(0);
        expect(limitMock).toHaveBeenCalledWith(2);
    });

    test('should find hashtags by title list', async () => {
        const titles = ['#code', '#learn'];
        const mockResult = [{ title: '#code' }, { title: '#learn' }];
        Hashtag.find.mockResolvedValue(mockResult);

        const result = await hashtagRepository.findByName(titles);
        expect(result).toEqual(mockResult);
        expect(Hashtag.find).toHaveBeenCalledWith({ title: titles });
    });
});
