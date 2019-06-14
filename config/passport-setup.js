require('dotenv').config()

const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2')

// const keys = require('./keys')

console.log(process.env.CLIENT_ID)


passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})

const graphApi = require('./api')

passport.use(new OAuth2Strategy({
        authorizationURL: 'https://anilist.co/api/v2/oauth/authorize',
        tokenURL: 'https://anilist.co/api/v2/oauth/token',
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/callback'
    },
    (accessToken, refreshToken, profile, done) => {
        console.log('============')
        console.log(accessToken)
        console.log('============')
        graphApi(accessToken).post('', {
                query: 'query{Viewer{id, name, avatar{large}}}'
            })
            .then(r => {
                const user = r.data.data.Viewer;
                user.accessToken = accessToken

                done(null, user)
            })
        // .catch(r => console.log(r.data))

        // return cb(null, {
        //     user: 1
        // });
        // User.findOrCreate({
        //     exampleId: profile.id
        // }, function (err, user) {
        //     return cb(err, user);
        // });
    }
));