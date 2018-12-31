const router = require('express').Router();
const passport = require('passport');

// auth with anilist
router.get('/connect',passport.authenticate('oauth2'))

// callback route for anilist to redirect to
router.get('/callback', passport.authenticate('oauth2'), (req, res) => {
    res.redirect('/fav');
});

module.exports = router;