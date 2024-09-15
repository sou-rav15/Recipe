const express= require('express');
const router=express.Router();
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const User= require('../models/user_model.js');
router.post('/', async (req,res)=>{
    const {username, fullname, email, password}=req.body;
    console.log('body->', req.body);
    try {
        const emailExist= await User.findOne({email});
        const usernameExist= await User.findOne({username});
        if(usernameExist){
            return  res.status(500).json({message:'username is already exist', success:false});
        }
        if(emailExist){
            return res.status(500).json({message:'email is already exist', success:false});
        }

        const newUser= new User({username, fullname, email, password});
        newUser.password= await bcrypt.hash(password ,10);
        await newUser.save();
         // Send success response after saving the user
         res.status(201).json({
            message: 'Signup successful',
            success: true,
            newUser,  // Return the new user data (excluding password)
        });
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR",succes:false}
        ) 
        
    }
})





module.exports= router;