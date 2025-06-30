    // NotificationPage.jsx
    import React, { useEffect, useState } from "react";
    import axios from "axios";
    import toast from "react-hot-toast";

    const UserNotifications = () => {
    const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable
    const [chats, setChats] = useState([]);
    const [messages, setMessages] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState("");
    const [availableAdmins, setAvailableAdmins] = useState([]);
    const [showAdminModal, setShowAdminModal] = useState(false);

    const [profileData, setProfileData] = useState({});
    const [superAdminStatus, setSuperAdminStatus] = useState("not_requested");
  
    const storedObjectString = localStorage.getItem("Users");
   
    const myObject = JSON.parse(storedObjectString);
    console.log(myObject);
    
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const storedObjectString = localStorage.getItem("Users");
          const myObject = JSON.parse(storedObjectString);
    
          if (!myObject?.id) return console.error("User ID not found in localStorage");
    
          const payload = { id: myObject.id };
          const res = await axios.post(`${baseURL}/User/get-profile-data`, payload);
    
          console.log("✅ Profile Data Response from Backend333:", res.data);
    
          // ✅ Access only the 'data' inside res.data
          const profile = res.data.data;
    
          setProfileData({
            userId: profile.id,
            profile: profile.profile_picture_url,
            name: profile.name,
            username: profile.username,
            email: profile.email,
            phone: profile.phone,
            dob: profile.dob,
            gender: profile.gender,
            aadhaar: profile.aadhar,
            profession: profile.profession,
            organisation: profile.organization,
            created_at: profile.created_at,
            validity_start_date: profile.validity_start_date,
            validity_end_date: profile.validity_end_date,
            user_type: profile.user_type,
            order_id: profile.order_id,
  
          });
    
        } catch (error) {
          console.error("❌ Error fetching profile data:", error);
        }
      };
    
      fetchProfileData();
    }, []);




    useEffect(() => {
        const fetchChats = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("Users"));
            console.log("sans",user.id);
            
            
    
            console.log("User Object from localStorage:", user);
            console.log("hello",user.id);
    
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
        }, 2000); // poll every 5 seconds
      
        return () => clearInterval(interval); // clean up
      }, [selectedChat]);
      
    
    return (
      <>
      {profileData.user_type === "super user" ? (
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
      setAvailableAdmins(response.data.admins);
      setShowAdminModal(true);
    } catch (err) {
      console.error("Failed to fetch admins:", err);
    }
  }}
  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
  title="Start New Chat"
>
  <span className="text-lg">New Chat</span>
  <span className="text-xl font-bold">+</span>
</button>

</div>
{showAdminModal && (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
      <h3 className="text-lg font-semibold mb-4">Start New Chat</h3>
      <ul className="space-y-3 max-h-[300px] overflow-y-auto">
        {availableAdmins.map((admin) => (
          <li
            key={admin.id}
            onClick={async () => {
              try {
                const user = JSON.parse(localStorage.getItem("Users"));
                const admin = JSON.parse(localStorage.getItem("Admin"));
                const payload = {
                  super_user_id: user.id,
                  admin_id: admin.id,
                };
                const response = await axios.post("http://localhost:4001/User/new-chat", payload);
                console.log("New chat created:", response.data);
            
                const newChat = response.data.chat;
            
                // Check if chat with the same UCID already exists
                const alreadyExists = chats.some((chat) => chat.ucid === newChat.ucid);
            
                if (alreadyExists) {
                  toast.success("Chat already exists with this admin.");
                } else {
                  setChats((prev) => [newChat, ...prev]);
                }
            
                setShowAdminModal(false); // close modal
              } catch (err) {
                console.error("Failed to start new chat:", err);
              }
            }}
            
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-100 p-2 rounded"
          >
            <img
              src={admin.profile_picture_url}
              alt={admin.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-gray-800">{admin.name}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">
        <button
          onClick={() => setShowAdminModal(false)}
          className="text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


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
                msg.sender_id === user.id
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
      const user = JSON.parse(localStorage.getItem("Users"));
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
) : (  <div className="h-screen w-full flex items-center justify-center bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black transition">
  <div className="w-[90%] max-w-lg bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center justify-center gap-6 animate-fade-in">
    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
      Premium Access Required
    </h2>
    <p className="text-gray-600 dark:text-gray-300 text-md px-4">
      You need to upgrade to Super User to access chat features and premium document tools.
    </p>
    <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition">
      Upgrade to Premium
    </button>
  </div>
</div>
)}
</>
        
    );
    };

    export default UserNotifications;
