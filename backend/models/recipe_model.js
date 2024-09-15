const mongoose= require('mongoose');

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    createdAt: { type: Date, default: Date.now },
  });
  
const newRecipe= new mongoose.Schema(
    {
        title:{
            type:String,
            required:true

        },
        description: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        ingredients: {
            type: String, 
            required: true
        },
        steps: {
            type: String, 
            required: true
        },
        image: {
            type: String, 
            required: false
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        username:{
            type: String,
         required:true,
        },
        likes:{
            type:Number,
            default:0
        },
        comments: [CommentSchema], 
        shares: { type: Number, default: 0 },
    }
    ,{timestamps:true});

const Recipe= mongoose.model('Recipe',newRecipe);
module.exports=Recipe;