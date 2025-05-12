import { useState, useEffect } from "react";
import propertiesData from "./properties.json";
import PropertyCard from "./PropertyCard";

const PropertyList = () => {
  const [filters, setFilters] = useState({
    city: "",
    type: "",
    size: "",
    price: "",
    rating: "",
  });
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);

  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".property-card");
      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          item.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    let filtered = propertiesData.filter((property) => {
      return (
        (filters.city === "" || property.city.toLowerCase().includes(filters.city.toLowerCase())) &&
        (filters.type === "" || property.type.toLowerCase() === filters.type.toLowerCase()) &&
        (filters.size === "" || property.size.includes(filters.size)) &&
        (filters.price === "" || parseInt(property.price.replace(/[^0-9]/g, "")) <= parseInt(filters.price)) &&
        (filters.rating === "" || property.rating >= parseInt(filters.rating))
      );
    });
    setFilteredProperties(filtered);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Search Panel */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          name="city"
          placeholder="Search by city/locality..."
          value={filters.city}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="land">Land</option>
          <option value="home">Home</option>
          <option value="office">Office</option>
        </select>
        <input
          type="text"
          name="size"
          placeholder="Size (e.g. 1000 sqft)"
          value={filters.size}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          value={filters.price}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="rating"
          value={filters.rating}
          onChange={handleFilterChange}
          className="p-2 border rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Min Rating</option>
          <option value="1">1 Star</option>
          <option value="2">2 Stars</option>
          <option value="3">3 Stars</option>
          <option value="4">4 Stars</option>
          <option value="5">5 Stars</option>
        </select>
        <button
          onClick={applyFilters}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Search
        </button>
      </div>

      {/* Property Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">No properties match the filters.</p>
        )}
      </div>
    </div>
  );
};

export default PropertyList;
