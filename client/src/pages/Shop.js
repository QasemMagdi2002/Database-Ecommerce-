import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const Shop = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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
            <Button className="mt-4">Add to Cart</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
