const express = require('express');
const connect = require('./config/database');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();
const infoPage = require('./config/info');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const ApiRoutes = require('./routes/index');
const { passportAuth } = require('./middlewares/jwt-middlewares');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
passportAuth(passport);

app.use('/',infoPage);

app.use('/api', ApiRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log('Connected to MongoDB');
});