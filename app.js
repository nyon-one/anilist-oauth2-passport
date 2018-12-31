const express = require('express')
const passport = require('passport');
const app = express()

const cookieSession = require('cookie-session')
const passportSetup = require('./config/passport-setup');

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['koko']
}))

app.use(passport.initialize())
app.use(passport.session())


app.get('/anilist/callback', passport.authenticate('oauth2'), (req, res) => {
    res.send(req.user)
})

// app.get('/auth/anilist/',
app.get('/', passport.authenticate('oauth2'))

app.listen(5000, () => {
    console.log("listening on port 5000");
})