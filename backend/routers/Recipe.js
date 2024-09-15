const express= require('express');
const router= express.Router();
const Recipe= require('../models/recipe_model.js');
const multer= require('multer');
const path= require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where uploaded images will be stored
    },
    filename: (req, file, cb) => {
        // Rename the file to include the original name and date to avoid conflicts
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
    const data= req.body;
    console.log('data->',data);
    
    try {
        const { title, description, ingredients, steps,userId ,category,username} = req.body;
        const imagePath = req.file ? `/uploads/${req.file.filename}`  : null;

        const newRecipe = new Recipe({
            title,
            description,
            category,
            ingredients,
            steps,
            userId,
            username,
            image: imagePath // Store image path in the database
        });

        await newRecipe.save();
        res.status(201).json({newRecipe, success:true});
       
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).send('Server error');
    }
});

router.get('/',async(req,res)=>{
    try {
        const data = await Recipe.find();
        console.log('im calling');
        
        res.status(200).json(data);

    } catch (error) {
        console.log('error in finding data',error);
        
        res.json(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const data = await Recipe.findById(recipeId);

        if (!data) {
            return res.status(404).json({ message: ' recipe not found' });
        }

        console.log('Fetched data');
        res.status(200).json(data);
    } catch (error) {
        console.error('Error in finding data', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//for likes
router.post('/:recipeId/:boolean', async(req, res) => {
    const recipeId = req.params.recipeId;
    const boolean=req.params.boolean;
    console.log(recipeId);
    console.log('boolean->',boolean);
    
   const data= await Recipe.findById(recipeId);
   console.log(data.likes);
   if(boolean){
    data.likes+=1;
    
   }
   else{
    data.likes-=1;
   }
   await data.save()
   console.log(data);
   
     
  });
  // for comments

  router.post('/:recipeId/comment', (req, res) => {
    const recipeId = req.params.recipeId;
    const { text, userId } = req.body; // Assuming `text` is the comment text and `userId` is the ID of the user making the comment
    
    const newComment = {
      text,
      user: userId,
    };
    
    Recipe.findByIdAndUpdate(
      recipeId,
      { $push: { comments: newComment } }, // Add the new comment to the comments array
      { new: true }
    )
    .populate('comments.user', 'username') // Optional: Populate the user's information
    .then((recipe) => res.json(recipe))
    .catch((error) => res.status(500).json({ error: 'Failed to post comment' }));
  });
  

module.exports=router;