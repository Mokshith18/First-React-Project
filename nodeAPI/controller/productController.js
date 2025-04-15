const Product = require('../models/productModel')
//Simple middleware for handling exceptions inside of async express routes and passing them to your express error handlers.
const asyncHandler = require('express-async-handler')

const getProducts = asyncHandler(async(req,res)=>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const getOneProduct = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        // console.log(error.message)
        // res.status(500).json({message:error.message})
        res.status(500);
        throw new Error(error.message);
    }
})

const createProduct = asyncHandler(async (req,res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

const updateProduct =asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body,{new:true});
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with id ${id}`);
            
        }
        //const updatedProduct = await Product.findById(id);
        res.status(200).json(product)


    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})


const deleteProduct = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with id ${id}`);
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})
module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
}