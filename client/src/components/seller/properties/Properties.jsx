import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import propertiesData from "../properties.json";
import ListingItem from "../ListingItem";
import { Search } from "lucide-react";

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search") || "";

    setSearchTerm(query);

    if (!propertiesData || propertiesData.length === 0) {
      setFilteredProperties([]);
      return;
    }

    // First filter out deleted properties, then apply search filter
    const activeProperties = propertiesData.filter(property => !property.deleted);
    
    const filtered = activeProperties.filter((property) =>
      (property?.title?.toLowerCase() || "").includes(query.toLowerCase()) ||
      (property?.location?.toLowerCase() || "").includes(query.toLowerCase())
    );
    
    setFilteredProperties(filtered);
  }, [location.search]);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Properties</h1>
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-gray-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </div>

      {/* Property Listings */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.length === 0 ? (
          <p className="text-center text-gray-600 text-lg col-span-full">
            No properties found.
          </p>
        ) : (
          filteredProperties.map((property) => (
            <ListingItem key={property?.id} property={property} />
          ))
        )}
      </div>
    </div>
  );
}
