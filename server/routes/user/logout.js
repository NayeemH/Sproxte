const router = require('express').Router();
const User = require('../../models/user');
const {verifyToken} = require('../../lib/JWTUtils');

router.post('/', async (req, res, next) => {
    
    try {
        const {refreshToken} = req.cookies;

        if(!refreshToken) throw Error('Refresh Token Required');

        // Check the token
        const payload = await verifyToken(refreshToken);

        // Check if it is a refresh token
        if(payload.tokenType !== 'refresh') throw Error('Invalid Token');
       
        // Clear the cookie
        res.clearCookie('refreshToken', {
            path: '/api/v1/auth'
        });

        // check if the token is expired
        if(payload.exp * 1000 >= Date.now()) {
            // Find the user with that Id
            const user = await User.findOne({_id: payload.userId});

            if(!user) throw Error('User Not Found');

            await User.findOneAndUpdate({_id: user._id}, {$pull: {sessions: {refreshToken}}});


            // Send the response
            res.json({
                success: true,
                msg: ['Logged out']
            });
        }
    }
    catch(err) {
        err.status = 403;
        next(err);
    }
});


module.exports = router;