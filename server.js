const Express = require('express');
const app = Express();
const PORT = 5000;
const Twit = require('twit');
const cron = require('node-cron');
const fs = require('fs');
require('dotenv').config();

const pool = require('./modules/pool.js');

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

const imageTest = fs.readFileSync('images/gorilly.jpg', { encoding: 'base64' });

cron.schedule(' 1-59 * * * * *', async () => {
  const image = await pool.query('SELECT * FROM images;');
  const words = await pool.query('SELECT * FROM words;');

  const randomImageIndex = Math.floor(Math.random() * (image.rows.length - 0) + 0)
  const randomWordsIndex = Math.floor(Math.random() * (words.rows.length - 0) + 0)

  await console.log(image.rows[randomImageIndex], words.rows[randomWordsIndex]);

  // T.post('media/upload', { media_data: imageTest }, function (err, data, response) {

  //     const mediaIdStr = data.media_id_string
  //     const altText = "A powerful gorilly making a gd face."
  //     const meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

  //     T.post('media/metadata/create', meta_params, function (err, data, response) {
  //       if (!err) {

  //         const params = { status: 'Wow, what a gorilly.', media_ids: [mediaIdStr] }

  //         T.post('statuses/update', params, function (err, data, response) {
  //           console.log(data)
  //         })
  //       }
  //     })
  //   })
  
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
