const mongoose = require('mongoose');
const { Schema } = mongoose;
const comment = require('./comments');

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    userEmail: {
        type: String
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ]
}, {
    timestamps: true,
});

tweetSchema.virtual('contentWithEmail').get(function process() {
    return `${this.content} \nCreated by: ${this.userEmail}`;
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;