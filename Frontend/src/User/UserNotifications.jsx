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
            const user_id = 52;
            
    
            console.log("User Object from localStorage:", user);
            console.log("hello",user_id);
    
            const response = await axios.post("http://localhost:4001/User/get-chats", {
                super_user_id: user_id,
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
        }, 5000); // poll every 5 seconds
      
        return () => clearInterval(interval); // clean up
      }, [selectedChat]);
      
    
    return (
        <div className="flex h-screen w-full bg-white">
        {/* Left Chat List */}
        <div className="w-[30%] border-r p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4">Chats</h2>
            <ul className="space-y-3">
            {chats.map((chat, index) => (
    <li
        key={index}
        className="p-4 rounded-lg border shadow hover:bg-gray-100 cursor-pointer transition-all"
        onClick={async () => {
            try {
              setSelectedChat(chat); // <--- FIX ADDED HERE
              const response = await axios.post("http://localhost:4001/User/get-chat-by-id", {
                ucid: chat.ucid,
              });
              console.log("Messages for UCID:", chat.ucid, response.data.messages);
              setMessages(response.data.messages);
            } catch (err) {
              console.error("Failed to fetch messages:", err);
            }
          }}
          
    >
        <div className="font-semibold text-lg text-gray-800 truncate">{chat.ucid}</div>
        <div className="text-sm text-gray-600">
        Admin ID: {chat.party2_admin_id}
        </div>
        <div className="text-xs text-gray-400">
        Created: {new Date(chat.created_at).toLocaleString()}
        </div>
    </li>
    ))}



            </ul>
        </div>

        {/* Right Chat View Placeholder */}
       {/* Right Chat View */}
<div className="w-[70%] p-6 flex flex-col relative overflow-y-auto">
  <h3 className="text-xl text-gray-700 mb-4">Messages</h3>

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
    />
    <button
  onClick={async () => {
    if (!newMessage.trim() || !selectedChat) return;

    const user = JSON.parse(localStorage.getItem(" Users"));

    const payload = {
      ucid: selectedChat.ucid,
      sender_id: 52,
      reciever_id: selectedChat.party2_admin_id,
      message_type: "text",
      message: newMessage,
    };

    console.log("Sending to /User/send-message:", payload); // 👈 Logs exactly what is sent

    try {
      const response = await axios.post(
        "http://localhost:4001/User/send-message",
        payload
      );

      console.log("Response from /User/send-message:", response.data); // 👈 Optional: Log API response

      // Add to UI immediately
      setMessages((prev) => [
        ...prev,
        {
          Message: newMessage,
          sender_id: 52,
          timestamp: new Date().toISOString(),
        },
      ]);

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  }}
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
>
  Send
</button>

  </div>
</div>

    
</div>
        
    );
    };

    export default UserNotifications;
