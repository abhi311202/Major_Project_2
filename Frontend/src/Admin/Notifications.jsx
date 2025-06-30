    // NotificationPage.jsx
    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import { format, isToday, isYesterday, parseISO } from "date-fns";


    const Notifications = () => {
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
   


    useEffect(() => {
        const fetchChats = async () => {
        try {
            const admin = JSON.parse(localStorage.getItem("Admin"));
            const admin_id = admin?.id;
    
            console.log("Admin Object from localStorage:", admin);
    
            const response = await axios.post("http://localhost:4001/Admin/get-chats", {
            admin_id: admin_id,
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
      
        const interval = setInterval(async () => {
          try {
            const response = await axios.post("http://localhost:4001/Admin/get-msg-by-chat-id", {
              ucid: selectedChat.ucid,
            });
            setMessages(response.data.messages); // 👈 Keep updating the messages
          } catch (err) {
            console.error("Polling error:", err);
          }
        }, 1000); // ⏱️ every 5 seconds
      
        return () => clearInterval(interval); // 🧹 cleanup on chat change
      }, [selectedChat]);
      
      const groupMessagesByDate = (msgs) => {
        const grouped = {};
      
        msgs.forEach((msg) => {
          const date = parseISO(msg.timestamp);
          let label = format(date, "MMMM dd, yyyy");
      
          if (isToday(date)) label = "Today";
          else if (isYesterday(date)) label = "Yesterday";
      
          if (!grouped[label]) {
            grouped[label] = [];
          }
          grouped[label].push(msg);
        });
      
        return grouped;
      };
      
      
    
    return (
        <div className="flex h-screen w-full bg-white">
        {/* Left Chat List */}
        <div className="w-[30%] border-r p-4 overflow-y-auto">
  <h2 className="text-lg font-semibold mb-4">Chats</h2>
  <ul className="space-y-3">
    {chats.map((chat, index) => (
      <li
        key={index}
        className="p-3 rounded-lg border flex items-center gap-3 shadow hover:bg-gray-100 cursor-pointer transition-all"
        onClick={async () => {
          try {
            setSelectedChat(chat);
            const response = await axios.post("http://localhost:4001/Admin/get-msg-by-chat-id", {
              ucid: chat.ucid,
            });
            setMessages(response.data.messages);
          } catch (err) {
            console.error("Failed to fetch messages:", err);
          }
        }}
      >
        {/* Profile Picture */}
        <img
          src={chat.receiver_profile_picture_url}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border"
        />

        {/* Textual Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <p className="font-medium text-gray-800 truncate">
              {chat.receiver_name}
            </p>
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                chat.receiver_is_active ? "bg-green-500" : "bg-red-400"
              }`}
              title={chat.receiver_is_active ? "Online" : "Offline"}
            ></span>
          </div>
          <p className="text-xs text-gray-500 truncate">
            {new Date(chat.created_at).toLocaleString()}
          </p>
        </div>
      </li>
    ))}
  </ul>
</div>



{/* Right Chat View */}
<div className="w-[70%] p-6 flex flex-col relative overflow-y-auto">
  {/* Header with profile image, name, and status */}
  {selectedChat && (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-3">
        <img
          src={selectedChat.receiver_profile_picture_url}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <p className="text-lg font-semibold text-gray-800">
            {selectedChat.receiver_name}
          </p>
          <p className="text-sm text-gray-500">{selectedChat.receiver_username}</p>
        </div>
      </div>

      <span
        className={`text-sm px-3 py-1 rounded-full font-medium ${
          selectedChat.receiver_is_active
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-600"
        }`}
      >
        {selectedChat.receiver_is_active ? "Active" : "Inactive"}
      </span>
    </div>
  )}

{/* Message history */}
<div className="flex-1 overflow-y-auto mb-4 pr-2">
  {messages.length === 0 ? (
    <p className="text-gray-500">Select a chat to view messages</p>
  ) : (
    Object.entries(groupMessagesByDate(messages)).map(
      ([dateLabel, msgs], sectionIdx) => (
        <div key={sectionIdx} className="mb-6">
          {/* Date Label */}
          <div className="text-center text-sm text-gray-600 font-medium mb-4">
            {dateLabel}
          </div>
          <ul className="space-y-3">
            {msgs.map((msg, idx) => {
              const admin = JSON.parse(localStorage.getItem("Admin"));
              const isSentByAdmin = msg.sender_id === admin?.id;

              return (
                <li
  key={idx}
  className={`p-3 rounded-lg w-fit max-w-[80%] break-words whitespace-pre-wrap overflow-hidden ${
    isSentByAdmin
      ? "bg-blue-100 self-end ml-auto"
      : "bg-gray-100 self-start mr-auto"
  }`}
>

                  <div className="text-sm text-gray-800">
                    {msg.Message || "Message content not available"}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )
    )
  )}
</div>


  {/* Input and Send */}
  <div className="flex gap-2 sticky bottom-0 bg-white py-2">
    <input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      className="flex-grow border rounded px-4 py-2"
      placeholder={
        selectedChat?.receiver_is_active
          ? "Type your message..."
          : "User is inactive"
      }
      disabled={!selectedChat?.receiver_is_active}
    />
    <button
      onClick={async () => {
        if (!newMessage.trim() || !selectedChat) return;

        const admin = JSON.parse(localStorage.getItem("Admin"));
        const payload = {
          ucid: selectedChat.ucid,
          sender_id: admin.id,
          reciever_id: selectedChat.party1_superuser_id,
          message_type: "text",
          message: newMessage,
        };

        try {
          await axios.post(
            "http://localhost:4001/Admin/send-message",
            payload
          );

          setMessages((prev) => [
            ...prev,
            {
              Message: newMessage,
              sender_id: admin.id,
              timestamp: new Date().toISOString(),
            },
          ]);

          setNewMessage("");
        } catch (err) {
          console.error("Failed to send message:", err);
        }
      }}
      disabled={!selectedChat?.receiver_is_active}
      className={`px-4 py-2 rounded text-white transition ${
        selectedChat?.receiver_is_active
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-400 cursor-not-allowed"
      }`}
    >
      Send
    </button>
  </div>
</div>


    
</div>
        
    );
    };

    export default Notifications;
