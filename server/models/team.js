const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Actual team schema
const teamSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    coachId:{
        type: Schema.Types.ObjectId,
        required: true,
    },
    school:{
        type: String,
        
    },
    location:{
        type: String,

    },
    colorTheme:{
        type: String
    },
    description:{
        type: String
    },
    
    logo:{
        type: String,
        required: true
    },
    sponsorLogo:{
        type: String,
    },
    sponsorName:{
        type: String
    },

}, {timestamps: true});


// Creating the project model
const Team = mongoose.model('team', teamSchema);


module.exports = Team;