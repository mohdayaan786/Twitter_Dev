const User = require('../models/user');
const CrudRepository = require('./crud-repository');


class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getByEmail(data) {
        return await User.findOne(data);
    }
}

module.exports = UserRepository;