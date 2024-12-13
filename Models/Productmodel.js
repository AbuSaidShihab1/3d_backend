const mongoose=require("mongoose");

const Product_schem=new mongoose.Schema({
    image:{
        type:String,
        required:true,
    },
    product_name:{
        type:String,
        required:true,
        trim:true,
    },
    brand:String,
    category:String,
    price:{
        type:Number,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,  
    }
},{timestamps:true});

const product_model=mongoose.model("Product",Product_schem);

module.exports=product_model;