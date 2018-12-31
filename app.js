const express = require('express')
const passport = require('passport');
const app = express()

const cookieSession = require('cookie-session')
const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');

app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['koko']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/auth', authRoutes);

app.get('/fav',(req, res)=>{
    console.log(req.user);
    
    res.send(req.user)
})

app.listen(5000, () => {
    console.log("listening on port 5000");
})