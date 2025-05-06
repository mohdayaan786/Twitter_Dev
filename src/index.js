const express = require('express');
const connect = require('./config/database');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const ApiRoutes = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', ApiRoutes);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connect();
  console.log('Connected to MongoDB');
});