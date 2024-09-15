import React, { useState } from 'react';
import axios from 'axios';
import './SubmitRecipe.css'; 

const ShareRecipe = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category:'',
        ingredients: '', 
        steps: '', 
        username:'',
        userId:'',
        image: null 
    });
    const [imagePreview, setImagePreview] = useState('');
    const userId=localStorage.getItem('userId');
    const username=localStorage.getItem('username');
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });

        // Preview the image
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('category', formData.category);
            formDataToSend.append('ingredients', formData.ingredients);
            formDataToSend.append('steps', formData.steps);
            formDataToSend.append('userId', userId);
            formDataToSend.append('username', username);
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3000/sharerecipe', formDataToSend, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            setFormData({
                title:'',
                description:'',
                category:'',
                ingredients:'',
                steps:'',
                image:null
            });
            setImagePreview('');
            document.getElementById('fileInput').value = '';
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
       
    };

    return (
        <div className="book-container">
            <div className="book">
                <div className="page-left">
                    <h2 className="page-title">Share Your Recipe</h2>

                    <form onSubmit={handleSubmit} encType="multipart/form-data" className="recipe-form">
                        <div className="form-group">
                            <label className="book-label">Recipe Title</label>
                            <input
                                type="text"
                                className="book-input"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Enter your recipe title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="book-label">Recipe Description</label>
                            <textarea
                                className="book-input"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                placeholder="Describe your recipe"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="book-label">Category</label>
                            <textarea
                                className="book-input"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                                placeholder="category"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label className="book-label">Ingredients</label>
                            <textarea
                                className="book-input"
                                name="ingredients"
                                value={formData.ingredients}
                                onChange={handleInputChange}
                                placeholder="List all ingredients"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="book-label">Steps</label>
                            <textarea
                                className="book-input"
                                name="steps"
                                value={formData.steps}
                                onChange={handleInputChange}
                                placeholder="Describe the steps"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="book-label">Recipe Image</label>
                            <input
                                type="file"
                                id="fileInput" 
                                className="book-input-file"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" />
                            )}
                        </div>

                        <button type="submit" className="btn-submit mt-3">Share Recipe</button>
                    </form>
                </div>
                <div className="page-right">
                    {/* This area could be an illustration of an open recipe book or a placeholder */}
                </div>
            </div>
        </div>
    );
};

export default ShareRecipe;
