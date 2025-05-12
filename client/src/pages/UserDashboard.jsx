import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import properties from "../components/seller/properties.json";
import { FaHeart, FaTrash, FaUser, FaEnvelope, FaSave } from "react-icons/fa";

const UserDashboard = () => {
  const { user } = useContext(AuthContext);
  const [savedProperties, setSavedProperties] = useState([]);
  const [likedProperties, setLikedProperties] = useState([]);
  const [responses, setResponses] = useState([]);
  const [activeSection, setActiveSection] = useState("saved");

  useEffect(() => {
    if (user && user.role === "user") {
      // Load saved and liked properties
      const storedSaved = JSON.parse(localStorage.getItem("favorites")) || [];
      const filteredSaved = properties.filter(
        (property) => property?.id && storedSaved.includes(property.id.toString())
      );
      setSavedProperties(filteredSaved);

      const storedLiked = JSON.parse(localStorage.getItem("likedProperties")) || [];
      const filteredLiked = properties.filter(
        (property) => property?.id && storedLiked.includes(property.id.toString())
      );
      setLikedProperties(filteredLiked);

      // Load seller responses
      const allMessages = JSON.parse(localStorage.getItem("propertyMessages")) || {};
      const userResponses = [];
      Object.values(allMessages).forEach((messagesArray) => {
        messagesArray.forEach((msg) => {
          if (msg.userEmail === user.email && msg.isResponse) {
            userResponses.push(msg);
          }
        });
      });
      setResponses(userResponses);
    }
  }, [user]);

  const removeSavedProperty = (id) => {
    const updatedSaved = savedProperties.filter((property) => property?.id !== id);
    setSavedProperties(updatedSaved);

    const storedSaved = JSON.parse(localStorage.getItem("favorites")) || [];
    const newSaved = storedSaved.filter((propId) => propId !== id?.toString());
    localStorage.setItem("favorites", JSON.stringify(newSaved));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex gap-6">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <ul className="space-y-2">
          <li
            onClick={() => setActiveSection("saved")}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
              activeSection === "saved" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaSave />
            Saved Properties
          </li>
          <li
            onClick={() => setActiveSection("liked")}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
              activeSection === "liked" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaHeart />
            Liked Properties
          </li>
          <li
            onClick={() => setActiveSection("messages")}
            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
              activeSection === "messages" ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <FaEnvelope />
            Messages
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {user && (
          <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md mb-6">
            <FaUser className="text-blue-500 text-3xl" />
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name}!</h1>
          </div>
        )}

        {/* Saved Properties Section */}
        {activeSection === "saved" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Saved Properties</h2>
            {savedProperties.length === 0 ? (
              <p className="text-gray-500">You have no saved properties.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <div key={property?.id} className="bg-white p-4 rounded-lg shadow-md">
                    <img
                      src={property?.image}
                      alt={property?.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-lg font-semibold">{property?.title}</h3>
                    <p className="text-gray-500">{property?.location}</p>
                    <p className="font-bold">${property?.price}</p>

                    <button
                      onClick={() => removeSavedProperty(property?.id)}
                      className="mt-3 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 flex items-center gap-2"
                    >
                      <FaTrash />
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Liked Properties Section */}
        {activeSection === "liked" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Liked Properties</h2>
            {likedProperties.length === 0 ? (
              <p className="text-gray-500">You have no liked properties.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {likedProperties.map((property) => (
                  <div key={property?.id} className="bg-white p-4 rounded-lg shadow-md">
                    <img
                      src={property?.image}
                      alt={property?.title}
                      className="w-full h-40 object-cover rounded-lg mb-3"
                    />
                    <h3 className="text-lg font-semibold">{property?.title}</h3>
                    <p className="text-gray-500">{property?.location}</p>
                    <p className="font-bold">${property?.price}</p>
                    <div className="mt-3 text-red-500 flex items-center gap-2">
                      <FaHeart />
                      Liked
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Messages Section */}
        {activeSection === "messages" && (
          <>
            <h2 className="text-2xl font-semibold mb-4">Seller Responses</h2>
            {responses.length === 0 ? (
              <p className="text-gray-500">No responses from sellers yet.</p>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {responses.map((response, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                    <p className="text-gray-600">{response.text}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(response.timestamp).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">Response from seller</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;