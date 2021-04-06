const Express = require('express');
const app = Express();
const PORT = 5000;
const Twit = require('twit');
const cron = require('node-cron');
require('dotenv').config();

const consumer_key = process.env.API_KEY;
const consumer_secret = process.env.API_SECRET_KEY;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

const T = new Twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

T.post(
  'statuses/update',
  { status: 'hello world!' },
  function (err, data, response) {
    console.log(data);
  }
);

// cron.schedule(' 0-59 * * * * *', () => {
//   console.log('hi');
// });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
