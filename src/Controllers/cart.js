const express = require('express');
const router = express.Router();
const Product = require('../product.model');
const Cartmodel = require("../model/cart.model")

router.post("/",async (req,res) => {
    try{
        let cartproduct = await Cartmodel.create(req.body);
        return res.send(cartproduct)
    }
    catch(e){
        return res.send(e)
    }
})

router.get("/",async (req,res) => {
    try{
        let cartproduct = await Cartmodel.find().populate("productId").lean().exec();
        return res.send(cartproduct)
    }
    catch(e){
        return res.send(e)
    }
})
router.delete("/:id",async (req,res) => {
    try{
        const id =res.params.id
        let cartproduct = await Cartmodel.find(id).lean().exec();
        return res.send(cartproduct)
    }
    catch(e){
        return res.send(e)
    }
})





module.exports = router;