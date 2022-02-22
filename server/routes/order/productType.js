const router = require('express').Router();
const ProductTypeOrder = require('../../models/productTypeOrder');
const {fileFetch, saveImage} = require('../../lib/imageConverter');
const IEPTemplate = require('../../models/IEPTemplate');


router.post('/', fileFetch.array('images'), async (req, res, next) => {
    try {
        const {userId} = req.user;

        

        const {productTypeId, description, paymentToken, address, quantity, price} = req.body;

        // TODO: Check the payments

        // Save image
        let images = [];
        if(req.files) {
            images = await Promise.all(req.files.images.map(image => saveImage(image)))
        }

        // create iep template
        const iepTemplate = await new IEPTemplate({
            userId,
            productTypeId,
            description,
            images
        }).save();

        await new ProductTypeOrder({
            userId,
            productTypeId, 
            IEPTemplateId: iepTemplate.id,
            paymentToken, 
            address, 
            quantity,
            price
        }).save();


        res.json({
            message: 'Template Type order is added successfully',
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;