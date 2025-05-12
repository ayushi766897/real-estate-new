import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const API_URL = "http://localhost:5000";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login, user } = useContext(AuthContext);

    // Redirect if already logged in
    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                navigate("/admin");
            } else if (user.role === 'seller') {
                navigate("/sellerDashboard");
            } else {
                navigate("/dashboard");
            }
        }
    }, [user, navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post(`${API_URL}/auth/login`, { email, password });
            const { token, user } = response.data;
            
            login(user, token);
            
            // Redirect based on role
            if (user.role === 'admin') {
                navigate("/admin");
            } else if (user.role === 'seller') {
                navigate("/sellerDashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed!");
        }

        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-gray-900/95 backdrop-blur-xl p-8 shadow-xl rounded-2xl w-96 border border-gray-700"
            >
                <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-extrabold text-center text-white"
                >
                    Login
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-400 text-center mt-3"
                >
                    Sign in to access your account.
                </motion.p>

                {error && (
                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-red-400 text-sm text-center mt-4"
                    >
                        {error}
                    </motion.p>
                )}

                <form onSubmit={handleLogin} className="space-y-6 mt-6">
                    <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#3B82F6" }}
                        type="email"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 placeholder-gray-500 transition"
                        required
                    />
                    <motion.input
                        whileFocus={{ scale: 1.02, borderColor: "#3B82F6" }}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-800 text-gray-200 placeholder-gray-500 transition"
                        required
                    />

                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03, backgroundColor: "#2563EB" }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-3 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all font-semibold shadow-lg"
                        disabled={loading}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </motion.button>
                </form>

                <p className="text-center text-sm mt-6 text-gray-400">
                    New here? <a href="/register" className="text-blue-400 font-semibold hover:text-blue-300 transition">Create an account</a>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;