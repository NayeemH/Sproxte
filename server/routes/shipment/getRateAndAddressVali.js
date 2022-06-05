const router = require('express').Router();
const Order = require('../../models/order');
const {addressResolver, shippingRate} = require('../../lib/shipping');

const {
    ADMIN_POSTAL_CODE,
    ADMIN_COUNTRY_CODE
} = process.env;

router.get('/:orderId', async (req, res, next) => {
    try {
        const {orderId} = req.params;
        const {userId} = req.user;

        const order = await Order.findOne({_id: orderId, userId});
        if(!order) throw Error('Order not found');

        const validAddress = await addressResolver({
            streetLines: [order.address],
            postalCode: order.zip,
            city: order.city,
            stateOrProvinceCode: order.state,
            countryCode: order.country
        });


        const shippingPrice = await shippingRate(
            {
                postalCode: ADMIN_POSTAL_CODE,
                countryCode: ADMIN_COUNTRY_CODE
            },
            {
                postalCode: order.zip,
                countryCode: order.country
            },
            order.serviceType,
            order.weight ? order.weight : 1,
            // date
        );

        await Order.findOneAndUpdate({_id: orderId, userId}, {$set: {
            address: validAddress.streetLines[0],
            zip: validAddress.postalCode,
            city: validAddress.city,
            state: validAddress.stateOrProvinceCode,
            country: validAddress.countryCode,
            shippingCost: shippingPrice.price
        }});
        

        res.json({
            message: 'Shipping rate and address validator',
            shippingRate: shippingPrice,
            shippingAddress: {
                address: validAddress.streetLines,
                zip: validAddress.postalCode,
                city: validAddress.city,
                state: validAddress.stateOrProvinceCode,
                country: validAddress.countryCode
            }
        });
    }
    catch(error) {
        next(error);
    }
});


module.exports = router;