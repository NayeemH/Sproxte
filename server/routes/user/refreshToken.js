const router = require("express").Router();
const User = require('../../models/user');
const { verifyToken, issueToken } = require("../../lib/JWTUtils");

router.post("/", async (req, res, next) => {

	try {
		const { refreshToken } = req.cookies;

		if (!refreshToken) throw Error("Refresh Token Required");

		const payload = await verifyToken(refreshToken);

		// Check if it is a refresh token
		if (payload.tokenType !== "refresh") throw Error("Invalid Token");

		// check if the token is expired
		if (payload.exp * 1000 >= Date.now()) {
			// Find the user with that Id
			const user = await User.findOne({ _id: payload.userId });

			if (!user) throw Error("User Not Found");

			if (!user.verified) throw Error("Please Verify your account by email");

			// Find the index of that refreshToken in memory
			const index = user.sessions.findIndex(
				(session) => session.refreshToken === refreshToken
			);

			// If not exits
			if (index === -1)
				throw Error(
					"Your account may compromised. Please login again. And also remove your session"
				);


			// Create Refresh and Access Token
			const newRefreshToken = await issueToken(
				{ userId: user._id, userType: user.userType, tokenType: "refresh" },
				"180d"
			);
			const newAccessToken = await issueToken(
				{ userId: user._id, userType: user.userType, tokenType: "access" },
				"300m"
			);

			// Setting refresh token to cookie
			res.cookie("refreshToken", newRefreshToken, {
				maxAge: 15552000000,
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production'? true : false,  // This will be in production
				path: '/api/v1/auth'
			});

			

			// Update refresh token of that sessions
			await User.findOneAndUpdate({_id: user._id} , { $set: { [`sessions.${index}.refreshToken`] : newRefreshToken }})

			// Send the response with the access Token
			res.json({
				success: true,
				accessToken: `Bearer ${newAccessToken}`,
				msg: "Access Token is given.",
			});
		} 
		else throw Error("Token Expired");
	} 
	catch (err) {
		const errors = {
			status: 403,
			message: err.message,
		};
		return next(errors);
	}
});

module.exports = router;
