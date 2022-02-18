const router = require("express").Router();
const crypto = require("crypto");
const User = require("../../models/user");
const bcryptjs = require("bcrypt");
const { issueToken } = require("../../lib/JWTUtils");

router.post("/", async (req, res, next) => {
    try {
        const { email, password } = req.body;


        const auth = await User.findOne({ email });

        // Check the email
        if (!auth) throw Error("Invalid Email");

        // Check the password
        const check = await bcryptjs.compare(password, auth.password);

        // If password don't matched
        if (!check) throw Error("Invalid Password");


        // Create Refresh and Access Token
        const refreshToken = await issueToken(
            { userId: auth._id, userType: auth.userType, tokenType: "refresh" },
            "180d"
        );

        // Setting refresh token to cookie
        res.cookie("refreshToken", refreshToken, {
            maxAge: 15552000000,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production'? true : false,  // This will be in production
            path: '/api/v1/auth'
        });


        // Saving the refreshToken and It's number
        const session = {
            sessionId: crypto.randomBytes(10).toString("hex"),
            refreshToken: refreshToken
        };

        // Saving to database
        await User.findOneAndUpdate({_id: auth._id}, {$push: {sessions: session}});


        // Send the response
        res.json({
            success: true,
            msg: ["You are logged in successfully"],
        });
    } catch (err) {
        err.status = 400;
        next(err);
    }
});

module.exports = router;
