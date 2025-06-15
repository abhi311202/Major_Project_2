// NotificationPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const admin_id = localStorage.getItem("Admin"); // Should be "80" or actual value stored
        console.log("Api",admin_id);
        const response = await axios.post("http://localhost:4001/Admin/get-chats", {
          admin_id: admin_id,
        });
        console.log("API Response:", response.data);
        setChats(response.data); // Optional: store for rendering
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <div className="flex h-screen w-full bg-white">
      {/* Left Chat List */}
      <div className="w-[30%] border-r p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <ul className="space-y-3">
          {chats.map((chat, index) => (
            <li key={index} className="p-2 rounded hover:bg-gray-100 cursor-pointer border">
              <div className="font-medium">{chat.user_name}</div>
              <div className="text-sm text-gray-600 truncate">{chat.last_message}</div>
              <div className="text-xs text-gray-400">{chat.time}</div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Chat View Placeholder */}
      <div className="w-[70%] p-4">
        <h3 className="text-xl text-gray-600">Select a chat to view messages</h3>
      </div>
    </div>
  );
};

export default Notifications;
