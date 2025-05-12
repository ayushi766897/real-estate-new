import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function HeroSection() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
  };

  // Container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  // Child variants for individual elements
  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[80vh] relative overflow-hidden bg-gradient-to-br from-blue-100 to-white rounded-b-3xl shadow-2xl"
    >
      {/* Enhanced Background Particle Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div
          className="absolute w-5 h-5 bg-blue-400 rounded-full blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 25, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-7 h-7 bg-green-400 rounded-full top-1/4 left-1/3 blur-md"
          animate={{
            y: [0, -40, 0],
            x: [0, -25, 0],
            scale: [1, 1.7, 1],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute w-4 h-4 bg-purple-400 rounded-full bottom-1/4 right-1/4 blur-sm"
          animate={{
            y: [0, 25, 0],
            x: [0, -15, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            className="flex-1 space-y-6 text-center lg:text-left"
          >
            <motion.h1
              variants={childVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight"
            >
              LUXURIOUS HOME
              <motion.span
                className="block text-blue-600"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1, ease: "backOut" }}
              >
                FOR SALE
              </motion.span>
            </motion.h1>
            <motion.p
              variants={childVariants}
              className="text-gray-600 text-lg max-w-xl mx-auto lg:mx-0"
            >
              Discover your dream home in our exclusive collection of luxury properties.
            </motion.p>
            <motion.div
              variants={childVariants}
              className="flex items-center gap-6 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "#1e293b",
                }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/search")}
                className="px-6 py-3 bg-gray-800 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                SEE MORE
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
              <motion.div
                className="space-y-1 text-center"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <p className="text-sm text-gray-500">START FROM</p>
                <motion.p
                  className="text-2xl font-bold text-blue-600"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ₹150000
                </motion.p>
              </motion.div>
            </motion.div>

            {/* Enhanced Search Bar */}
            <motion.form
              onSubmit={handleSubmit}
              variants={childVariants}
              className="mt-6 w-full max-w-lg mx-auto lg:mx-0"
            >
              <div className="relative">
                <motion.input
                  type="text"
                  placeholder="Search properties by location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
                  whileFocus={{ scale: 1.02, borderColor: "#2563eb" }}
                  transition={{ duration: 0.3 }}
                />
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#1e40af",
                    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.2)",
                  }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Search
                </motion.button>
              </div>
            </motion.form>
          </motion.div>

          {/* Right Image with Enhanced Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "backOut" }}
            className="flex-1 relative"
            whileHover={{ scale: 1.05 }}
          >
            <motion.img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2075"
              alt="Luxury Home"
              className="rounded-3xl shadow-2xl w-full h-auto object-cover"
              whileHover={{ filter: "brightness(1.1)" }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 rounded-3xl border-4 border-blue-600/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default HeroSection;