require('dotenv').config()

const passport = require('passport')
const AnilistStrategy = require('./anilist-strategy')
const User = require('../models/user-model')

console.log(AnilistStrategy)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((id, done) => {
    done(null, id)
})

const graphApi = require('./api')

passport.use(AnilistStrategy(async (accessToken, refreshToken, profile, done) => {
        // console.log('============')
        // console.log(accessToken)
        // console.log('============')
        const userData = await graphApi(accessToken).post('', {
            query: 'query{Viewer{id, name, avatar{large}}}'
        })
        const user = userData.data.data.Viewer;
        user.accessToken = accessToken

        // const newUser = await new User({
        //     username:user.name,
        //     aniID:user.id
        // }).save()

        // console.log(newUser+" is cool!!")


        done(null, user)
}))

//         // .catch(r => console.log(r.data))
//         // return cb(null, {
//         //     user: 1
//         // });
//         // User.findOrCreate({
//         //     exampleId: profile.id
//         // }, function (err, user) {
//         //     return cb(err, user);
//         // });
//     }
// ));