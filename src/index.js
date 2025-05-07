const express = require('express');
const connect = require('./config/database');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const ApiRoutes = require('./routes/index');
const {UserRepository} = require('./repository/index');
const LikeService = require('./services/like-service');
const {TweetRepository} = require('./repository/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', ApiRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log('Connected to MongoDB');

  const userRepository = new UserRepository();
  const tweetRepository = new TweetRepository();

  const tweets = await tweetRepository.getAll(0, 10);

  // const response = await userRepository.create({
  //   email : 'mohdamaan0@gmail.com',
  //   password : '12345678',
  //   name : 'Mohd Arhaan'
  // })
  // console.log(response);

  const likeService = new LikeService();
  likeService.toggleLike(tweets[1]._id, 'Tweet', '681b19b1404427a1e8cb58cf');   
});