import React, { useState,useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ManageSuperAdmin = () => {
  const [admins, setAdmins] = useState([]);
  const [removedId, setRemovedId] = useState(null); // To track which card is being removed

  const fetchAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:4001/SuperAdmin/super-admin-requests");
      if (res.data.success) {
        console.log(res.data.data,"Abh");
        setAdmins(res.data.data);
        console.log(admins);

      }
    } catch (err) {
      console.error("Error fetching admin requests:", err);
    }
  };
  
  useEffect(() => {
    fetchAdmins(); // now it still works inside useEffect
  }, []);
  

  const handleApprove = async (pendingId) => {
    const superAdmin = JSON.parse(localStorage.getItem("SuperAdmin")); // Dynamically fetched
    const approvedAdmin = admins.find((admin) => admin.id === pendingId); // Get full admin data
  
    try {
      // First approve the admin
      const res = await axios.post("http://localhost:4001/SuperAdmin/ApproveReq", {
        SuperAdmin_id: superAdmin.id,
        Pending_Request_id: pendingId,
      });
  
      toast.success(res.data.message);
  
      // Now send welcome email
      await axios.post("http://localhost:4001/Services/send-welcome-email", {
        email: approvedAdmin.email,
        username: approvedAdmin.name,
      });
  
      toast.success("Welcome email sent!");
  
      // Refresh the list
      fetchAdmins();
    } catch (err) {
      console.error("Approval error:", err);
      toast.error("Failed to approve or send welcome email");
    }
  };
  
  // const handleReject = async (pendingId) => {
  //   try {
  //     const res = await axios.post("http://localhost:4001/SuperAdmin/DeleteReq", {
  //       Pending_Request_id: pendingId,
  //     });
  
  //     toast.success(res.data.message);
  //     // Refresh the admin list
  //     const refreshed = await axios.get("http://localhost:4001/SuperAdmin/AdminRequest");
  //     if (refreshed.data.success) {
  //       setAdmins(refreshed.data.data);
  //     }
  //   } catch (err) {
  //     console.error("Rejection error:", err);
  //     toast.error("Failed to reject request");
  //   }
  // };
  
  const handleReject = (pendingId) => {
    // Trigger animation
    setRemovedId(pendingId);

    // Wait for animation to finish before removing
    setTimeout(async () => {
      try {
        const res = await axios.post(
          "http://localhost:4001/SuperAdmin/delete-super-admin-request",
          {
            id: pendingId,
          }
        );
        toast.success(res.data.message);
        // Remove from state
        setAdmins((prev) => prev.filter((admin) => admin.id !== pendingId));
        setRemovedId(null);
      } catch (err) {
        console.error("Rejection error:", err);
        toast.error("Failed to reject request");
        setRemovedId(null);
      }
    }, 500); // Match duration with transition time
  };

  

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage SuperAdmin</h1>
      

      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
        {admins.map((admin) => (
          <div
            key={admin.id}
            className={`transition-all duration-500 ${
              removedId === admin.id
                ? "opacity-0 -translate-x-full bg-red-500"
                : "opacity-100 translate-x-0"
            } p-[2px] rounded-lg bg-gradient-to-r from-pink-500 via-yellow-500 to-purple-500 w-full sm:max-w-[1150px] mx-auto`}
          >
            <div className="bg-gray-100 p-3 sm:p-4 rounded-lg shadow-md relative">
              <div className="absolute top-2 right-2 flex gap-2">
                {/* Show Approve and Reject buttons only for pending admins */}
              
                  <>
                    <button
                      onClick={() => handleApprove(admin.id)}
                      className="bg-black text-white font-medium px-3 py-1.5 rounded text-xs border shadow-sm transition hover:bg-gradient-to-r hover:from-gray-700 hover:to-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(admin.id)}
                      className="bg-black text-white font-medium px-3 py-1.5 rounded text-xs border shadow-sm transition hover:bg-gradient-to-r hover:from-gray-700 hover:to-red-600"
                    >
                      Reject
                    </button>
                  </>
          
              </div>

              <div className="mb-3 mt-2">
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Name:</strong> {admin.name}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Email:</strong> {admin.email}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Gender:</strong> {admin.gender}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>DOB:</strong> {admin.dob?.split("T")[0]}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Profession:</strong> {admin.profession}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Organization:</strong> {admin.organization}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Phone No:</strong> {admin.phone}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  
  );
};

export default ManageSuperAdmin;
