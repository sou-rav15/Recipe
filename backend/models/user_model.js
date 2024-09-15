const mongoose= require('mongoose');

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique: true
    },
    fullname:{
        type:String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true,
        unique: true
    },
    avatar: { type: String, default: '/default-avatar.jpg' },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
},{timestamps:true});

const User=mongoose.model('User',UserSchema);

module.exports= User;