const { TweetRepository, HashtagRepository } = require('../repository');

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data, file, userId) {
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g) || [];
        tags = tags.map(tag => tag.substring(1).toLowerCase());
        console.log("Extracted tags:", tags);

        // Set userId automatically if not provided in data
        if (!data.userId) {
            data.user = userId;
        }

        // Handle optional image
        if (file) {
            data.image = {
                data: file.buffer,
                contentType: file.mimetype
            };
        }

        const tweet = await this.tweetRepository.create(data);
        console.log("Created tweet:", tweet);

        const alreadyExists = await this.hashtagRepository.findByName(tags);
        const existingTagTitles = alreadyExists.map(tag => tag.title);

        const newTags = tags.filter(tag => !existingTagTitles.includes(tag));
        if (newTags.length > 0) {
            const response = await this.hashtagRepository.bulkCreate(
                newTags.map(tag => ({ title: tag, tweets: [tweet._id] }))
            );
            console.log("New hashtags created:", response);
        }

        for (const tag of alreadyExists) {
            tag.tweets.push(tweet._id);
            await tag.save();
        }

        return tweet;
    }


    async retweet(originalTweetId, userId, content = '') {
        const originalTweet = await this.tweetRepository.get(originalTweetId);
        if (!originalTweet) {
            throw new Error('Original tweet not found');
        }

        // Optional: Prevent duplicate simple retweets (not quote tweets)
        const isQuote = content.trim().length > 0;
        if (!isQuote) {
            const existing = await this.tweetRepository.findOne({
                user: userId,
                retweetOf: originalTweetId,
                content: ''
            });
            if (existing) {
                throw new Error('You have already retweeted this tweet.');
            }
        }

        const retweet = await this.tweetRepository.create({
            content, // empty or custom comment
            user: userId,
            retweetOf: originalTweetId
        });

        return retweet;
    }


    async getTweetById(id) {
        return await this.tweetRepository.getWithComments(id);
    }
}

module.exports = TweetService;
