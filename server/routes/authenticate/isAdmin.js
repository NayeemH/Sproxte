const authenticate = async (req, res, next) => {
    const {userType} = req.user;

    try {
        if(userType === 'admin') {
            return next();
        }
        else throw Error('You are not authorized');
    }
    catch(err) {
        err.status = 403;
        return next(err);
    }
}


module.exports = authenticate;