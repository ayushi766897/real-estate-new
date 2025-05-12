import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = ({ companyName }) => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="bg-gray-800 text-gray-300 py-10 text-center" // Changed to lighter text and adjusted background
    >
      <div className="container mx-auto px-6 flex flex-col items-center">
        <div className="flex space-x-6 text-yellow-500 text-2xl mb-4" style={{ color: '#FFD700' }}> {/* Golden color */}
          <motion.a
            href="#"
            className="hover:text-yellow-600 transition-colors"
            whileHover={{ scale: 1.2 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FaFacebook />
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-yellow-600 transition-colors"
            whileHover={{ scale: 1.2 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <FaTwitter />
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-yellow-600 transition-colors"
            whileHover={{ scale: 1.2 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          >
            <FaInstagram />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/amankumarweb/"
            className="hover:text-yellow-600 transition-colors"
            whileHover={{ scale: 1.2 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <FaLinkedin />
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-yellow-600 transition-colors"
            whileHover={{ scale: 1.2 }}
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          >
            <FaYoutube />
          </motion.a>
        </div>
        <p className="text-sm text-yellow-500" style={{ color: '#FFD700' }}>© {new Date().getFullYear()} All rights reserved.</p>
        <motion.p
          className="text-sm mt-1 text-yellow-500"
          style={{ color: '#FFD700' }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Built by {companyName || "Gudiya and It's Team Real Estate Project"}
        </motion.p>
        <motion.p
          className="text-sm text-yellow-500"
          style={{ color: '#FFD700' }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.7, repeat: Infinity }}
        >
          Under MPS College Agra
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;