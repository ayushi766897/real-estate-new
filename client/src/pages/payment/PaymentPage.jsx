import React, { useState, useContext, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import properties from '../../components/seller/properties.json';

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const property = properties.find(p => p.id === parseInt(id));
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [processingPayment, setProcessingPayment] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!property) {
      setError('Property details are missing. Please go back and select a property.');
    }
  }, [property, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setProcessingPayment(true);

    if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
      setError('Please fill in all payment details');
      setProcessingPayment(false);
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/payment/success', { 
        state: { 
          property,
          transactionId: Math.random().toString(36).substring(2, 15)
        } 
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      setError('Payment processing failed. Please try again.');
      setProcessingPayment(false);
    }
  };

  if (!property) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl text-red-600">Error: {error}</h1>
        <button 
          onClick={() => navigate('/properties')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Complete Your Purchase</h1>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row">
          <img 
            src={property.image} 
            alt={property.title}
            className="w-full md:w-1/3 h-48 object-cover rounded-md"
          />
          <div className="md:ml-4 mt-4 md:mt-0">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-blue-600 font-bold text-2xl mt-2">₹{property.price?.replace(/[$,]/g, "") || ""}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name on Card</label>
            <input
              type="text"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">Expiry Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
            disabled={processingPayment}
          >
            {processingPayment ? 'Processing...' : `Pay ₹${property.price?.replace(/[$,]/g, "") || ""}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
