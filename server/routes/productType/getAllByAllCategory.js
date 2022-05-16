const router = require('express').Router();
const CategoryType = require('../../models/categoryType');
const ProductType = require('../../models/productType');


router.get('/', async (req, res, next) => {
    try {
        const categoryType = await CategoryType.find({}, {__v: 0, createdAt: 0, updatedAt: 0, pngImage: 0, svgImage: 0});

        const categoryIds = categoryType.map(categoryType => categoryType._id);

        const productType = await ProductType.find({categoryType: {$in: categoryIds}}, {_id: 1, categoryType: 1, name: 1, price: 1, discount: 1, pngImageFront: 1});

        const finalData = categoryType.map(type => {
            const data = type.toJSON();

            data.productType = [];
            for(let i = 0; i < productType.length; i++) {
                if(productType[i].categoryType.toString() === type._id.toString()) {
                    data.productType.push(productType[i]);
                }
            }
            
            return data;
        });

        res.json({
            message: 'Category types and Product types',
            finalData
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;