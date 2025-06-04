import React from "react";
import { useLocation } from "react-router-dom";
import { CheckCircle } from "lucide-react"; // Optional: for a nice icon

function PaymentSuccess() {
  const query = new URLSearchParams(useLocation().search);
  const reference = query.get("reference");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-emerald-200 flex flex-col justify-center items-center px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="text-green-500" size={64} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
        <p className="text-gray-600 mb-4">Thank you for your purchase.</p>

        {reference && (
          <div className="bg-gray-100 rounded-md p-4 mt-4">
            <p className="text-sm text-gray-500 mb-1">Reference ID:</p>
            <p className="text-lg font-mono text-emerald-600">{reference}</p>
          </div>
        )}

    
      </div>
    </div>
  );
}

export default PaymentSuccess;
