const dotenv  = require('dotenv')
dotenv.config()
module.exports = {
    jwt_secret: process.env.JWTSECRET
}