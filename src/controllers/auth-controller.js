const {UserService} = require('../services');
const userService = new UserService();


const signUp = async (req, res) => {
    try {
        const user = await userService.signUp({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(201).json({
            data: user,
            success: true,
            message: 'User created successfully',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Error in creating user',
            err: error
        });
    }
}

const signIn = async (req, res) => {
    try {
        const user = await userService.getUserByEmail(req.body.email);
        if (!user) {
            return res.status(404).json({
                data: {},
                success: false,
                message: 'User not found',
                err: {}
            });
        }
        if (!user.comparePassword(req.body.password)) {
            return res.status(401).json({
                data: {},
                success: false,
                message: 'Invalid password',
                err: {}
            });
        }
        const token = user.generateJwtToken();
        return res.status(200).json({
            data: token,
            success: true,
            message: 'User signed in successfully',
            err: {}
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            data: {},
            success: false,
            message: 'Error in signing in user',
            err: error
        });
    }
}

module.exports = {
    signUp,
    signIn
}