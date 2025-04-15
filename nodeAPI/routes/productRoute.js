const express = require('express')
const router = express.Router();
const {getProducts,getOneProduct,createProduct,updateProduct,deleteProduct} = require('../controller/productController')

router.get('/',getProducts)

router.get('/:id',getOneProduct)

router.post('/',createProduct)

router.put('/:id',updateProduct)

router.delete('/:id',deleteProduct)


module.exports = router;