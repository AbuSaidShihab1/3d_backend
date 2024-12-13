const express=require("express");
const product_model = require("../Models/Productmodel");
const order_model = require("../Models/Ordermodel");
const basic_router=express();
const { v4: uuidv4 } = require('uuid');
const subscribe_model = require("../Models/Subscribemodel");
const blog_model=require("../Models/Blogmodel");
const offer_model = require("../Models/offermodel");
basic_router.get("/all-products",async(req,res)=>{
        try {
            const all_products=await product_model.find();
            res.send({success:true,message:"ok",products:all_products})
        } catch (error) {
            console.log(error)
        }
});
basic_router.post("/order-product",async(req,res)=>{
    try {
          // Generate a short numeric ID
        const shortOrderId = `#${Math.floor(10000 + Math.random() * 90000)}`;
        const {customer_name,email,phone,coupon,city,address,zip_code,products,price,pament_method}=req.body;
    //   if(!userid || !name || !email || !city || !address || !zipcode || !products || !price){
    //        return res.status(400).send({success:false,message:"Please Provide full information!"})
    //   };
    //   product order confirmation
    const orderconfirm=new order_model({
      order_id:shortOrderId,
      customer_name,email,phone,city,address,zip_code,products,price,pament_method,coupon
    });
    // const clearproduct=await cartmodel.findOneAndUpdate({userid:userid},{$set:{items:[]}});
    // console.log(clearproduct)
    orderconfirm.save();
    res.status(200).send({success:true,message:"Order Successful! 🔥 🔥 🔥 🔥",order:orderconfirm})
    } catch (error) {
        console.log(error)
    }
})
basic_router.get("/single-order-product/:id",async(req,res)=>{
        try {
            const single_product=await product_model.findById({_id:req.params.id});
            res.send({success:true,message:"ok",products:single_product})
        } catch (error) {
            console.log(error)
        }
});
// ------------subscribe
basic_router.post("/subscribe",async(req,res)=>{
    try {
        const {email}=req.body;
        const find_email=await subscribe_model.findOne({email});
        if(find_email){
            res.status(200).send({success:true,message:"You have already subscribed!"})
        }
        const add_subscriber=new subscribe_model({email});
        if(add_subscriber){
            add_subscriber.save();
            res.status(200).send({success:true,message:"Subscrbied🔥 🔥 🔥 🔥"})
        }
    } catch (error) {
        console.log(error)
    }
});

basic_router.get("/all-blogs",async(req,res)=>{
        try {
            const blogs=await blog_model.find();
            res.send({success:true,message:"ok",blogs:blogs})
        } catch (error) {
            console.log(error)
        }
});
basic_router.get('/offer-data',async(req, res) => {
      const offer=await offer_model.findOne({offer_name:"main"});
      console.log(offer)
      res.send({success:true,message:"ok",offer:offer})
});
module.exports=basic_router;