    // NotificationPage.jsx
    import React, { useEffect, useState } from "react";
    import axios from "axios";

    const UserNotifications = () => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");



    useEffect(() => {
        const fetchChats = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("Users"));
            console.log("sans",user.id);
            const user_id = 52;
            
    
            console.log("User Object from localStorage:", user);
            console.log("hello",user_id);
    
            const response = await axios.post("http://localhost:4001/User/get-chats", {
                super_user_id: user.id,
            });
    
            console.log("API Response:", response.data);
    
            if (response.data && Array.isArray(response.data.chats)) {
            setChats(response.data.chats); // ✅ FIXED
            } else {
            console.warn("Unexpected API response:", response.data);
            }
        } catch (error) {
            console.error("Failed to fetch chats:", error);
        }
        };
    
        fetchChats();
    }, []);
    useEffect(() => {
        if (!selectedChat) return;
      
        const user = JSON.parse(localStorage.getItem("Users"));
      
        const interval = setInterval(async () => {
          try {
            const response = await axios.post("http://localhost:4001/User/get-chat-by-id", {
              ucid: selectedChat.ucid,
            });
            setMessages(response.data.messages); // Live update
          } catch (err) {
            console.error("Live polling failed:", err);
          }
        }, 100000); // poll every 5 seconds
      
        return () => clearInterval(interval); // clean up
      }, [selectedChat]);
      
    
    return (
        <div className="flex h-screen w-full bg-white">
        {/* Left Chat List */}
        <div className="w-[30%] border-r p-4 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
  <h2 className="text-lg font-semibold">Chats</h2>
  <button
    onClick={async () => {
      try {
        const response = await axios.get("http://localhost:4001/User/get-admins-to-start-chat");
        console.log("Available admins to start chat:", response.data);
      } catch (err) {
        console.error("Failed to fetch admins:", err);
      }
    }}
    className="text-blue-600 hover:text-blue-800 transition text-xl"
    title="Start New Chat"
  >
    +
  </button>
</div>

            <ul className="space-y-3">
            {chats.map((chat, index) => (
  <li
    key={index}
    className="p-3 rounded-lg border shadow hover:bg-gray-100 cursor-pointer transition-all"
    onClick={async () => {
      try {
        setSelectedChat(chat);
        const response = await axios.post("http://localhost:4001/User/get-chat-by-id", {
          ucid: chat.ucid,
        });
        setMessages(response.data.messages);
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    }}
  >
    <div className="flex items-center space-x-3">
      <img
        src={chat.reciever_profile_picture_url}
        alt="Profile"
        className="w-12 h-12 rounded-full object-cover"
      />
      <div>
        <div className="font-semibold text-md text-gray-800">
          {chat.reciever_name}
        </div>
        <div className="text-xs text-gray-400">
          Created: {new Date(chat.created_at).toLocaleString()}
        </div>
      </div>
    </div>
  </li>
))}




            </ul>
        </div>


{/* Right Chat View */}
<div className="w-[70%] p-6 flex flex-col relative overflow-y-auto">
{selectedChat && (
  <div className="flex items-center space-x-3 mb-4 border-b pb-3">
    <img
      src={selectedChat.reciever_profile_picture_url}
      alt="Receiver"
      className="w-10 h-10 rounded-full object-cover"
    />
    <div className="flex flex-col">
      <span className="text-lg font-semibold text-gray-800">{selectedChat.reciever_name}</span>
      <span className={`text-sm ${selectedChat.reciever_is_active ? "text-green-600" : "text-red-500"}`}>
        {selectedChat.reciever_is_active ? "Active" : "Inactive"}
      </span>
    </div>
  </div>
)}


  <div className="flex-1 overflow-y-auto mb-4">
    {messages.length === 0 ? (
      <p className="text-gray-500">Select a chat to view messages</p>
    ) : (
      <ul className="space-y-3">
        {messages.map((msg, idx) => {
          const user = JSON.parse(localStorage.getItem("Users"));
          return (
            <li
              key={idx}
              className={`p-3 rounded-lg w-fit max-w-[80%] ${
                msg.sender_id === 52
                  ? "bg-blue-100 self-end ml-auto"
                  : "bg-gray-100 self-start mr-auto"
              }`}
            >
              <div className="text-sm text-gray-800">
                {msg.Message || "Message content not available"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleString()}
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </div>

  {/* Input box and Send button aligned horizontally */}
  <div className="flex gap-2 sticky bottom-0 bg-white py-2">
  <input
    type="text"
    value={newMessage}
    onChange={(e) => setNewMessage(e.target.value)}
    className="flex-grow border rounded px-4 py-2"
    placeholder="Type your message..."
    disabled={!selectedChat?.reciever_is_active}
  />
  <button
    onClick={async () => {
      if (!newMessage.trim() || !selectedChat) return;

      const payload = {
        ucid: selectedChat.ucid,
        sender_id: user.id,
        reciever_id: selectedChat.party2_admin_id,
        message_type: "text",
        message: newMessage,
      };

      try {
        const response = await axios.post(
          "http://localhost:4001/User/send-message",
          payload
        );

        setMessages((prev) => [
          ...prev,
          {
            Message: newMessage,
            sender_id: user.id,
            timestamp: new Date().toISOString(),
          },
        ]);

        setNewMessage("");
      } catch (err) {
        console.error("Failed to send message:", err);
      }
    }}
    className={`px-4 py-2 rounded text-white transition ${
      selectedChat?.reciever_is_active
        ? "bg-blue-600 hover:bg-blue-700"
        : "bg-gray-400 cursor-not-allowed"
    }`}
    disabled={!selectedChat?.reciever_is_active}
  >
    Send
  </button>
</div>

</div>

    
</div>
        
    );
    };

    export default UserNotifications;
