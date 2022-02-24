const router = require('express').Router();
const Token = require('../../models/token');
const User = require('../../models/user');



// token =>  id.token
router.get('/:param', async (req, res, next) => {
    try {
        const {param} = req.params;
        const {password} = req.body;

        const info = param.split('.');


        const token = await Token.findOne({
            userId: info[0],
            token: info[1],
        });

        if (!token) throw Error("Invalid link or expired");
        
        
        
        await Promise.all([
            User.findOneAndUpdate({_id: info[0]}, {$set: {verified: true}}),
            token.delete()
        ]);
        
        res.json({
            success: true,
            msg: "Email activate successfully"
        });
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});



module.exports = router;