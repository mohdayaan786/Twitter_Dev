const {TweetRepository, HashtagRepository} = require('../repository');

class TweetService {
    constructor() {
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }

    async create(data) {
        const content = data.content;
        let tags = content.match(/#[a-zA-Z0-9_]+/g) || [];
        tags =  tags.map(tag => tag.substring(1));
        console.log(tags);
        const tweet = await this.tweetRepository.create(data);
        let alreadyExists = await this.hashtagRepository.findByName(tags);
        const existingTagTitles = alreadyExists.map(tag => tag.title);
        const newTags = tags.filter(tag => !existingTagTitles.includes(tag));
        const response = await this.hashtagRepository.bulkCreate(newTags.map(tag => ({ title: tag, tweets: [tweet._id] })));
        console.log(response);
        alreadyExists.forEach((tag) => { 
            tag.tweets.push(tweet._id);
            tag.save();
        });
        return tweet;
    }
}

module.exports = TweetService;