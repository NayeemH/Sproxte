const {Schema, model} = require('mongoose');


const heroImageSchema = Schema({
    image: {
        type: String,
        required: true
    }
});

const HeroImage = model('heroImage', heroImageSchema);

module.exports = HeroImage;