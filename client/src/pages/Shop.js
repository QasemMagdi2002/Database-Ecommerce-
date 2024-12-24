import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        // Initialize quantity for each product as 1
        const initialCart = {};
        data.forEach((product) => {
          initialCart[product._id] = 1; // Default quantity is 1
        });
        setCart(initialCart);
        setProducts(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Handle quantity increment
  const incrementQuantity = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 1) + 1,
    }));
  };

  // Handle quantity decrement
  const decrementQuantity = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: Math.max((prevCart[productId] || 1) - 1, 1), // Ensure quantity is at least 1
    }));
  };

  // Add product to cart (console log for now, you can expand this later)
  const addToCart = (productId) => {
    console.log(`Added ${cart[productId]} of Product ID: ${productId} to cart`);
    // Logic to send cart details to backend or update global cart state
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product._id} className="p-4 flex flex-col items-center">
            <div className="w-40 h-40 bg-gray-100 flex items-center justify-center">
              <img
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.name}
                className="object-cover w-full h-full"
              />
            </div>
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            {/* Quantity Selector */}
            <div className="flex items-center mt-2">
              <button
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-l"
                onClick={() => decrementQuantity(product._id)}
              >
                -
              </button>
              <span className="px-4 py-1 bg-white border text-gray-800">
                {cart[product._id] || 1}
              </span>
              <button
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-r"
                onClick={() => incrementQuantity(product._id)}
              >
                +
              </button>
            </div>
            {/* Add to Cart Button */}
            <Button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => addToCart(product._id)}
            >
              Add to Cart
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
