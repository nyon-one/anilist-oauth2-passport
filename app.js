const express = require('express')
const passport = require('passport');
const app = express()

const cookieSession = require('cookie-session')
require('dotenv').config()

const passportSetup = require('./config/passport-setup');
const authRoutes = require('./routes/auth-routes');
const mongoose = require('mongoose')

app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_DB_URI, ()=>{
    console.log("connected to db")
})

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['koko']
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes);

app.get('/fav',(req, res)=>{
    console.log(req.user);
    
    res.send(req.user)
})

app.listen(5000, () => {
    console.log("listening on port 5000");
})