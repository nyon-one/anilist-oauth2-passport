const axios = require('axios')
module.exports = token => axios.create({
    baseURL: 'https://graphql.anilist.co/',
    // timeout: 1000,
    headers: {
        'Authorization': 'Bearer ' + token
    }
});