const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscribe_schema = new Schema({
    email: {
        type: String,
        required: true,
    }
},{timestamps:true});

const subscribe_model = mongoose.model('Scbscribe', subscribe_schema);
module.exports = subscribe_model;