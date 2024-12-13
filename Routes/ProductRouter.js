const ensureAuthenticated = require('../Middlewares/Auth');
const multer=require("multer");
const router = require('express').Router();
const product_model=require("../Models/Productmodel")
const fs = require("fs");
const order_model = require('../Models/Ordermodel');
const blog_model = require('../Models/Blogmodel');
const reserve_model = require('../Models/Reservationmodel');
const nodemailer = require("nodemailer");
const subscribe_model = require('../Models/Subscribemodel');
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "shihabmoni15@gmail.com",
    pass: "hduwmlisadkbpglj",
  },
});
// ---------upload image 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename:function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }

});
const uploadimage=multer({storage:storage});
router.get('/', ensureAuthenticated,(req, res) => {
      res.send({success:true,message:"ok"})
});
router.get('/products-info', ensureAuthenticated,async(req, res) => {
      const all_products=await product_model.find();
      res.send({success:true,message:"ok",products:all_products})
});
router.post("/add-product",ensureAuthenticated,uploadimage.single("file"),(req,res)=>{
    try {
        const {product_name,brand,category,price,description}=req.body;
          const add_product=new product_model({
             image:req.file.filename,
             product_name,
             brand,
             category,
             price,
             description
        });
        if(add_product){
            add_product.save();
        res.send({success:true,message:"Product has been added!"})
        }  
    } catch (error) {
        console.log(error)
    }
})
// delete order 
router.delete("/delete-product/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const deleteproduct=await product_model.findByIdAndDelete({_id:req.params.id});
          if(!deleteproduct){
             res.send({success:false,message:"Product did not find!"})
          }
          if(deleteproduct){
                  fs.unlinkSync(`./public/images/${deleteproduct.image}`)
                  res.send({success:true,message:"Product has been deleted!"})
         }
         
        }catch(err){
            console.log(err.message)
        }
});
router.delete("/delete-order-product/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const deleteproduct=await order_model.findByIdAndDelete({_id:req.params.id});
          if(!deleteproduct){
             res.send({success:false,message:"Product did not find!"})
          }
        //   if(deleteproduct){
        //           fs.unlinkSync(`./public/images/${deleteproduct.products.image}`)
        //           res.send({success:true,message:"Product has been deleted!"})
        //  }
         
        }catch(err){
            console.log(err.message)
        }
});
// order status change
router.put("/update-product/:id",ensureAuthenticated,uploadimage.single("file"),async(req,res)=>{
    try {
       const { product_name, price, brand, description } = req.body;
        const image = req.file ? req.file.filename : null; // Save only the filename

        // Construct the update object dynamically
        const updateData = { product_name, price, brand, description };
        if (image) {
            updateData.image = image; // Include the filename only
        }

        // Update product in the database
        const updatedProduct = await product_model.findByIdAndUpdate(
            { _id: req.params.id },
            updateData,
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).send({ success: false, message: "Product not found!" });
        }

        res.status(200).send({
            success: true,
            message: "Product updated successfully!",
            product: updatedProduct,
        });
    } catch (error) {
        console.log(error)
    }
})
// order details
router.get("/product-details/:id",ensureAuthenticated,async(req,res)=>{
    try {
        const product_info=await product_model.findOne({_id:req.params.id});
        res.status(200).send({success:true,message:"Status updated!",product_info:product_info});
    } catch (error) {
        console.log(error)
    }
});
router.get('/ordered-products', ensureAuthenticated,async(req, res) => {
      const all_products=await order_model.find();
      res.send({success:true,message:"ok",products:all_products})
});

router.get('/single-order-product-details/:id', ensureAuthenticated,async(req, res) => {
      const single_product=await order_model.findById({_id:req.params.id});
      res.send({success:true,message:"ok",product:single_product})
});

// order status change
router.put("/update-order-status/:id",ensureAuthenticated,async(req,res)=>{
    try {
        const {status}=req.body;
        const updatestatus=await order_model.findByIdAndUpdate({_id:req.params.id},{status},{new:true});
        res.status(200).send({success:true,message:"Status updated!",orders:updatestatus});
    } catch (error) {
        console.log(error)
    }
});

