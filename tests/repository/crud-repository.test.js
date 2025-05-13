const CrudRepository = require('../../src/repository/crud-repository');

describe('CrudRepository', () => {
    let mockModel;
    let repository;

    beforeEach(() => {
        mockModel = {
            create: jest.fn(),
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndDelete: jest.fn()
        };
        repository = new CrudRepository(mockModel);
    });

    test('should create a document', async () => {
        const data = { name: 'Test' };
        const createdDoc = { _id: 'abc123', ...data };
        mockModel.create.mockResolvedValue(createdDoc);

        const result = await repository.create(data);

        expect(mockModel.create).toHaveBeenCalledWith(data);
        expect(result).toEqual(createdDoc);
    });

    test('should get all documents', async () => {
        const docs = [{ name: 'Doc1' }, { name: 'Doc2' }];
        mockModel.find.mockResolvedValue(docs);

        const result = await repository.getAll();

        expect(mockModel.find).toHaveBeenCalled();
        expect(result).toEqual(docs);
    });

    test('should get a document by ID', async () => {
        const doc = { _id: 'abc123', name: 'Doc' };
        mockModel.findById.mockResolvedValue(doc);

        const result = await repository.get('abc123');

        expect(mockModel.findById).toHaveBeenCalledWith('abc123');
        expect(result).toEqual(doc);
    });

    test('should update a document by ID', async () => {
        const updatedDoc = { _id: 'abc123', name: 'Updated Doc' };
        mockModel.findByIdAndUpdate.mockResolvedValue(updatedDoc);

        const result = await repository.update('abc123', { name: 'Updated Doc' });

        expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('abc123', { name: 'Updated Doc' }, { new: true });
        expect(result).toEqual(updatedDoc);
    });

    test('should delete a document by ID', async () => {
        const deletedDoc = { _id: 'abc123', name: 'Deleted Doc' };
        mockModel.findByIdAndDelete.mockResolvedValue(deletedDoc);

        const result = await repository.delete('abc123');

        expect(mockModel.findByIdAndDelete).toHaveBeenCalledWith('abc123');
        expect(result).toEqual(deletedDoc);
    });
});
