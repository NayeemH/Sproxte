const {verifyToken} = require('../../lib/JWTUtils');


const authenticate = async (req, res, next) => {
    const {authorization} = req.headers;

    try {
        if(!authorization) throw Error('You are not authorized');

        const token = authorization.split(' ');
    
        // Cut the bearer token and find the token portion
        if(token[0] === 'Bearer' && token[1].match(/\S+\.\S+\.\S+/) !== null) {

            // Verify and find the user id
            const payload = await verifyToken(token[1]);

            // Check if it is a access token
            if(payload.tokenType !== 'access') throw Error('Invalid Token');

             // check if the token is expired
            if(payload.exp * 1000 >= Date.now()) {
                req.user = {
                    userId: payload.userId,
                    userType: payload.userType
                }

                return next();
            }
            else throw Error('Your token expired');
        }

        else throw Error('Invalid Token');
    }
    catch(err) {
        err.status = 401;
        next(err);
    }
}


module.exports = authenticate;