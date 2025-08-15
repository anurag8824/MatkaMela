import React, { useState } from 'react'
import { FaUniversity } from 'react-icons/fa'

const Withdraw = () => {
    const [amount, setAmount] = useState("");
  
  return (
    <div>

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
        {[100, 200, 300, 500, 1000, 2000].map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className="border rounded py-2 bg-gray-100 hover:bg-gray-200 text-sm"
          >
            {amt}
          </button>
        ))}
      </div>

      {/* Red info text */}
      <p className="text-red-500 text-center text-sm mb-1">
      आप सिर्फ जीता हुआ पैसा ही अपने अकाउंट में निकाल सकते हो
      </p>

      <p className="text-red-500 text-center text-sm ">
      Withdraw Time :- सुबह 10 से रात 10 बजे तक
      </p>

      <p class="text-center text-sm mt-1 text-[#094c73]">Win Amount :- 0</p>

      <p class="text-center text-xs mt-1">Bank Account Details</p>

    <div className='flex item-center justify-center'> <button className='btn btn-primary'> Add Bank Account</button></div> 


      <div>

      <label className="block text-sm font-medium text-gray-700 mb-1">
    Bank Name
  </label>
  <input
    type="text"
    placeholder="Enter Bank Name"
    className="w-full border rounded px-3 py-2 mb-3"
  />

  {/* Account Holder Name */}
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Account Holder Name
  </label>
  <input
    type="text"
    placeholder="Enter Account Holder Name"
    className="w-full border rounded px-3 py-2 mb-3"
  />

  {/* Account Number */}
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Account Number
  </label>
  <input
    type="number"
    placeholder="Enter Account Number"
    className="w-full border rounded px-3 py-2 mb-3"
  />

  {/* IFSC Code */}
  <label className="block text-sm font-medium text-gray-700 mb-1">
    IFSC Code
  </label>
  <input
    type="text"
    placeholder="Enter IFSC Code"
    className="w-full border rounded px-3 py-2 mb-4"
  />

  {/* OTP Row */}
  <div className="flex gap-2 mb-4">
    <input
      type="number"
      placeholder="Enter OTP"
      className="flex-1 border rounded px-3 py-2"
    />
    <button className="bg-[#094c73] text-white text-sm  px-3 py-2 rounded hover:bg-[#1a3a4e]">
      Send OTP
    </button>
  </div>

  {/* Withdraw Button */}
  <button className="w-full bg-[#094c73] text-white py-2 rounded hover:bg-[#1a3a4e]">
    Withdraw
  </button>



      </div>



    </div>
  )
}

export default Withdraw