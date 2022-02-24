const router = require('express').Router();
const crypto = require('crypto');
const User = require('../../models/user');
const Token = require('../../models/token');
const sendMail = require('../../lib/sendMail');
const {CLIENT_URL} = process.env;


router.post('/', async (req, res, next) => {
    try {
        const {email} = req.body;

        // No need to validate the email. Because only valid email can be saved on db.
        const user = await User.findOne({email});

        if(!user) throw Error('Invalid Email');

        let token = await Token.findOne({ userId: user._id});
        if (!token) {
            token = await new Token({
                userId: user.userId,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        // Send the response with the access Token
        res.json({
            success: true, 
            msg: "Please check your email." 
        });


        try{
            const activateToken = `${user._id}.${token.token}?email=${encodeURI(email)}`;

            // Verify Email
            const emailResult = await sendMail({
                to: user.email,
                subject: 'Verification mail',
                text: `Click on the given link ${CLIENT_URL}/activate/resetPassword/${activateToken}`,
                template: 'reset',
                context: {
                    username: user.name,
                    email: user.email,
                    link: `${CLIENT_URL}/activate/resetPassword/${activateToken}`
                }
            });
        }
        catch(err) {
            console.log(err.message);
        }
    }
    catch (err) {
        next(err);
    }
});


module.exports = router;