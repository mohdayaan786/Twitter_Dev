const express = require('express');
const connect = require('./config/database');
const app = express();
const TweetRepository = require('./repository/tweet-repository');
const Comment = require('./models/comments');

const PORT = 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log('Connected to MongoDB');
  const tweetRepository = new TweetRepository();
  const tweet = await tweetRepository.getWithComments('67f802e6b958e1c658c6c4df');
  console.log(tweet);
});