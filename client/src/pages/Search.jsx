import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ListingItem from "../components/seller/ListingItem";
import propertiesData from "../components/seller/properties.json";
import { Search, Home, ArrowUpDown, X } from "lucide-react";

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState([]);
  const [selectedBeds, setSelectedBeds] = useState([]);
  const [selectedBaths, setSelectedBaths] = useState([]);
  const [listings, setListings] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setSearchTerm(urlParams.get("searchTerm") || "");

    const typeFilter = urlParams.get("type") ? urlParams.get("type").split(",") : [];
    setSelectedType(typeFilter);

    const bedsFilter = urlParams.get("beds") ? urlParams.get("beds").split(",").map(Number) : [];
    setSelectedBeds(bedsFilter);

    const bathsFilter = urlParams.get("baths") ? urlParams.get("baths").split(",").map(Number) : [];
    setSelectedBaths(bathsFilter);

    filterListings(searchTerm, typeFilter, bedsFilter, bathsFilter);
  }, [location.search, sortOption]);

  const filterListings = (search, typeFilter, bedsFilter, bathsFilter) => {
    let filtered = propertiesData.filter((property) => {
      return (
        !property.deleted &&
        (search === "" ||
          property.title.toLowerCase().includes(search.toLowerCase()) ||
          property.location.toLowerCase().includes(search.toLowerCase())) &&
        (typeFilter.length === 0 || typeFilter.includes(property.status?.toLowerCase())) &&
        (bedsFilter.length === 0 || bedsFilter.includes(property.beds)) &&
        (bathsFilter.length === 0 || bathsFilter.includes(property.baths))
      );
    });

    // Apply sorting based on sortOption
    if (sortOption === "priceLowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighToLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setListings(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    updateURL();
  };

  const handleFilterChange = (filterType, value) => {
    let updatedFilters;
    if (filterType === "type") {
      updatedFilters = selectedType.includes(value)
        ? selectedType.filter((t) => t !== value)
        : [...selectedType, value];
      setSelectedType(updatedFilters);
    } else if (filterType === "beds") {
      updatedFilters = selectedBeds.includes(value)
        ? selectedBeds.filter((b) => b !== value)
        : [...selectedBeds, value];
      setSelectedBeds(updatedFilters);
    } else if (filterType === "baths") {
      updatedFilters = selectedBaths.includes(value)
        ? selectedBaths.filter((b) => b !== value)
        : [...selectedBaths, value];
      setSelectedBaths(updatedFilters);
    }
    updateURL();
  };

  const updateURL = () => {
    const urlParams = new URLSearchParams();
    if (searchTerm) urlParams.set("searchTerm", searchTerm);
    if (selectedType.length > 0) urlParams.set("type", selectedType.join(","));
    if (selectedBeds.length > 0) urlParams.set("beds", selectedBeds.join(","));
    if (selectedBaths.length > 0) urlParams.set("baths", selectedBaths.join(","));

    navigate(`/search?${urlParams.toString()}`);
  };

  // Animation variants for components
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  const iconVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
    tap: { scale: 0.9 },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.3, type: "spring", stiffness: 120 },
    },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, type: "spring", stiffness: 100 },
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 relative overflow-hidden"
    >
      {/* Animated Background Particles */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div
          className="absolute w-6 h-6 bg-blue-500 rounded-full opacity-40"
          animate={{ y: [-20, 20, -20], x: [10, -10, 10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "10%", left: "15%" }}
        />
        <motion.div
          className="absolute w-8 h-8 bg-teal-500 rounded-full opacity-40"
          animate={{ y: [30, -30, 30], x: [-15, 15, -15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "40%", left: "70%" }}
        />
        <motion.div
          className="absolute w-5 h-5 bg-purple-500 rounded-full opacity-40"
          animate={{ y: [-15, 15, -15], x: [20, -20, 20] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "60%", left: "30%" }}
        />
        <motion.div
          className="absolute w-7 h-7 bg-indigo-500 rounded-full opacity-40"
          animate={{ y: [25, -25, 25], x: [-10, 10, -10] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "80%", left: "50%" }}
        />
      </motion.div>

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Search Bar with Sort By Toggle */}
        <div className="mb-4 flex items-center space-x-3">
          <motion.form
            onSubmit={handleSearch}
            variants={itemVariants}
            className="flex-1 flex items-center border border-gray-600 rounded-xl overflow-hidden bg-gray-800 shadow-md"
          >
            <div className="relative w-full">
              <motion.div
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <Search className="w-5 h-5" />
              </motion.div>
              <input
                type="text"
                placeholder="Search by title or location..."
                className="w-full pl-10 p-3 outline-none text-gray-200 bg-gray-800 placeholder-gray-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <motion.button
              type="submit"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-blue-500 text-white px-4 py-3 hover:bg-blue-600 transition-colors"
            >
              Search
            </motion.button>
          </motion.form>

          {/* Sort By Toggle Button */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <motion.button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="bg-gray-800 text-gray-200 px-3 py-3 rounded-xl shadow-md flex items-center space-x-2 hover:bg-gray-700 transition-colors"
            >
              <ArrowUpDown className="w-5 h-5 text-blue-400" />
              <span>Sort By</span>
            </motion.button>

            {/* Sort By Dropdown */}
            {showSortDropdown && (
              <motion.div
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg p-3 z-20"
              >
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSortOption("priceLowToHigh");
                      setShowSortDropdown(false);
                      filterListings(searchTerm, selectedType, selectedBeds, selectedBaths);
                      setShowModal(true);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Price: Low to High
                  </button>
                  <button
                    onClick={() => {
                      setSortOption("priceHighToLow");
                      setShowSortDropdown(false);
                      filterListings(searchTerm, selectedType, selectedBeds, selectedBaths);
                      setShowModal(true);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Price: High to Low
                  </button>
                  <button
                    onClick={() => {
                      setSortOption("newest");
                      setShowSortDropdown(false);
                      filterListings(searchTerm, selectedType, selectedBeds, selectedBaths);
                      setShowModal(true);
                    }}
                    className="w-full text-left px-3 py-2 text-gray-300 hover:bg-gray-700 rounded-md transition-colors"
                  >
                    Newest First
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Filters Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
        >
          {/* Property Type Filter */}
          <motion.div
            variants={itemVariants}
            className="p-3 bg-gray-800 rounded-lg shadow-md"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-200">
              <Home className="w-5 h-5 mr-2 text-blue-400" />
              Property Type
            </h3>
            <div className="space-y-2">
              {["for sale", "for rent"].map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedType.includes(type)}
                    onChange={() => handleFilterChange("type", type)}
                    className="accent-blue-500"
                  />
                  <span className="capitalize text-gray-300">{type}</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Beds Filter */}
          <motion.div
            variants={itemVariants}
            className="p-3 bg-gray-800 rounded-lg shadow-md"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-200">
              <Home className="w-5 h-5 mr-2 text-blue-400" />
              Bedrooms
            </h3>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((bed) => (
                <label key={bed} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBeds.includes(bed)}
                    onChange={() => handleFilterChange("beds", bed)}
                    className="accent-blue-500"
                  />
                  <span className="text-gray-300">{bed} Beds</span>
                </label>
              ))}
            </div>
          </motion.div>

          {/* Baths Filter */}
          <motion.div
            variants={itemVariants}
            className="p-3 bg-gray-800 rounded-lg shadow-md"
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <h3 className="text-lg font-semibold mb-2 flex items-center text-gray-200">
              <Home className="w-5 h-5 mr-2 text-blue-400" />
              Bathrooms
            </h3>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((bath) => (
                <label key={bath} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedBaths.includes(bath)}
                    onChange={() => handleFilterChange("baths", bath)}
                    className="accent-blue-500"
                  />
                  <span className="text-gray-300">{bath} Baths</span>
                </label>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Listings Section */}
        <motion.div variants={containerVariants}>
          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold mb-4 text-gray-200"
          >
            Listing Results
          </motion.h1>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {listings.length === 0 ? (
              <motion.p
                variants={itemVariants}
                className="text-center text-gray-400 col-span-full"
              >
                No properties found.
              </motion.p>
            ) : (
              listings.map((property, index) => (
                <motion.div
                  key={property.id}
                  layout
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <ListingItem property={property} />
                </motion.div>
              ))
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Modal for Top Sorted Properties */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto relative"
          >
            <motion.button
              onClick={() => setShowModal(false)}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
            >
              <X className="w-6 h-6" />
            </motion.button>
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              Top 3 {sortOption === "priceLowToHigh" ? "Cheapest" : sortOption === "priceHighToLow" ? "Most Expensive" : "Newest"} Properties
            </h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {listings.length === 0 ? (
                <motion.p
                  variants={itemVariants}
                  className="text-center text-gray-400 col-span-full"
                >
                  No properties found.
                </motion.p>
              ) : (
                listings.slice(0, 3).map((property, index) => (
                  <motion.div
                    key={property.id}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={index}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <ListingItem property={property} />
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}