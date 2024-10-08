import React, { useState, useEffect } from 'react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [error, setError] = useState(null); // State for error handling

  // Fetch the products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products'); // Using fetch instead of axios
        if (!response.ok) {
          throw new Error('Network response was not ok'); // Handle HTTP errors
        }
        const data = await response.json(); // Parse JSON from the response
        setProducts(data); // Set products in state
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products.'); // Set error message if fetching fails
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchProducts();
  }, []);

  // Display loading message while waiting for data
  if (loading) {
    return <p>Loading products...</p>;
  }

  // Display error message if there was an error fetching products
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Product List</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((product) => (
            <li key={product.product_id}>
              <strong>{product.product_name}</strong>: {product.description} - ${product.price} (Stock: {product.stock_quantity})
            </li>
          ))}
        </ul>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;
