const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Blog_schema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true, 
    }
},{timestamps:true});

const blog_model = mongoose.model('Blog', Blog_schema);
module.exports = blog_model;