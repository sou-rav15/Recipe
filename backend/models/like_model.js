const mongoose= require('mongoose');
const likes= new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
    createdAt: { type: Date, default: Date.now },
});

const Likes= mongoose.model('Likes',likes);
module.exports=Likes;