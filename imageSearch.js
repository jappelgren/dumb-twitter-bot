const google = require('googlethis');
const fs = require('fs');
const axios = require('axios')
const searchTerm = require('./imageSearchTerms.js')

const search = async () => {
    const result = await google.image(searchTerm(), { safe: false });
    const urlToQuery = Math.floor(Math.random() * result.length)
    let fileExtension = await result[urlToQuery]?.url.slice(-4)

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
const searchLoop = async () => {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    // if (image.length < 1000) {
        for (let i = 0; i < 10; i++) {
            search()
            await timer(5000)
        }
    // }
}

searchLoop()

module.exports = search