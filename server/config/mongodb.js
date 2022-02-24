const mongoose = require('mongoose');


const {
    DATABASE_URL,
    MONGODB_USERNAME,
    MONGODB_PASSWORD,
    DATABASE_NAME,
} = process.env;


const connection = () => {
    return new Promise( async (resolve, reject) => {
        try {
            await mongoose.connect(DATABASE_URL, {
                dbName: DATABASE_NAME,
                user: MONGODB_USERNAME,
                pass: MONGODB_PASSWORD
            });

            // Mongodb is connected
            console.log('\x1b[32m%s\x1b[0m', `Mongodb is connected`);
            resolve();
        }
        catch(error) {
            console.log('\x1b[31m%s\x1b[0m','Database connection failed');
            console.log('\x1b[31m%s\x1b[0m', error.message);
        }
    });
}


module.exports = connection;