const express = require('express');
const router = express.Router();
const Like = require('../models/like_model.js');
const Recipe = require('../models/recipe_model.js');


router.post('/:id/likes', async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.body.userId; 
    const existingLike = await Like.findOne({ userId:userId, recipeId:recipeId });
    const data = await Recipe.findById(recipeId);
    console.log(data);
    
    if (existingLike) {
      // If like exists, remove it (unlike)
      await Like.deleteOne({ userId, recipeId });
      if(data.likes>0){
        data.likes-=1;
      }
      
      await data.save();

    //   await Recipe.findByIdAndUpdate(recipeId, { $inc: { likes: -1 } });

      return res.status(200).json({ message: 'Like removed' });
    } else {
      // If no like exists, create a new one
      const newLike = new Like({ userId, recipeId });
      await newLike.save();
      data.likes+=1;
      await data.save();
    
    //   await Recipe.findByIdAndUpdate(recipeId, { $inc: { likes: 1 } });

      return res.status(200).json({ message: 'Like added' });
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
