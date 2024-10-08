import React, { useState } from 'react';

const AddProduct = () => {
    const [product, setProduct] = useState({
        product_id: '',
        product_name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: '',
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            const data = await response.json();
            console.log('Product added:', data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="product_id" placeholder="Product ID" onChange={handleChange} required />
            <input type="text" name="product_name" placeholder="Product Name" onChange={handleChange} required />
            <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
            <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
            <input type="number" name="stock_quantity" placeholder="Stock Quantity" onChange={handleChange} required />
            <input type="number" name="category_id" placeholder="Category ID" onChange={handleChange} required />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProduct;
