// This is some middleware that is responsible for generating tokens
// and authenticating tokens. I export at the end so that they are accessible in other routers
const jwt = require('jsonwebtoken')
const Users = require('./../models/user')
require('dotenv').config()


function generateAccessToken(username) {
    return jwt.sign(username, process.env.ACCESS_TOKEN)
}

function authenticateToken(req, res, next){
    // check the for the authorization header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    
    // if no token, return not found
    if (token == null) return res.sendStatus(401)

    // else verfiy the token, and proceed (next)
    jwt.verify(token, process.env.ACCESS_TOKEN, async (err, email) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }

        // Fetch user
        const user = await Users.findOne({ email });
        if (! user) {
            return res.sendStatus(401)
        }

        req.user = user
        next()
    })
}

module.exports = {authenticateToken, generateAccessToken}