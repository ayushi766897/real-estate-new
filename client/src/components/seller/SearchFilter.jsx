import { useState } from "react";
import properties from './properties.json'


const SearchFilter = () => {
  const [rating, setRating] = useState(0);
  const [status, setStatus] = useState("");
  const [daysAgo, setDaysAgo] = useState("");

  // Function to convert "X days ago" to a number
  const extractDays = (time) => {
    const match = time.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // Filtering logic
  const filteredProperties = properties.filter((property) => {
    return (
      (rating === 0 || property.rating >= rating) &&
      (status === "" || property.status.toLowerCase().includes(status.toLowerCase())) &&
      (daysAgo === "" || extractDays(property.time) <= parseInt(daysAgo))
    );
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Filter Panel */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-wrap items-center gap-4">
        {/* Rating Filter */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Rating (Above)</label>
          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            className="mt-2 w-40"
          />
          <span className="text-gray-800 font-semibold">{rating}</span>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="">All</option>
            <option value="For Sale">For Sale</option>
            <option value="For Rent">For Rent</option>
            <option value="For Buy">For Buy</option>
          </select>
        </div>

        {/* Time Filter */}
        <div className="flex flex-col">
          <label className="text-gray-600 font-medium">Listed (Days Ago)</label>
          <input
            type="number"
            placeholder="Days ago"
            value={daysAgo}
            onChange={(e) => setDaysAgo(e.target.value)}
            className="border p-2 rounded-md w-32"
          />
        </div>
      </div>

      {/* Property Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredProperties.length > 0 ? (
          filteredProperties.map((property) => (
            <div key={property.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-lg font-semibold">{property.title}</h2>
                <p className="text-gray-600">{property.location}</p>
                <p className="text-gray-800 font-semibold">{property.price}</p>
                <p className="text-gray-600">{property.beds} Beds | {property.baths} Baths | {property.size}</p>
                <p className="text-yellow-500 font-bold">⭐ {property.rating}</p>
                <p className="text-gray-500">{property.time} • {property.status}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">No properties match the filters.</p>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
