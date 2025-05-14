const UserService = require('../../src/services/user-service');
const { UserRepository } = require('../../src/repository');

jest.mock('../../src/repository');

describe('UserService', () => {
    let userService;
    let mockUserData;

    beforeEach(() => {
        UserRepository.mockClear();
        userService = new UserService();

        mockUserData = {
            name: 'John Doe',
            email: 'john@example.com',
            password: 'hashedpassword123'
        };
    });

    test('should create a new user (signUp)', async () => {
        userService.userRepository.create = jest.fn().mockResolvedValue(mockUserData);

        const result = await userService.signUp(mockUserData);

        expect(userService.userRepository.create).toHaveBeenCalledWith(mockUserData);
        expect(result).toEqual(mockUserData);
    });

    test('should get user by email', async () => {
        userService.userRepository.getByEmail = jest.fn().mockResolvedValue(mockUserData);

        const result = await userService.getUserByEmail('john@example.com');

        expect(userService.userRepository.getByEmail).toHaveBeenCalledWith({ email: 'john@example.com' });
        expect(result).toEqual(mockUserData);
    });
});
