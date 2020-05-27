const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const User = require('../models/userModel')


passport.use('register', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    try {
        let {
            email
        } = req.body
        const user = await User.findOne({
            username
        })
        if (user) {
            return done(null, false, {
                username: 'User already exist'
            });
        } else{
            const user = await User.findOne({ email })
            if(user) {
                return done(null,false, {
                    email: 'Email Already exist'
                })
            } else{
                const user = await User.create({
                    username,
                    email,
                    password
                })
                return done(null, user, {
                    message: 'Created Successfully'
                });
            }
        }
        
    } catch (error) {
         done(error)
    }
}))


passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    try {
        const user = await User.findOne({username})
        if (!user) {
            return done(null, false, {
                message: 'User not found'
            });
        }
        const validate = await user.isValidPassword(password);
        if (!validate) {
            return done(null, false, {
                message: 'Wrong Password'
            });
        }
         done(null, user, {
            message: 'Logged in Successfully'
        });
    } catch (error) {
        console.log(`error ${error}`)
         done(error)
    }
}))


//This verifies that the token sent by the user is valid
passport.use(
    new JWTstrategy({
            //secret we used to sign our JWT
            secretOrKey: "top_secret",
            //we expect the user to send the token with header as parameter with the name 'secret_token'
            jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
        },
        async (token, done) => {
            try {
                //Pass the user details to the next middleware
                return done(null, token.user);
            } catch (error) {
               return  done(error);
            }
        }
    )
);
