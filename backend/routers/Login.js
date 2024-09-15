const express= require('express');
const router= express.Router();
const User= require('../models/user_model.js');
const jwt= require('jsonwebtoken');
const bcrypt=require('bcrypt');
router.post('/',async (req,res)=>{
      const data = req.body;
  
    try {
        console.log('data->',data);

        const {email, password}=req.body;
        const emailExist= await User.findOne({email});
       
        if(email==null||password==null){
        
            return res.status(403).json({message:'email and password is required',success:false});
        }
         if(!emailExist){
            
            return res.status(501).json({message:'User not exist',success:false});
    
        }
       const user = await User.findOne({email});
    //    console.log('user->', user);
       
        const ispassword= await bcrypt.compare(password,user.password);
        // console.log('ispassword->',ispassword);
        
        if(!ispassword){
            return res.status(403).json({message:'invalid details',success:false});

        }
        const jwtoken=jwt.sign(
            {
                email:user.email,username:user.username, id:user._id
            },
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
            );

            res.status(200).json({
                message:'Login Succesfully',
                success:true,
                jwtoken,email,name:user.fullname,username:user.username,userId:user._id
            })
    } catch (error) {
        res.status(500).json({message:"INTERNAL SERVER ERROR",succes:true});
    }
})

module.exports= router;