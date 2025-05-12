import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { MdLocationOn } from "react-icons/md";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const ListingItem = ({ property }) => {
  const { user, addToFavorites } = useContext(AuthContext);
  const [isFavorited, setIsFavorited] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (user) {
      setIsFavorited(!isFavorited);
      addToFavorites(property);
    } else {
      alert("Please login to save properties.");
    }
  };

  // Safeguard against undefined property or properties
  const safePrice = property?.price || "";
  const safePricePerSqft = property?.pricePerSqft || "";

  // Clean price by removing $ and commas, then prepend ₹
  const cleanPrice = safePrice.replace("$", "").replace(",", "");
  const cleanPricePerSqft = safePricePerSqft.replace("$", "").replace(",", "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-xl w-full sm:w-[330px] relative border border-gray-200"
    >
      <Link to={`/property/${property?.id || ""}`}>
        <motion.img
          src={property?.image || ""}
          alt="Property Cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-transform duration-300"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-4 flex flex-col gap-2 w-full bg-gradient-to-t from-white to-transparent"
        >
          <p className="truncate text-lg font-semibold text-slate-700">
            {property?.title || "No Title"}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {property?.location || "No Location"}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-1">{property?.size || "N/A"}</p>
          <p className="text-sm text-gray-600 line-clamp-1">₹{cleanPricePerSqft || "N/A"}</p>
          <p className="text-slate-500 mt-2 font-semibold text-xl">₹{cleanPrice || "N/A"}</p>
        </motion.div>
      </Link>

      <motion.button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 text-red-500 text-xl"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
      >
        {isFavorited ? <FaHeart /> : <FaRegHeart />}
      </motion.button>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95}}
        className="relative"
      >
        <Link
          to={`/payment/${property?.id || ""}`}
          className="block bg-blue-600 text-white text-center py-2 rounded-b-lg hover:bg-blue-700 transition-colors w-full"
        >
          Buy Now
        </Link>
      </motion.div>
    </motion.div>
  );
};

ListingItem.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    location: PropTypes.string,
    price: PropTypes.string,
    beds: PropTypes.number,
    baths: PropTypes.number,
    size: PropTypes.string,
    pricePerSqft: PropTypes.string,
    rating: PropTypes.number,
    time: PropTypes.string,
  }),
};

export default ListingItem;