import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import propertiesData from "../seller/properties.json";

const TrendingProperties = () => {
  const [trendingProperties, setTrendingProperties] = useState([]);

  useEffect(() => {
    // Filter out deleted properties first
    const activeProperties = propertiesData.filter(property => !property.deleted);
    
    // Then sort by rating (if available) or other criteria
    const sortedProperties = [...activeProperties]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3); // Get top 3 properties
      
    setTrendingProperties(sortedProperties);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Trending Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingProperties.map((property) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <img
                  src={property.image}
                alt={property.title}
                className="w-full h-64 object-cover"
                />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{property.title}</h3>
                <p className="text-gray-600 mb-4">{property.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-blue-600">
                    ₹{property.price?.replace(/[$,]/g, "") || ""}
                  </span>
                  <Link
                    to={`/property/${property.id}`}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProperties;