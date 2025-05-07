const User = require('../models/user');
const CrudRepository = require('./crud-repository');


class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getByEmail(email) {
        return await User.findOne({ email });
    }
}

module.exports = UserRepository;