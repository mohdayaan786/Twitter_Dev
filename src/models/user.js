const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true });

userSchema.pre('save', function (next) {
    const user = this;
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(user.password, salt);
    user.password = encryptedPassword;
    next();
});

userSchema.methods.comparePassword = function (password) {
    const user = this;
    return bcrypt.compareSync(password, user.password);
}

userSchema.methods.generateJwtToken = function () {
    const user = this;
    return jwt.sign({ id: user._id, email: user.email }, 'twitter_secret', { expiresIn: '1h' });
}

const User = mongoose.model('User', userSchema);
module.exports = User;