require('dotenv').config();

const connection = require('./server/config/mongodb');
const User = require('./server/models/user');
const db = require('mongoose').connection;
const bcrypt = require('bcrypt');

const {
    ADMIN_NAME,
    ADMIN_EMAIL,
    ADMIN_PASSWORD
} = process.env;

connection()
.then(async () => {
    try {
        // Drop the database
        // await db.dropDatabase();
        // console.log('\x1b[31m%s\x1b[0m', `Database is droped`);

        const user = await User.findOne({email: ADMIN_EMAIL});

        if(user) {
            await User.findOneAndUpdate({_id: user._id}, {
                $set: {
                    name: ADMIN_NAME,
                    email: ADMIN_EMAIL,
                    password: await bcrypt.hash(ADMIN_PASSWORD, 12),
                    userType: 'admin',
                    verified: true,
                }
            });

            console.log('\x1b[32m%s\x1b[0m', `Admin User is updated.`);
        }
        else {
            // Create Admin
            await new User({
                name: ADMIN_NAME,
                email: ADMIN_EMAIL,
                password: await bcrypt.hash(ADMIN_PASSWORD, 12),
                userType: 'admin',
                verified: true,
            }).save();

            console.log('\x1b[32m%s\x1b[0m', `Admin User is created.`);
        }

        db.close();
    }
    catch(error) {
        console.log(error.message);
        db.close();
    }
});