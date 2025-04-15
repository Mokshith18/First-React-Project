const User = require('../models/userModel')

const getUser = async(req,res) =>{
    try {
        const user = await User.find({})
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

const getOneUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id)
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
}

const createUser = async(req,res)=>{
    try {
       const user = await User.create(req.body)
       res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const updateUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id,req.body);
        if(!user){
            return res.status(404).json({message:`cannot find any user with id ${id}`})
        }
        const updatetedUser = await User.findById(id);
        res.status(200).json(updatetedUser)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}

const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message:`cannot find any user with id ${id}`})
        }
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
}



module.exports = {getUser,getOneUser,createUser,updateUser,deleteUser}