const google = require('googlethis');
const fs = require('fs');
const axios = require('axios')
const searchTerm = require('./imageSearchTerms.js')

const search = async () => {
    const result = await google.image(searchTerm(), { safe: false });
    const urlToQuery = Math.floor(Math.random() * result.length)
    let fileExtension = result[urlToQuery].url.slice(-4)

    console.log(fileExtension)
    if (fileExtension !== '.gif' && fileExtension !== '.png') {
        fileExtension = '.jpg'
    }

    const file = fs.createWriteStream(`./images/${Math.floor(Math.random() * 100000000)}${fileExtension}`);
    try {
        const response = await axios.get(
            result[urlToQuery].url,
            { responseType: 'stream' }
        );
        await response.data.pipe(file);
    } catch (error) {
        console.log(error)
    }


}

search();