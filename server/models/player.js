const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual player schema
const playerSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    coachId:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    teamId:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    gurdianEmail:{
        type: String,
        required: true
        
    },
    image:{
        type: String
    },

}, {timestamps: true});


// Creating the project model
const player = mongoose.model('player', playerSchema);


module.exports = player;