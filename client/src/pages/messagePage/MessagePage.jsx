import { useEffect, useState } from "react";
import axios from "axios";
import { FaRegCommentDots } from "react-icons/fa";

const MessagePage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (Array.isArray(res.data)) {
          setUsers(res.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
      }
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (receiverId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`/messages/${receiverId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(res.data);
      setSelectedUser(receiverId);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!message) return;
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/messages",
        { receiver: selectedUser, message },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, { sender: "me", message }]);
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Users List */}
      <div className="w-1/3 bg-white shadow-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="space-y-3">
          {Array.isArray(users) &&
            users.map((user) => (
              <div
                key={user._id}
                className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-200 cursor-pointer"
              >
                <span className="font-medium">{user.name}</span>
                <FaRegCommentDots
                  className="text-blue-500 text-xl cursor-pointer"
                  onClick={() => fetchMessages(user._id)}
                />
              </div>
            ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-2/3 flex flex-col bg-white shadow-lg p-4">
        {selectedUser ? (
          <>
            <h2 className="text-xl font-semibold mb-4">
              Chat with {users.find((u) => u._id === selectedUser)?.name}
            </h2>
            <div className="flex-1 overflow-y-auto p-4 border rounded-lg bg-gray-50 h-80">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 my-2 rounded-lg w-fit ${
                    msg.sender === "me" ? "ml-auto bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                >
                  {msg.message}
                </div>
              ))}
            </div>
            <div className="flex items-center mt-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border p-2 rounded-lg"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500 text-center mt-20">Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default MessagePage;
