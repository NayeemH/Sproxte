const router = require('express').Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const User = require('../../models/user');


router.post('/', async (req, res, next) => {
    try {
        const { name, email } = req.body;


        // Find the email 
        const findEmail = await User.findOne({email});

        // Throw error if email already registers
        if(findEmail) throw Error('This email is already registered');

        const password = crypto.randomBytes(4).toString('hex');

        // Creating user
        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 12),
            userType: 'iep',
        });

        // Save User data to database
        const newData = await newUser.save();


        // Send the response with the access Token
        res.json({
            message: "Account is created successfully.",
            password
        });
    }
    catch (err) {
        next(err);
    }
});



module.exports = router;
