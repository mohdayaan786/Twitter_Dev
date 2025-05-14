const { signUp, signIn, userService } = require('../../src/controllers/auth-controller');

describe('AuthController', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'securepassword'
            },
            query: {},
            user: { id: 'user123' }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => jest.clearAllMocks());

    describe('signUp', () => {
        it('should return 201 and user data on successful signup', async () => {
            const mockUser = { id: '1', name: 'John Doe', email: 'john@example.com' };
            jest.spyOn(userService, 'signUp').mockResolvedValue(mockUser);

            await signUp(req, res);

            expect(userService.signUp).toHaveBeenCalledWith({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'securepassword'
            });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: mockUser,
                success: true
            }));
        });

        it('should return 500 on server error during signup', async () => {
            jest.spyOn(userService, 'signUp').mockRejectedValue(new Error('Database error'));

            await signUp(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Error in creating user'
            }));
        });
    });

    describe('signIn', () => {
        it('should return 200 and JWT token on successful login', async () => {
            const mockUser = {
                id: '1',
                email: 'john@example.com',
                comparePassword: jest.fn().mockReturnValue(true),
                generateJwtToken: jest.fn().mockReturnValue('mocked-jwt-token')
            };
            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockUser);

            req.body.email = 'john@example.com';
            req.body.password = 'securepassword';

            await signIn(req, res);

            expect(userService.getUserByEmail).toHaveBeenCalledWith('john@example.com');
            expect(mockUser.comparePassword).toHaveBeenCalledWith('securepassword');
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                data: 'mocked-jwt-token',
                success: true
            }));
        });

        it('should return 404 if user is not found during sign in', async () => {
            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);

            req.body.email = 'unknown@example.com';

            await signIn(req, res);

            expect(userService.getUserByEmail).toHaveBeenCalledWith('unknown@example.com');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'User not found',
                success: false
            }));
        });

        it('should return 401 if password is incorrect', async () => {
            const mockUser = {
                id: '1',
                email: 'john@example.com',
                comparePassword: jest.fn().mockReturnValue(false),
                generateJwtToken: jest.fn()
            };
            jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(mockUser);

            req.body.email = 'john@example.com';
            req.body.password = 'wrongpassword';

            await signIn(req, res);

            expect(userService.getUserByEmail).toHaveBeenCalledWith('john@example.com');
            expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongpassword');
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                message: 'Invalid password',
                success: false
            }));
        });

        it('should return 500 on sign in failure', async () => {
            jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(new Error('Database error'));

            await signIn(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                success: false,
                message: 'Error in signing in user'
            }));
        });
    });
});