import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Checkout = ({ cart, onClearCart }) => {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    postalCode: "",
  });
  const navigate = useNavigate(); // Correctly initialized inside Router context

  const handleInputChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    onClearCart(); // Clear the cart after checkout
    navigate("/shop"); // Redirect to shop page
  };

  // Calculate total price dynamically
  const totalPrice = Object.values(cart).reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            {Object.keys(cart).length > 0 ? (
              Object.values(cart).map((item) => (
                <div key={item._id} className="flex items-center space-x-4 mb-4">
                  <img
                    src={item.image || "https://via.placeholder.com/100"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-gray-600">
                      Quantity: {item.quantity} x ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
            <h2 className="text-xl font-semibold mt-6">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>

          {/* Address and Payment Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-2xl font-semibold">Shipping Address</h2>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={address.name}
                onChange={handleInputChange}
                className="p-2 border rounded"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Street Address</label>
              <input
                type="text"
                name="street"
                value={address.street}
                onChange={handleInputChange}
                className="p-2 border rounded"
                placeholder="Enter your street address"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleInputChange}
                className="p-2 border rounded"
                placeholder="Enter your city"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Postal Code</label>
              <input
                type="text"
                name="postalCode"
                value={address.postalCode}
                onChange={handleInputChange}
                className="p-2 border rounded"
                placeholder="Enter your postal code"
                required
              />
            </div>
            <div className="flex flex-col space-y-2">
              <h2 className="text-2xl font-semibold mt-6">Payment Method</h2>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={handlePaymentChange}
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="visa"
                  checked={paymentMethod === "visa"}
                  onChange={handlePaymentChange}
                />
                <span>Pay with Visa</span>
              </label>
            </div>
            <div className="flex space-x-4">
              <Button type="submit" className="bg-green-500 hover:bg-green-600">
                Place Order
              </Button>
              <Button
                className="bg-gray-500 hover:bg-gray-600"
                onClick={() => navigate("/shop")}
              >
                Back to Shop
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
