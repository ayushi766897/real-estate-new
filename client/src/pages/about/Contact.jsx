import { useState } from "react";
import { motion } from "framer-motion";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000); // Reset after 3 seconds
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        className="bg-white p-6 shadow-lg rounded-xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-lg font-semibold mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-lg font-semibold mb-2">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-lg font-semibold mb-2">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit
          </motion.button>
        </motion.form>

        {/* Success Message */}
        {isSubmitted && (
          <motion.div
            className="mt-6 p-4 bg-green-100 text-green-800 rounded-lg text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-semibold">Thank you for your message! We'll get back to you soon.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
