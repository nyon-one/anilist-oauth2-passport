const OAuth2Strategy = require('passport-oauth2')

module.exports = (callback)=>{
    return new OAuth2Strategy({
    authorizationURL: 'https://anilist.co/api/v2/oauth/authorize',
    tokenURL: 'https://anilist.co/api/v2/oauth/token',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.REDIRECT_URI
}, callback)
}