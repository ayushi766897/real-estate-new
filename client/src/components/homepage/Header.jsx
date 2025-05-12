import { FaSearch, FaBell, FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ThemeContext } from "../../context/ThemeContext";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import Input from "../others/Input";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const searchRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
    }
  };

  const getDashboardRoute = () => {
    if (!user) return "/";
    if (user.role === "admin") return "/admin";
    if (user.role === "seller") return "/sellerDashboard";
    return "/dashboard";
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
  };

  const logoVariants = {
    initial: { opacity: 0, scale: 0.8, rotate: -10 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.5, type: "spring", stiffness: 120 },
    },
    hover: {
      scale: 1.1,
      filter: "brightness(1.3)",
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
    tap: { scale: 0.95, transition: { duration: 0.2 } },
  };

  return (
    <header className={`shadow-lg ${theme === "light" ? "bg-white" : "bg-gray-900"} transition-colors duration-300`}>
      <div className="flex justify-between items-center max-w-7xl mx-auto p-4 lg:p-6">
        {/* Logo */}
        <Link to="/">
          <motion.h1
            className="font-extrabold text-2xl sm:text-3xl flex items-center gap-2"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">real</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">estate prime</span>
          </motion.h1>
        </Link>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          className="hidden sm:flex flex-1 max-w-lg mx-4 relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <input
            ref={searchRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search properties..."
            className={`w-full py-2 px-4 pr-12 rounded-full border-2 ${
              theme === "light" ? "border-gray-200 bg-gray-100" : "border-gray-700 bg-gray-800 text-white"
            } focus:outline-none focus:border-fuchsia-500 transition-all duration-300`}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-fuchsia-500 transition"
          >
            <FaSearch size={20} />
          </button>
        </motion.form>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center gap-4">
          <motion.button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-600 hover:text-fuchsia-500 transition"
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </motion.button>
          <motion.button
            onClick={toggleTheme}
            className="text-yellow-500 hover:text-yellow-400 transition"
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" ? <MdDarkMode size={28} /> : <MdLightMode size={28} />}
          </motion.button>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden sm:flex items-center gap-6">
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/contact" className="text-gray-400 hover:text-fuchsia-500 transition font-medium">
              Contact
            </Link>
          </motion.li>
          <motion.li whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }}>
            <Link to="/about" className="text-gray-400 hover:text-fuchsia-500 transition font-medium">
              About
            </Link>
          </motion.li>

          {/* Notification Bell for Sellers */}
          {user && user.role === "seller" && (
            <motion.button
              onClick={() => navigate("/notifications")}
              className="relative text-gray-400 hover:text-fuchsia-500 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaBell size={24} />
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                3
              </span>
            </motion.button>
          )}

          {/* User Profile Dropdown */}
          {user ? (
            <div className="relative">
              <motion.button
                onClick={toggleProfileDropdown}
                className="flex items-center gap-2 text-gray-400 hover:text-fuchsia-500 transition"
                whileHover={{ scale: 1.05 }}
              >
                <FaUserCircle size={28} />
                <span className="font-medium">{user.username || "Profile"}</span>
              </motion.button>
              <AnimatePresence>
                {profileDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl ${
                      theme === "light" ? "bg-white" : "bg-gray-800"
                    } py-2 z-50`}
                  >
                    <Link
                      to={getDashboardRoute()}
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-gray-600 hover:bg-fuchsia-100 hover:text-fuchsia-600 transition"
                    >
                      {user.role === "admin"
                        ? "Admin Dashboard"
                        : user.role === "seller"
                        ? "Seller Dashboard"
                        : "User Dashboard"}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-red-100 hover:text-red-600 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
              <Link to="/login">
                <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-blue-800 transition-all shadow-lg">
                  Login
                </button>
              </Link>
            </motion.div>
          )}

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="text-yellow-500 hover:text-yellow-400 transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === "light" ? <MdDarkMode size={28} /> : <MdLightMode size={28} />}
          </motion.button>
        </ul>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`sm:hidden ${theme === "light" ? "bg-white" : "bg-gray-900"} shadow-xl p-6`}
          >
            <ul className="flex flex-col items-center gap-6">
              <motion.li
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setMenuOpen(false)}
              >
                <Link to="/" className="text-gray-600 hover:text-fuchsia-500 transition font-medium text-lg">
                  Home
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setMenuOpen(false)}
              >
                <Link to="/about" className="text-gray-600 hover:text-fuchsia-500 transition font-medium text-lg">
                  About
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => setMenuOpen(false)}
              >
                <Link to="/contact" className="text-gray-600 hover:text-fuchsia-500 transition font-medium text-lg">
                  Contact
                </Link>
              </motion.li>
              {user && user.role === "seller" && (
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => {
                    setMenuOpen(false);
                    navigate("/notifications");
                  }}
                  className="flex items-center gap-2 text-gray-600 hover:text-fuchsia-500 transition font-medium text-lg"
                >
                  <FaBell size={20} /> Notifications
                </motion.li>
              )}
              {user ? (
                <>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => setMenuOpen(false)}
                  >
                    <Link
                      to={getDashboardRoute()}
                      className="text-gray-600 hover:text-fuchsia-500 transition font-medium text-lg"
                    >
                      {user.role === "admin"
                        ? "Admin Dashboard"
                        : user.role === "seller"
                        ? "Seller Dashboard"
                        : "User Dashboard"}
                    </Link>
                  </motion.li>
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="text-gray-600 hover:text-red-500 transition font-medium text-lg"
                  >
                    Logout
                  </motion.li>
                </>
              ) : (
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setMenuOpen(false)}
                >
                  <Link to="/login" className="text-gray-600 hover:text-fuchsia-500 transition font-medium text-lg">
                    Login
                  </Link>
                </motion.li>
              )}
              <motion.li
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                onClick={() => {
                  setMenuOpen(false);
                  toggleTheme();
                }}
                className="text-gray-600 hover:text-yellow-500 transition font-medium text-lg"
              >
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;