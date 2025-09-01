import React, { useState, useEffect } from 'react';
import axiosInstance from '../../Utils/axiosInstance';

const AddBank = () => {
    // Single state object for all input fields
    const [bankData, setBankData] = useState({
        bankname: '',
        holder: '',
        acnumber: '',
        ifsc: '',
        upi: ''
    });

    const [loading, setLoading] = useState(true);

    const [active, setActive] = useState("upi");

    // Generic change handler
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBankData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Fetch existing bank details on component mount
    useEffect(() => {
        const fetchBankDetails = async () => {
            try {
                const response = await axiosInstance.get('/api/get-bank-detail');
                if (response.status === 200) {
                    setBankData(response.data); // auto-fill form with existing data
                }
            } catch (error) {
                console.log('No existing bank details found or error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBankDetails();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/api/add-bank-detail', bankData);
            if (response.status === 200) {
                alert('Bank details saved successfully!');
            }
            window.location.reload();
        } catch (error) {
            console.error('Error saving bank details:', error);
            alert('Failed to save bank details. Please try again.');
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Loading bank details...</div>;
    }

    return (
        <>
            <div className='mt-4'>
                <h1 className='text-2xl font-bold text-center text-gray-800'>Add / Update Bank Details</h1>
            </div>
            <div className='w-full max-w-md mx-auto bg-white p-6 shadow-md rounded-lg mt-4'>

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

                <form onSubmit={handleSubmit}>
                    {/* Bank Name */}

                    {active === "bank" && (
                        <div className='bank'>


                            <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                            <input
                                type="text"
                                name="bankname"
                                placeholder="Enter Bank Name"
                                value={bankData.bankname}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mb-3"
                            />

                            {/* Account Holder Name */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Holder Name</label>
                            <input
                                type="text"
                                name="holder"
                                placeholder="Enter Account Holder Name"
                                value={bankData.holder}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mb-3"
                            />

                            {/* Account Number */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                            <input
                                type="number"
                                name="acnumber"
                                placeholder="Enter Account Number"
                                value={bankData.acnumber}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mb-3"

                            />

                            {/* IFSC Code */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
                            <input
                                type="text"
                                name="ifsc"
                                placeholder="Enter IFSC Code"
                                value={bankData.ifsc}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mb-3"
                            />

                        </div>
                    )}

                    {active === "upi" && (
                        <div className='upi'>

                            {/* UPI ID */}
                            <label className="block text-sm font-medium text-gray-700 mb-1">UPI ID</label>
                            <input
                                type="text"
                                name="upi"
                                placeholder="Enter UPI ID"
                                value={bankData.upi}
                                onChange={handleChange}
                                className="w-full border rounded px-3 py-2 mb-4"

                            />

                        </div>)}


                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-[#094c73] text-white py-2 rounded hover:bg-[#1a3a4e]"
                    >
                        Save Details
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBank;
