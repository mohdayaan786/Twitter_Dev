const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true,
        max : [256, 'Content is too long'],
    },
    likes:[
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
}, {
    timestamps: true,
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;