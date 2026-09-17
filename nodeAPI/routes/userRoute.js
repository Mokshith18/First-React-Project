const express = require('express')
const router = express.Router();
const {getUser,getOneUser,createUser,updateUser,deleteUser} = require('../controller/userController')

router.get('/',getUser);

router.get('/:id',getOneUser);

router.post('/',createUser);

router.put('/:id',updateUser);

router.delete('/:id',deleteUser);

module.exports = router;