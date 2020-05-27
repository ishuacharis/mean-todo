const express = require('express');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken')
const {
    jwt_secret
} = require('../config')

const User = require('../models/userModel')

router.post('/login', function (req, res, next) {
passport.authenticate("login", async (err, user, info) => {
    try {

        if (err || !user) {
            const error = new Error(info.message);
            res.status(401).json(info)
            return next(error);
        }
        req.login(user, {
            session: false
        }, async (error) => {
            if (error) return next(error);
            //We don't want to store the sensitive information such as the
            //user password in the token so we pick only the email and id
            const body = {
                _id: user._id,
                id: user.id,
                username: user.username,
                email: user.email,
                created_at: user.created_at,
                updated_at: user.updated_at
            };
            //Sign the JWT token and populate the payload with the user email and id
            const token = jwt.sign({
                user: body
            }, jwt_secret);
            //Send back the token to the user
            return res.json({
                user: body,
                token: token,
                message: "Logged in successfully"
            });
        });
    } catch (error) {
        return next(error);
    }
})(req, res, next);
})


//for server side session should be set to false
router.post('/register', async function (req, res, next) {
    passport.authenticate("register", {
        session: false
    }, async (err, user, info) => {
        try {
            if (err || !user) {
                console.log(info)
                const error = new Error(info);
                res.status(401).json(info)
                return next(error);
            } else {
                const body = {
                    _id: user._id,
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
                const token = jwt.sign({
                    user: user
                }, "top_secret");
                res.status(200).json({
                    message: 'registered successfully',
                    user: body,
                    token: token
                })
            }
        } catch (error) {
            return next(error);
        }
    })(req, res, next);

})

router.post('/logout', function (req, res, next) {
    console.log(req)
    res.status(200).json({
        message: 'you will be redirected to login page'
    })
})

module.exports = router