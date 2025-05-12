import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { property, transactionId } = location.state || {};

  if (!property || !transactionId) {
    navigate('/');
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 text-center">
      <div className="bg-white rounded-lg shadow-md p-8 my-8">
        <FaCheckCircle className="mx-auto text-green-500 text-7xl mb-4" />
        
        <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
        
        <div className="mb-6">
          <p className="text-gray-700 mb-2">Thank you for your purchase!</p>
          <p className="text-gray-700">Your transaction has been completed successfully.</p>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-xl mb-2">Transaction Details</h2>
          <p className="mb-1"><span className="font-medium">Property:</span> {property.title}</p>
          <p className="mb-1"><span className="font-medium">Amount:</span> ₹{property.price?.replace(/[$,]/g, "") || ""}</p>
          <p className="mb-1"><span className="font-medium">Transaction ID:</span> {transactionId}</p>
          <p><span className="font-medium">Date:</span> {new Date().toLocaleString()}</p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center space-y-3 md:space-y-0 md:space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
          
          <button
            onClick={() => navigate('/properties')}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition"
          >
            View More Properties
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;