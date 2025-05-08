const {UserRepository} = require('../repository');

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signUp(data) {
        return await this.userRepository.create(data);
    }

    async getUserByEmail(email) {
        return await this.userRepository.getByEmail({email: email});
    }
}

module.exports = UserService;