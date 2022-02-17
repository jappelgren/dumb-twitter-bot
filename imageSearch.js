const google = require('googlethis');
const fs = require('fs');
const axios = require('axios');
const searchTerm = require('./imageSearchTerms.js');

const saveImage = async (result, urlToQuery, fileExtension) => {
  const file = fs.createWriteStream(
    `./images/${Math.floor(Math.random() * 100000000)}${fileExtension}`
  );
  try {
    if (fileExtension !== 'undefined') {
      const response = await axios.get(result[urlToQuery].url, {
        responseType: 'stream',
      });
      await response.data.pipe(file);
    }
  } catch (error) {
    console.log(error.response);
  }
};

const search = async () => {
  let result = await google.image(searchTerm(), { safe: false });
  let urlToQuery;
  let fileExtension;
  let count = 0;

  while (fileExtension === undefined) {
    urlToQuery = Math.floor(Math.random() * result.length);
    fileExtension = await result[urlToQuery]?.url.slice(-4);
    count++;

    if (count === 10) {
      result = await google.image(searchTerm(), { safe: false });
      count = 0
    }
  }

  if (
    fileExtension?.charAt(0) === '.' ||
    fileExtension?.toLowerCase() === 'webp'
  ) {
    if (
      fileExtension?.toLowerCase() === '.gif' ||
      fileExtension?.toLowerCase() === '.png' ||
      fileExtension?.toLowerCase() === '.jpg' ||
      fileExtension?.toLowerCase() === '.jpeg'
    ) {
      await saveImage(result, urlToQuery, fileExtension);
      return;
    } else if (fileExtension?.toLowerCase() === 'webp') {
      fileExtension = '.jpg';
      await saveImage(result, urlToQuery, fileExtension);
      return;
    }
    console.log('Skipping');
  }
};

module.exports = search;
