import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import properties from "../components/seller/properties.json";

const NotificationDashboard = () => {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role === "seller") {
      const storedNotifications = JSON.parse(localStorage.getItem("sellerNotifications")) || {};
      setNotifications(storedNotifications[user.email] || []);
    }
  }, [user]);

  const markAsRead = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications[index].read = true;
    setNotifications(updatedNotifications);

    const storedNotifications = JSON.parse(localStorage.getItem("sellerNotifications")) || {};
    storedNotifications[user.email] = updatedNotifications;
    localStorage.setItem("sellerNotifications", JSON.stringify(storedNotifications));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      {notifications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-600">No notifications yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {notifications.map((notification, index) => {
            const property = properties.find((p) => p.id.toString() === notification.propertyId);

            return (
              <div
                key={index}
                className={`bg-white rounded-lg shadow p-4 ${!notification.read ? "border-l-4 border-blue-500" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{notification.title}</h3>
                    <p className="text-gray-700 mt-1">{notification.message}</p>
                    <p className="text-gray-500 text-sm mt-2">
                      {new Date(notification.timestamp).toLocaleString()}
                    </p>

                    {property && (
                      <div className="mt-2">
                        <p className="text-gray-600">Property: {property.title}</p>
                        <img src={property.image} alt={property.title} className="w-32 h-20 rounded-md mt-2" />
                      </div>
                    )}
                  </div>

                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(index)}
                      className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NotificationDashboard;