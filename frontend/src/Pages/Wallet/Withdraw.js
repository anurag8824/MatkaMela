import React, { useState, useEffect } from 'react';
import { FaUniversity } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axiosInstance from '../../Utils/axiosInstance';
import { toast } from 'react-toastify';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [bankData, setBankData] = useState({
    bankname: '',
    holder: '',
    acnumber: '',
    ifsc: '',
    upi: ''
  });
  const [loading, setLoading] = useState(false);

  const [active, setActive] = useState("upi");


  // Fetch existing bank details
  useEffect(() => {
    const fetchBankDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/api/get-bank-detail');
        if (response.status === 200 && response.data) {
          setBankData(response.data);
        }
      } catch (error) {
        console.log('No bank details found');
      } finally {
        setLoading(false);
      }
    };
    fetchBankDetails();
  }, []);

  const handleWithdraw = async () => {
    // Check if bank details exist
    if (!bankData.acnumber && !bankData.upi) {
      toast.error('Add a/c detail first!');
      return;
    }

    if (!amount || Number(amount) <= 0) {
      toast.error('Enter a valid amount');
      return;
    }
    if (Number(amount) < 1000) {
      toast.error('Minimum withdraw amount is 1000');
      return;
    }
    if (Number(amount) > 50000) {
      toast.error('Maximum withdraw amount is 50000');
      return;
    }

     // ⏰ Withdraw time check (06:00 AM - 11:00 AM)
  const now = new Date();
  const currentHour = now.getHours(); // local hour 0-23
  if (currentHour < 6 || currentHour >= 11) {
    toast.error('Withdrawals are allowed only between 06:00 AM and 11:00 AM');
    return;
  }

    try {
      setLoading(true); 
      const payload = { amount, ...bankData, status: "pending" };
      const response = await axiosInstance.post('/api/user-withdraw', payload);
      if (response.status === 200) {
        toast.success('Withdrawal request sent successfully!');
        setAmount('');
        window.location.reload();
      }

    } catch (error) {
      console.error('Withdraw error:', error);
      toast.error(error.response?.data?.message || 'Withdraw failed. Try again.');
    } finally {
      setLoading(false); // 👈 stop loading
    }
  };

  if (loading) {
    return <div className="text-center mt-4">Loading bank details...</div>;
  }

  return (
    <div className="max-w-m mx-auto mt-4">
      {/* Amount Input */}
      <div className="relative mb-4">
        <FaUniversity className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 text-lg" />
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded px-10 py-2 focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>

      {/* Quick amount buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[1000, 2000, 3000, 5000, 7000, 10000].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className="border rounded py-2 bg-gray-100 hover:bg-gray-200 text-sm"
          >
            {amt}
          </button>
        ))}
      </div>

      {/* Info Text */}
      <p className="text-red-500 text-center text-sm mb-1">
        आप सिर्फ जीता हुआ पैसा ही अपने अकाउंट में निकाल सकते हो
      </p>
      <p className="text-red-500 text-center text-sm mb-2">
        Withdraw Time :- सुबह 06:00 AM से 11:00 AM  बजे तक
      </p>

      {/* <p className="text-center text-sm mt-1 text-[#094c73]">Win Amount :- 0</p> */}

      {/* Bank Account Section */}
      <p className="text-center text-xs mt-1 mb-2">Bank Account Details</p>


      <div className="mb-4 max-w-md mx-auto">

        <div className="flex mb-4">
          <button
            onClick={() => setActive("bank")}
            className={`flex-1 font-bold px-4 py-2 transition-colors rounded-l-xl 
          ${active === "bank" ? "bg-theme text-white" : "bg-gray-100 text-gray-800"}
        `}>Bank</button>

          <button
            onClick={() => setActive("upi")}
            className={`flex-1 font-bold px-4 py-2 transition-colors rounded-r-xl 
          ${active === "upi" ? "bg-theme text-white" : "bg-gray-100 text-gray-800"}
        `}>UPI ID</button>
        </div>


        {active === "bank" && (
          <div className='bank'>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bank Name
            </label>
            <input
              type="text"
              value={bankData.bankname || ''}
              disabled
              className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              value={bankData.holder || ''}
              disabled
              className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account Number
            </label>
            <input
              type="text"
              value={bankData.acnumber || ''}
              disabled
              className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
            />

            <label className="block text-sm font-medium text-gray-700 mb-1">
              IFSC Code
            </label>
            <input
              type="text"
              value={bankData.ifsc || ''}
              disabled
              className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
            />

          </div>)}

        {active === "upi" && (
          <div className='upi'>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              UPI ID
            </label>
            <input
              type="text"
              value={bankData.upi || ''}
              disabled
              className="w-full border rounded px-3 py-2 mb-3 bg-gray-100"
            />
          </div>)}

      </div>

      <div className="flex justify-center mb-2">
        <Link to="/add-bank" className="btn btn-primary">
        Add/Update a/c details
        </Link>
      </div>

      {/* Withdraw Button */}
      <div className="flex justify-center mb-2">
      <button
        onClick={handleWithdraw}
        disabled={loading}
        className="w-full bg-[#094c73] btn  text-white py-2 rounded hover:bg-[#1a3a4e]"
      >
         {loading ? "Processing..." : "Withdraw"}
      </button>
      </div>
    </div>
  );
};

export default Withdraw;
