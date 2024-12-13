const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const offer_scehma = new Schema({
    amount:{
        type:String,
        required:true
    },
    offer_name:{
        type:String,
        default:"new"
    }
},{timestamps:true});

const offer_model = mongoose.model('Offer',offer_scehma);
module.exports = offer_model;