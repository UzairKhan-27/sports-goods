import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [product, setProduct] = useState({
        product_id: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
        admin_username: null, // Set to null or can be assigned a value if needed
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/products', product, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('Product added:', response.data); // Log the response from the backend
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="product_id" placeholder="Product ID" onChange={handleChange} required />
            <input type="text" name="name" placeholder="Product Name" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
            <input type="number" name="stock" placeholder="Stock Quantity" onChange={handleChange} required />
            <input type="number" name="category_id" placeholder="Category ID" onChange={handleChange} required />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;