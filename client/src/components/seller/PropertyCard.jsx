import { motion } from "framer-motion";

const PropertyCard = ({ property }) => {
  return (
    <motion.div
      className="w-80 bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      <img className="w-full h-48 object-cover" src={property.image} alt={property.title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{property.title}</h2>
        <p className="text-gray-500 text-sm">{property.location}</p>
        <div className="flex justify-between items-center mt-3">
          <p className="text-lg font-bold text-blue-600">{property.price}</p>
          <p className="text-sm text-gray-500">
            {property.beds} Beds · {property.baths} Baths
          </p>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
          <p>{property.size}</p>
          <p>{property.pricePerSqft}</p>
        </div>
        <div className="flex gap-3 mt-4">
          <button className="w-1/2 py-2 text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition">
            Find Out More
          </button>
          <button className="w-1/2 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600 transition">
            Buy Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
