const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservation_schema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
     email: {
        type: String,
        required: true,
    },
        time: {
        type: String,
        required: true,
    },  
      guest: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    status:{
        type:String,
        default:"pending"
    }
},{timestamps:true});

const reserve_model = mongoose.model('Reservation', reservation_schema);
module.exports = reserve_model;