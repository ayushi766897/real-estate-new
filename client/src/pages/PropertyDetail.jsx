import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MdLocationOn } from "react-icons/md";
import { FaHeart, FaSave } from "react-icons/fa";
import { motion } from "framer-motion";
import properties from "../components/seller/properties.json";
import { AuthContext } from "../context/AuthContext";

const PropertyDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [property, setProperty] = useState(null);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!id) return;
        
        // Find property and ensure it's not deleted
        const selectedProperty = properties.find(
            (item) => item.id && 
            item.id.toString() === id.toString() && 
            !item.deleted
        );
        
        if (selectedProperty) {
            setProperty(selectedProperty);
        } else {
            setProperty(null);
        }

        // Fetch messages for this property
        const storedMessages = JSON.parse(localStorage.getItem("propertyMessages")) || {};
        if (storedMessages[id]) {
            setMessages(storedMessages[id]);
        }

        // Check if the property is liked
        const likedProperties = JSON.parse(localStorage.getItem("likedProperties")) || [];
        setLiked(likedProperties.includes(id));

        // Check if the property is saved
        const savedProperties = JSON.parse(localStorage.getItem("favorites")) || [];
        setSaved(savedProperties.includes(id));
    }, [id]);

    if (!property) {
        return <p className="text-center text-xl text-red-500 mt-10">Property not found.</p>;
    }

    const handleSendMessage = () => {
        if (!user || user.role !== "user") {
            alert("Only users can send messages.");
            return;
        }

        if (!message.trim()) {
            alert("Please enter a message.");
            return;
        }

        const propertyOwner = property.owner;

        const storedMessages = JSON.parse(localStorage.getItem("propertyMessages")) || {};
        if (!storedMessages[id]) storedMessages[id] = [];
        storedMessages[id].push({
            text: message,
            timestamp: new Date().toISOString(),
            userEmail: user.email
        });
        localStorage.setItem("propertyMessages", JSON.stringify(storedMessages));

        const storedNotifications = JSON.parse(localStorage.getItem("sellerNotifications")) || {};
        if (!storedNotifications[propertyOwner]) storedNotifications[propertyOwner] = [];

        storedNotifications[propertyOwner].push({
            title: "New Message from User",
            message: `You received a message about "${property.title}".`,
            propertyId: id,
            timestamp: new Date().toISOString(),
            userEmail: user.email,
            read: false
        });

        localStorage.setItem("sellerNotifications", JSON.stringify(storedNotifications));

        alert(`Message sent to the owner: "${message}"`);
        setMessage("");
        setMessages([...messages, { text: message, timestamp: new Date().toISOString(), userEmail: user.email }]);
    };

    const handleLikeProperty = () => {
        if (!user || user.role !== "user") {
            alert("Only users can like properties.");
            return;
        }

        const likedProperties = JSON.parse(localStorage.getItem("likedProperties")) || [];
        if (!likedProperties.includes(id)) {
            likedProperties.push(id);
            localStorage.setItem("likedProperties", JSON.stringify(likedProperties));
            setLiked(true);
        } else {
            const newLiked = likedProperties.filter((propId) => propId !== id.toString());
            localStorage.setItem("likedProperties", JSON.stringify(newLiked));
            setLiked(false);
        }
    };

    const handleSaveProperty = () => {
        if (!user || user.role !== "user") {
            alert("Only users can save properties.");
            return;
        }

        const savedProperties = JSON.parse(localStorage.getItem("favorites")) || [];
        if (!savedProperties.includes(id)) {
            savedProperties.push(id);
            localStorage.setItem("favorites", JSON.stringify(savedProperties));
            setSaved(true);
            alert("Property saved!");
        } else {
            const newSaved = savedProperties.filter((propId) => propId !== id.toString());
            localStorage.setItem("favorites", JSON.stringify(newSaved));
            setSaved(false);
            alert("Property removed from favorites.");
        }
    };

    const scrollToMessage = () => {
        document.getElementById("message-input").scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <img 
                src={property.image || "https://via.placeholder.com/600"} 
                alt={property.title || "No Image Available"} 
                className="w-full h-96 object-cover rounded-lg shadow-md" 
            />
            
            <h1 className="text-3xl font-bold mt-4">{property.title}</h1>
            <div className="flex items-center text-gray-600 mt-2">
                <MdLocationOn className="h-5 w-5 text-red-500 mr-1" />
                <span>{property.location}</span>
            </div>
            <p className="text-lg text-gray-700 mt-3">{property.description}</p>
            <p className="text-2xl font-bold text-blue-600 mt-4">
              ₹{property.price?.replace(/[$,]/g, "") || ""}
            </p>

            {/* Like, Save, and Contact Owner Buttons */}
            {user && user.role === "user" && (
                <div className="flex gap-4 mt-4">
                    <motion.button
                        onClick={handleLikeProperty}
                        className={`flex items-center gap-2 ${liked ? "text-red-500" : "text-gray-400"} hover:text-red-500 transition`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaHeart size={20} />
                        {liked ? "Liked" : "Like"}
                    </motion.button>
                    <motion.button
                        onClick={handleSaveProperty}
                        className={`flex items-center gap-2 ${saved ? "text-green-500" : "text-gray-400"} hover:text-green-500 transition`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <FaSave size={20} />
                        {saved ? "Saved" : "Save"}
                    </motion.button>
                    <motion.button
                        onClick={scrollToMessage}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Contact Owner
                    </motion.button>
                </div>
            )}

            {/* Message Input Section */}
            {user && user.role === "user" && (
                <div className="mt-6" id="message-input">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Send a message to the owner..."
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                        rows="3"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg mt-2 hover:bg-blue-500 transition"
                    >
                        Send Message
                    </button>
                </div>
            )}

            {/* Messages Section */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold mb-4">Messages</h2>
                {messages.length === 0 ? (
                    <p>No messages yet.</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md mb-4">
                            <p className="text-gray-600">{msg.text}</p>
                            <p className="text-sm text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
                            <p className="text-sm text-gray-500">{msg.isResponse ? "Seller" : "You"}</p>
                        </div>
                    ))
                )}
            </div>

            {/* Message for Sellers/Admins */}
            {user && user.role !== "user" && (
                <p className="text-gray-500 mt-4 italic">Sellers & Admins cannot send messages, like, or save properties.</p>
            )}
        </div>
    );
};

export default PropertyDetail;