const router = require('express').Router();
const Project = require('../../models/project');
const User = require('../../models/user');
const Order = require('../../models/order');
const sendNotification = require('../../lib/sendNotification');


router.patch('/:id', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {id} = req.params;
        const {status} = req.body;


        if(userType === 'admin' || userType === 'iep') {
            let active = true;
            if(status === 'delivered') active = false;
            const project = await Project.findOneAndUpdate({_id: id}, {$set: {status, active}});
            await Order.findOneAndUpdate({projectId: id}, {$set: {deleveryStatus: status}});

            // Send notification
            const users = await User.find({$or: [{userType: 'admin'}, {userType: 'iep'}]}, {_id: 1});
            const userIds = users.map(({_id}) => _id.toString());

            userIds.push(project.userId.toString());

            await sendNotification('Project status changed', userIds, project._id);
        }
        else {
            throw Error('You are not authorized');
        }

        
        res.json({
            message: `Status code changed to ${status}`,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;