const jwt = require('jsonwebtoken'),
    secret = process.env.SERVER_SECRET,
    userModel = require('../models/UsersModel'),
    authenticationError = require('../utils/customError/authenticationError');

exports.verifyToken = (req, res, next) => {
    try {
        const token = req.headers['x-authorization']
        if (token) {
            jwt.verify(token, secret, async (err, decodedToken) => {
            if (err) {
                authenticationError.authTokenNotGoodOrExpired(res);
            } else {
                // Check if token has expired
                const currentTime = new Date().getTime() / 1000

                if (currentTime > decodedToken.exp) {
                    authenticationError.authTokenExpired(res);
                }

                // Check in database if the user id is well registered
                const userInDB = await userModel.findById(decodedToken.id)

                if(!userInDB.length) {
                    authenticationError.authTokenGoodAndUnexistUser(res);
                } 
                console.log(`User '${decodedToken.name}' well identified, user data =>`, decodedToken)
                delete userInDB[0].password
                req.decodedToken = userInDB[0]
                console.log("req decoded token =>", req.decodedToken)

                next()
            }
            })
        } else {
            authenticationError.authTokenNotFound();
        }
    } catch (e) {
        authenticationError.authGlobalError(res);
    }
}