// ------------blog
router.post("/add-blog",ensureAuthenticated,(req,res)=>{
    try {
        const {title,description,category}=req.body;
          const add_blog=new blog_model({
            title,description,category
        });
        if(add_blog){
            add_blog.save();
        res.send({success:true,message:"Blog has been added!"})
        }
    } catch (error) {
        console.log(error)
    }
})
router.delete("/delete-blog/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_blog=await blog_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_blog){
             res.send({success:false,message:"Blog did not find!"})
          };
          res.send({success:true,message:"Blog has been deleted!"})
        }catch(err){
            console.log(err.message)
        }
});
router.get('/admin-blogs', ensureAuthenticated,async(req, res) => {
      const all_blogs=await blog_model.find();
      res.send({success:true,message:"ok",blogs:all_blogs})
});
router.get('/blog-details/:id', ensureAuthenticated,async(req, res) => {
      const single_blog=await blog_model.findById({_id:req.params.id});
      res.send({success:true,message:"ok",blog:single_blog})
});
router.put("/update-blog/:id",ensureAuthenticated,async(req,res)=>{
    try {
        const {title,description,category}=req.body; 
        const update_blog=await blog_model.findByIdAndUpdate({_id:req.params.id},{title,description,category})
        if (!update_blog) {
            return res.status(404).send({ success: false, message: "Blog not found!" });
        }

        res.status(200).send({
            success: true,
            message: "Blog updated successfully!",
        });
    } catch (error) {
        console.log(error)
    }
});

// ------------reservation---------

router.post("/add-reservation",async(req,res)=>{
    try {
        const {date,time,guest,name,email,phone}=req.body;
        const find_email=await reserve_model.findOne({email});
        if(find_email){
        res.send({success:true,message:"You have already reserved!"})
        }
          const add_reservation=new reserve_model({
           date,time,guest,name,email,phone
        });
        if(add_reservation){
        add_reservation.save();
        res.send({success:true,message:"Reservation has been created!"})
        }
    } catch (error) {
        console.log(error)
    }
})
router.get('/admin-reservations', ensureAuthenticated,async(req, res) => {
      const reservations=await reserve_model.find();
      res.send({success:true,message:"ok",reservations:reservations})
});
router.delete("/delete-reservation/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_reservation=await reserve_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_reservation){
             res.send({success:false,message:"Reservation data did not find!"})
          };
          res.send({success:true,message:"Reservation Data has been deleted!"})
        }catch(err){
            console.log(err.message)
        }
});
router.get('/reservation-details/:id', ensureAuthenticated,async(req, res) => {
      const single_data=await reserve_model.findById({_id:req.params.id});
      res.send({success:true,message:"ok",reservation:single_data})
});
router.post('/confirm-reservation/:id',async(req, res) => {
    try {
          const single_data=await reserve_model.findByIdAndUpdate({_id:req.params.id},{status:"accepted"});
      const find_data=await reserve_model.findById({_id:req.params.id})
      const info = await transporter.sendMail({
      from: "shihabmoni15@gmail.com", // sender address
      to:find_data.email , // list of receivers
      subject: "Test Purpose", // Subject line
      text: "hello",
    });
      res.send({success:true,message:"Reservation accepted successfully!"})
    } catch (error) {
        console.log(error)
    }
});
// -------------subscriber
router.get('/admin-subscriber', ensureAuthenticated,async(req, res) => {
      const subscribers=await subscribe_model.find();
      res.send({success:true,message:"ok",subscribers:subscribers})
});
router.delete("/delete-subscriber/:id",ensureAuthenticated,async(req,res)=>{
        try{
          const delete_subscriber=await subscribe_model.findByIdAndDelete({_id:req.params.id});
          if(!delete_subscriber){
             res.send({success:false,message:"Subscriber data did not find!"})
          };
          res.send({success:true,message:"Subscriber Data has been deleted!"})
        }catch(err){
            console.log(err.message)
        }
});
module.exports = router;