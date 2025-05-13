const UserRepository = require('../../src/repository/user-repository');
const User = require('../../src/models/user');

jest.mock('../../src/models/user'); // Mock the User model

describe('UserRepository', () => {
    let userRepository;

    beforeEach(() => {
        userRepository = new UserRepository();
        jest.clearAllMocks();
    });

    describe('getByEmail', () => {
        it('should return a user by email', async () => {
            const mockUser = { _id: '1', email: 'test@example.com' };
            User.findOne.mockResolvedValue(mockUser);

            const result = await userRepository.getByEmail({ email: 'test@example.com' });

            expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
            expect(result).toEqual(mockUser);
        });

        it('should return null if user is not found', async () => {
            User.findOne.mockResolvedValue(null);

            const result = await userRepository.getByEmail({ email: 'notfound@example.com' });

            expect(User.findOne).toHaveBeenCalledWith({ email: 'notfound@example.com' });
            expect(result).toBeNull();
        });
    });
});
