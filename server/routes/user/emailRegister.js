const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../../models/user');
const Token = require('../../models/token');
const sendMail = require('../../lib/sendMail');
const {issueToken} = require('../../lib/JWTUtils');
const {CLIENT_URL} = process.env;


router.post('/', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;


        // Find the email 
        const findEmail = await User.findOne({email});

        // Throw error if email already registers
        if(findEmail) throw Error('This email is already registered');

        
        // Creating user
        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 12),
            userType: 'client',
        });

        // Save User data to database
        const newData = await newUser.save();

        // Create Refresh and Access Token
        const refreshToken = await issueToken({userId: newData._id, userType: newData.userType, tokenType: "refresh"}, '180d');
        


        // Save session
        await User.findOneAndUpdate({_id: newData._id}, {$push: {sessions: {sessionId: 1, refreshToken}}});


        // Setting refresh token to cookie
        res.cookie('refreshToken', refreshToken, {
            maxAge: 15552000000, 
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'? true : false,  // This will be in production
            path: '/api/v1/auth'
        });

        // Send the response with the access Token
        res.json({
            success: true, 
            msg: "Your account is created successfully. Please confirm your email." 
        });



        let token = await Token.findOne({ userId: newData._id});
        if (!token) {
            token = await new Token({
                userId: newData._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }


        try{
            const activateToken = `${newData._id}.${token.token}?email=${encodeURI(email)}`;

            // Verify Email
            const emailResult = await sendMail({
                to: newData.email,
                subject: 'Verification mail',
                text: `Click on the given link ${CLIENT_URL}/activate/${activateToken}`,
                template: 'email',
                context: {
                    username: newData.name,
                    email: newData.email,
                    link: `${CLIENT_URL}/activate/${activateToken}`
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
