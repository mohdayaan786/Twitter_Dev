const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema({
    content: {
        type: String,
        required: function () {
            return !this.retweetOf; // content is required unless it's a pure retweet
        },
        max: [256, 'Content is too long']
    },

    image: {
        data: Buffer,
        contentType: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like',
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment',
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    retweetOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        default: null,
    }
}, {
    timestamps: true,
});


const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
