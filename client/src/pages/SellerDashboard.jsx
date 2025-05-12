import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const SellerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: "",
    image: "",
    location: "",
    description: "",
    price: "",
    beds: "",
    baths: "",
    size: "",
    pricePerSqft: "",
    rating: "",
    time: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [isAddProperty, setIsAddProperty] = useState(true); // Control tab navigation (Add Property / All Properties)
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  // Fetch properties from backend
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/properties", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Filter out any properties that might be marked as deleted
        const activeProperties = Array.isArray(data) ? data.filter(prop => !prop.deleted) : [];
        setProperties(activeProperties);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching properties:", err);
      });
  }, [token]);

  // Handle adding a new property
  const handleAddProperty = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/properties/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProperties([...properties, data.property]); // Add the new property to the state
        setNewProperty({
          title: "",
          image: "",
          location: "",
          description: "",
          price: "",
          beds: "",
          baths: "",
          size: "",
          pricePerSqft: "",
          rating: "",
          time: "",
        });
      })
      .catch((err) => {
        alert("Failed to add property");
        console.error(err);
      });
  };

  // Handle block/unblock property
  const handleBlockUnblock = (propertyId) => {
    fetch(`http://localhost:5000/properties/block/${propertyId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Property status updated");
        setProperties(data.properties);
      })
      .catch((err) => console.error(err));
  };

  // Handle delete (soft delete)
  const handleDelete = (propertyId) => {
    if (window.confirm("Are you sure you want to delete this property? This action cannot be undone.")) {
    fetch(`http://localhost:5000/properties/delete/${propertyId}`, {
      method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Show success message
            
            // Update the local properties state by filtering out the deleted property
          setProperties(properties.filter((property) => property.id !== propertyId));
        } else {
          alert("Failed to delete property");
        }
      })
      .catch((err) => {
        console.error("Error deleting property:", err);
        alert("An error occurred while deleting the property");
      });
    }
  };

  // Handle edit property
  const handleEdit = (property) => {
    setEditingProperty(property);
    setShowEditModal(true);
  };

  const submitEdit = () => {
    fetch(`http://localhost:5000/properties/edit/${editingProperty.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingProperty),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        setProperties(properties.map((p) => (p.id === editingProperty.id ? editingProperty : p)));
        setShowEditModal(false); // Close the modal
      })
      .catch((err) => console.error(err));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="p-6 max-w-7xl mx-auto relative overflow-hidden bg-gradient-to-br from-gray-100 to-white rounded-xl shadow-2xl"
    >
      {/* Background Particle Animation */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.1, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <motion.div
          className="absolute w-4 h-4 bg-blue-300 rounded-full"
          animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-6 h-6 bg-green-300 rounded-full top-1/4 left-1/3"
          animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>

      <h2 className="text-3xl font-bold mb-6 text-gray-800 relative z-10">Seller Dashboard</h2>

      {/* Side Navigation */}
      <div className="flex space-x-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col bg-gray-200 p-4 w-1/4 rounded-lg shadow-md"
        >
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-4 bg-blue-600 text-white mb-4 rounded-lg transition-colors"
            onClick={() => setIsAddProperty(true)} // Show Add Property form
          >
            Add Property
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-4 bg-blue-600 text-white rounded-lg transition-colors"
            onClick={() => setIsAddProperty(false)} // Show All Properties list
          >
            All Properties
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-3/4"
        >
          {isAddProperty ? (
            <motion.form
              onSubmit={handleAddProperty}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-4 bg-white p-6 shadow-lg rounded-xl mb-8 relative z-10"
            >
              <input
                type="text"
                placeholder="Title"
                value={newProperty.title}
                onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={newProperty.location}
                onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={newProperty.price}
                onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value.replace("$", "") })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={newProperty.description}
                onChange={(e) => setNewProperty({ ...newProperty, description: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Beds"
                value={newProperty.beds}
                onChange={(e) => setNewProperty({ ...newProperty, beds: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Baths"
                value={newProperty.baths}
                onChange={(e) => setNewProperty({ ...newProperty, baths: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Size (in sqft)"
                value={newProperty.size}
                onChange={(e) => setNewProperty({ ...newProperty, size: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Price per Sqft"
                value={newProperty.pricePerSqft}
                onChange={(e) => setNewProperty({ ...newProperty, pricePerSqft: e.target.value.replace("$", "") })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Rating"
                value={newProperty.rating}
                onChange={(e) => setNewProperty({ ...newProperty, rating: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Time (e.g., 'Recently added')"
                value={newProperty.time}
                onChange={(e) => setNewProperty({ ...newProperty, time: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProperty.image}
                onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#2563eb" }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add Property
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-gray-800 relative z-10">My Properties</h3>
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-gray-500"
                >
                  Loading...
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                  {properties.map((property) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow"
                    >
                      <img src={property.image} alt={property.title} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h4 className="text-xl font-bold mb-2 text-gray-800">{property.title}</h4>
                        <p className="text-gray-600 mb-2">{property.location}</p>
                        <div className="flex gap-4 mb-2">
                          <span className="flex items-center text-gray-600">🛏️ {property.beds}</span>
                          <span className="flex items-center text-gray-600">🚿 {property.baths}</span>
                          <span className="flex items-center text-gray-600">📏 {property.size} sqft</span>
                        </div>
                        <p className="text-lg font-bold text-blue-600 mb-2">₹{property.price?.replace("$", "") || ""}</p>
                        <p className="text-gray-700 mb-4">{property.description}</p>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#eab308" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleEdit(property)}
                            className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition-colors"
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#6b7280" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleBlockUnblock(property.id)}
                            className="bg-gray-500 text-white px-3 py-1 rounded-lg hover:bg-gray-600 transition-colors"
                          >
                            {property.isBlocked ? "Unblock" : "Block"}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05, backgroundColor: "#dc2626" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(property.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 relative z-20"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl"
          >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Edit Property</h3>
            <input
              type="text"
              placeholder="Title"
              value={editingProperty?.title || ""}
              onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={editingProperty?.location || ""}
              onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Price"
              value={editingProperty?.price || ""}
              onChange={(e) => setEditingProperty({ ...editingProperty, price: e.target.value.replace("$", "") })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-2 mt-4">
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#6b7280" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowEditModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                whileTap={{ scale: 0.95 }}
                onClick={submitEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Save Changes
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SellerDashboard;