const bcryptjs = require('bcryptjs');

// Hashing the password before saving to database
const hashingPassword = async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        this.password = await bcryptjs.hash(this.password, 12);
        next();
    }
    catch(err) {
        next(err);
    }
}

module.exports = hashingPassword;