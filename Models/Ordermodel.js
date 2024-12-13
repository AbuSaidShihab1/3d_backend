const mongoose=require("mongoose");

const order_schema=new mongoose.Schema({
    order_id:{
      type:String,
      required:true
    },
    customer_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    products:[],
     price:{
        type:Number,
        required:true,
    },
    pament:{
        type:String,
    },
    pament_method:{
         type:String,
        required:true
    },
    coupon:{
         type:String,
    },
    status:{
        type:String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "deliverd", "cancel"],
    }
},{timestamps:true});

const order_model=mongoose.model("Order",order_schema);

module.exports=order_model;