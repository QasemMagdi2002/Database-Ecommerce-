import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const Auth = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); // For Signup
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // React Router's navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    const endpoint = isLogin
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/register";
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Save JWT token
        onLoginSuccess(); // Notify parent component
        navigate("/shop"); // Navigate to shop page
      } else {
        alert(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Unable to connect to the server");
    } finally {
      setLoading(false); // Hide loader
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Signup"}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : isLogin ? "Login" : "Signup"}
        </Button>
      </form>
      <Button
        className="mt-4 bg-gray-500 hover:bg-gray-600"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </Button>
    </div>
  );
};

export default Auth;
