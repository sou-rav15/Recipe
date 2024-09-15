import React, { useState } from 'react';
import axios from 'axios';
import './SubmitRecipe.css'; // Custom CSS for the book-like styling

const ShareRecipe1 = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ingredients: [''], // Initial empty ingredient
        steps: [''], // Initial empty step
        image: null // Image file
    });
    const [imagePreview, setImagePreview] = useState('');

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleArrayChange = (index, event, fieldName) => {
        const newArray = [...formData[fieldName]];
        newArray[index] = event.target.value;
        setFormData({ ...formData, [fieldName]: newArray });
    };

    const addArrayField = (fieldName) => {
        setFormData({ ...formData, [fieldName]: [...formData[fieldName], ''] });
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
            formDataToSend.append('ingredients', JSON.stringify(formData.ingredients));
            formDataToSend.append('steps', JSON.stringify(formData.steps));
            if (formData.image) {
                formDataToSend.append('image', formData.image);
            }

            const token = localStorage.getItem('token');
            const response = await axios.post('/api/recipes', formDataToSend, {
                headers: { 
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error submitting recipe:', error);
        }
    };

    return (
        <div className="book-container">
            <div className="book">
                <div className="page-left">
                    <h2 className="page-title">Submit Your Recipe</h2>

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
                            <label className="book-label">Ingredients</label>
                            {formData.ingredients.map((ingredient, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    className="book-input mt-2"
                                    value={ingredient}
                                    onChange={(e) => handleArrayChange(index, e, 'ingredients')}
                                    placeholder="Add an ingredient"
                                    required
                                />
                            ))}
                            <button
                                type="button"
                                className="btn-add mt-2"
                                onClick={() => addArrayField('ingredients')}
                            >
                                Add More Ingredients
                            </button>
                        </div>

                        <div className="form-group">
                            <label className="book-label">Steps</label>
                            {formData.steps.map((step, index) => (
                                <textarea
                                    key={index}
                                    className="book-input mt-2"
                                    value={step}
                                    onChange={(e) => handleArrayChange(index, e, 'steps')}
                                    placeholder="Describe each step"
                                    required
                                />
                            ))}
                            <button
                                type="button"
                                className="btn-add mt-2"
                                onClick={() => addArrayField('steps')}
                            >
                                Add More Steps
                            </button>
                        </div>

                        <div className="form-group">
                            <label className="book-label">Recipe Image</label>
                            <input
                                type="file"
                                className="book-input-file"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" />
                            )}
                        </div>

                        <button type="submit" className="btn-submit mt-3">Submit Recipe</button>
                    </form>
                </div>
                <div className="page-right">
                    {/* This area could be an illustration of an open recipe book or a placeholder */}
                </div>
            </div>
        </div>
    );
};

export default ShareRecipe1;
