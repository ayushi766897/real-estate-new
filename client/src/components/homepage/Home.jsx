import { motion } from "framer-motion";
import AdminDashboard from "../../pages/AdminDashboard";
import SearchFilter from "../../pages/Search";
import SellerDashboard from "../../pages/SellerDashboard";
import UserDashboard from "../../pages/UserDashboard";
import Footer from "../others/Footer";
import SubscribeSection from "../others/SubscribeSection";
import Value from "../others/Value";
import PropertyList from "../seller/PropertyList";
import Header from "./Header";
import HeroSection from "./HeroSection";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import Animated from "../others/animated";
import propertiesData from "../seller/properties.json";
import { CheckCircle, Home, Star } from "lucide-react";

const TrendingProperties = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const sliderRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Sample trending properties data (filtered to exclude deleted properties)
  const trendingProperties = propertiesData
    .filter((property) => !property.deleted)
    .slice(0, 5)
    .map((property, index) => ({
      id: property.id || index + 1,
      title: property.title || "Modern Apartment",
      image:
        property.image ||
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2070",
      price: property.price || "$1500",
      description: property.description || "A stunning property with modern amenities.",
    }));

  // Animation variants for property cards
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  // Modal animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
    exit: { opacity: 0, scale: 0.7, transition: { duration: 0.3 } },
  };

  // Scroll slider left or right
  const scrollSlider = (direction) => {
    const scrollAmount = 300; // Adjust scroll distance
    const newPosition =
      direction === "left"
        ? Math.max(scrollPosition - scrollAmount, 0)
        : scrollPosition + scrollAmount;
    setScrollPosition(newPosition);
    sliderRef.current.style.transform = `translateX(-${newPosition}px)`;
  };

  return (
    <div className="py-12 px-4 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-blue-600 text-center mb-6"
        >
          Trending Properties
        </motion.h2>
        <div className="relative">
          {/* Slider Navigation Buttons */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollSlider("left")}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full z-10"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scrollSlider("right")}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full z-10"
          >
            →
          </motion.button>

          {/* Slider Container */}
          <motion.div
            ref={sliderRef}
            className="flex gap-6 overflow-hidden"
            drag="x"
            dragConstraints={{ left: -1200, right: 0 }}
            transition={{ type: "spring", stiffness: 50 }}
          >
            {trendingProperties.map((property, index) => (
              <motion.div
                key={property.id}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.3 },
                }}
                viewport={{ once: true }}
                className="min-w-[300px] bg-white text-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
                onClick={() => setSelectedProperty(property)}
              >
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{property.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-sm">
                      TRENDING
                    </span>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-lg font-semibold">
                      ₹{property.price.replace("$", "").replace(",", "") || "N/A"}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 truncate">
                    {property.description || "No description"}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Property Details Modal */}
      {selectedProperty && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProperty(null)}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-2xl max-w-lg w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              onClick={() => setSelectedProperty(null)}
            >
              ×
            </button>
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-gray-800">{selectedProperty.title}</h3>
            <p className="text-lg font-semibold text-blue-600 mt-2">
              ₹{selectedProperty.price.replace("$", "").replace(",", "") || "N/A"}
            </p>
            <p className="text-gray-600 mt-2">{selectedProperty.description}</p>
            <Link
              to={`/property/${selectedProperty.id}`}
              className="block w-full bg-blue-600 text-white text-center py-2 mt-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Full Details
            </Link>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); // Get theme state

  useEffect(() => {
    // Filter out deleted properties to ensure they don't show up anywhere
    const activeProperties = propertiesData.filter((property) => !property.deleted);
    // No state update needed since TrendingProperties uses propertiesData directly
  }, []);

  // Animation variants for why choose us cards
  const benefitVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.2,
        duration: 0.7,
        type: "spring",
        stiffness: 120,
      },
    }),
  };

  // Data for Why Choose Us section
  const benefits = [
    {
      id: 1,
      title: "Trusted Expertise",
      description: "Our team of experienced agents ensures you find the perfect property with confidence.",
      icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
    },
    {
      id: 2,
      title: "Exclusive Properties",
      description: "Access a curated selection of premium homes you won’t find anywhere else.",
      icon: <Home className="w-12 h-12 text-blue-600" />,
    },
    {
      id: 3,
      title: "Seamless Experience",
      description: "From search to closing, enjoy a smooth and hassle-free home-buying journey.",
      icon: <Star className="w-12 h-12 text-blue-600" />,
    },
  ];

  return (
    <div
      className={`${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} min-h-screen`}
    >
      {/* Header */}
      <Header />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <HeroSection />
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-12 px-4 bg-gradient-to-br from-blue-50 to-gray-100"
      >
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl md:text-3xl font-bold text-blue-600 text-center mb-4"
          >
            Your Dream Home Awaits
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10"
          >
            Why Choose Us
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.id}
                custom={index}
                variants={benefitVariants}
                initial="hidden"
                whileInView="visible"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.2)",
                  borderColor: "#2563eb",
                  transition: { duration: 0.3 },
                }}
                viewport={{ once: true }}
                className="bg-white text-gray-800 rounded-xl shadow-lg p-6 text-center border border-transparent"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="mb-4"
                >
                  {benefit.icon}
                </motion.div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h4>
                <p className="text-gray-600">{benefit.description}</p>
                <Link
                  to="/about"
                  className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-800 transition-colors"
                >
                  Learn More
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <TrendingProperties />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Value />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <SubscribeSection />
      </motion.div>

      <Footer companyName="Gudiya and It Team Real Estate Project" />
    </div>
  );
};

export default HomePage;