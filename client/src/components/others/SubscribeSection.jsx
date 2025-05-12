import { useState } from "react";
import { motion } from "framer-motion";

const SubscribeSection = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    try {
      // Mock email send function
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulating API call
      setMessage("Subscription successful! Check your email.");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }}
      className="bg-blue-600 text-white p-10 rounded-lg text-center shadow-lg max-w-2xl mx-auto mt-6 mb-6"
    >
      <h2 className="text-2xl font-bold">Get started with Homyz</h2>
      <p className="mt-2 text-gray-200">
        Subscribe and find super attractive price quotes from us.
        <br /> Find your residence soon.
      </p>
      <div className="mt-4 flex flex-col md:flex-row justify-center gap-4">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 rounded-md text-black w-full md:w-auto"
        />
        <button
          onClick={handleSubscribe}
          className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-blue-600 transition"
        >
          Get Started
        </button>
      </div>
      {message && <p className="mt-3 text-sm">{message}</p>}
    </motion.div>
  );
};

export default SubscribeSection;
