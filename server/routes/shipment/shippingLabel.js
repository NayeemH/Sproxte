const router = require('express').Router();
const Order = require('../../models/order');
const {shippingLabel} = require('../../lib/shipping');

const {
    ADMIN_POSTAL_CODE,
    ADMIN_COUNTRY_CODE
} = process.env;

router.post('/:orderId', async (req, res, next) => {
    try {
        const {orderId} = req.params;
        const {packagingType} = req.body;

        const order = await Order.findOne({_id: orderId});
        if(!order) throw Error('Order not found');

        if(order.isShippingLabel) throw Error('You already make the label')

        const {masterTrackingNumber, labelURL} = await shippingLabel(
            {
                personName: order.firstName,
                emailAddress: order.email,
                phoneNumber: order.phone
            },
            {
                streetLines: [order.address],
                postalCode: order.zip,
                city: order.city,
                stateOrProvinceCode: order.state,
                countryCode: order.country
            },
            order.serviceType,
            packagingType,
            order.weight ? order.weight : 1
        );
        await Order.findOneAndUpdate({_id: orderId}, {$set: {
            isShippingLabel: true,
            masterTrackingNumber
        }});
        

        res.json({
            message: 'Shipping label',
            shippingLabelURL: labelURL 
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;