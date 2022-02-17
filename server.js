const Express = require('express');
const app = Express();

const Twit = require('twit');
const cron = require('node-cron');
const fs = require('fs');
require('dotenv').config();

const PORT = 5000;

const search = require('./imageSearch');

const consumer_key = process.env.API_KEY;
const consumer_secret = process.env.API_SECRET_KEY;
const access_token = process.env.ACCESS_TOKEN;
const access_token_secret = process.env.ACCESS_TOKEN_SECRET;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const T = new Twit({
  consumer_key: consumer_key,
  consumer_secret: consumer_secret,
  access_token: access_token,
  access_token_secret: access_token_secret,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

let image = fs.readdirSync('./images');

async function postTweet() {
  const words = require('./tweetWords.js');

  const randomImageIndex = Math.floor(Math.random() * (image.length - 0) + 0);
  const randomWordsIndex = Math.floor(Math.random() * (words.length - 0) + 0);

  if (image.length > 0) {
    T.post(
      'media/upload',
      {
        media_data: fs.readFileSync(`images/${image[randomImageIndex]}`, {
          encoding: 'base64',
        }),
      },
      async (err, data, response) => {
        const mediaIdStr = data.media_id_string;
        const altText =
          'An item which if you viewed it you would look at someone and say "if you know, you know", or this item makes whatever I am experiencing right now "hit different"';
        const meta_params = {
          media_id: mediaIdStr,
          alt_text: { text: altText },
        };

        await T.post(
          'media/metadata/create',
          meta_params,
          async (err, data, response) => {
            if (!err) {
              const params = {
                status: `${words[randomWordsIndex]}`,
                media_ids: [mediaIdStr],
              };

              T.post('statuses/update', params, async (err, data, response) => {
                fs.unlink(`images/${image[randomImageIndex]}`, (err) => {
                  image = fs.readdirSync('./images');
                  if (err) {
                    console.error(err);
                    return;
                  }
                });
              });
            }
          }
        );
      }
    );
  } else {
    console.log('No images in database');
    client.messages
      .create({
        body: 'Your dumb Twitter joke bot is out of images!  Add some to keep that funny joke going!',
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.ADMIN_PHONE_NUMBER,
      })
      .then((message) => console.log(message.sid));
  }
}

cron.schedule('0 7,19 * * *', async () => {
  postTweet();
});

cron.schedule('0 1,3,5,7,9,11,13,15,17,19,21,23 * * *', async () => {
  if (image.length < 365) {
      search();
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
