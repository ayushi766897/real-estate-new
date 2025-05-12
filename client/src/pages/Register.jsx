import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post(`${API_URL}/auth/register`, { name, email, password, role });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white p-8 shadow-lg rounded-xl w-96 border border-gray-200 backdrop-blur-lg"
        >
            <motion.h1 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-3xl font-bold text-center text-gray-800"
            >
                Register
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-center mt-2"
            >
                Create your account to get started.
            </motion.p>

            {error && (
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-red-500 text-sm text-center mt-3"
                >
                    {error}
                </motion.p>
            )}

            <form onSubmit={handleRegister} className="space-y-4 mt-5">
                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                    required
                />
                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                    required
                />
                <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                    required
                />
                <motion.select
                    whileFocus={{ scale: 1.02 }}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                    required
                >
                    <option value="user">User</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                </motion.select>

                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-all font-semibold shadow-md"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </motion.button>
            </form>

            <p className="text-center text-sm mt-5 text-gray-500">
                Already have an account? <a href="/login" className="text-blue-500 font-semibold hover:underline">Login</a>
            </p>
        </motion.div>
    </div>
);
};

export default Register;
