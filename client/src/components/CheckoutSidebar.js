import React from "react";

const CheckoutSidebar = ({ cart, isOpen, onClose, onGoToShop, onQuantityChange }) => {
  const handleCheckout = () => {
    onClose(); // Close the sidebar
    window.location.href = "/checkout"; // Redirect to the checkout page without `useNavigate`
  };

  const handleIncrement = (productId) => {
    onQuantityChange(productId, cart[productId].quantity + 1);
  };

  const handleDecrement = (productId) => {
    if (cart[productId].quantity > 1) {
      onQuantityChange(productId, cart[productId].quantity - 1);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 w-80 bg-white shadow-lg h-full transform transition-transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
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
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4 py-1 border bg-white text-gray-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">Your cart is empty.</p>
        )}
        <div className="space-y-4">
          <button
            onClick={handleCheckout}
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={onGoToShop}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Back to Shop
          </button>
          <button
            onClick={onClose}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSidebar;
