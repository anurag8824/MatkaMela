import React, { useEffect, useState } from "react";
import { BsWhatsapp } from "react-icons/bs";
import axiosInstance from "../../Utils/axiosInstance";

const HelpPage = () => {

  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const res = await axiosInstance.get("/admin/get-whatsapp"); // 👈 API call
        if (res.data?.whatsapp) {
          setWhatsapp(res.data.whatsapp);
        }
      } catch (err) {
        console.error("Error fetching WhatsApp:", err);
      }
    };

    fetchWhatsApp();
  }, []);

  // WhatsApp redirect function
  const openWhatsApp = () => {
    if (!whatsapp) return;
    // 👇 Whatsapp chat open karega
    window.open(`https://wa.me/${whatsapp}`, "_blank");
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-50 py-6 px-4">
      {/* Title */}
      <h1 className="text-center text-xl font-bold text-red-600 mb-4">
        💥 KHELO MATKA HELP & SUPPORT 💥
      </h1>

      {/* Info Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-4">
        <p className="text-center text-sm text-yellow-700 font-semibold mb-3">
          🔥 Min Deposit: Rs. 100 | Min Withdraw: Rs. 1000 | रेट 10 के 980 🔥
        </p>

        <p className="text-center text-base font-semibold text-green-700 mb-4">
          👽 गेम कैसे खेलनी है जानिए 👽
        </p>

        {/* Game Rule 1 */}
        <p className="mb-3 text-gray-700 leading-relaxed">
          🔥 सभी गेम मैं 1 से 100 Jodi मैं से कोई एक Jodi आता है अगर आपने वही
          लगाया हुआ है तो आपको 98 गुणा पैसे मिलेंगे।
        </p>

        {/* Game Rule 2 */}
        <p className="mb-3 text-gray-700 leading-relaxed">
          🔥 जैसे आपने कोई Jodi पर 10 रुपए लगाए हैं और जिस जोड़ी पर आपने पैसे
          लगाए हैं वही Result आता है तो आपको 10 रुपये का 980 रुपये मिलेगा।
        </p>

        {/* Game Rule 3 */}
        <p className="mb-3 text-gray-700 leading-relaxed">
          🔥 आप कितने भी नंबर लगा सकते हो, बस आपका पास होना चाइए और पास होते ही
          पैसा आपके वॉलेट मैं आ जायेगा।
        </p>

        {/* Video Tutorial */}
        <div className="text-center mt-6">
          <p className="text-sm text-blue-600 font-medium mb-2">
            👇👽 DEPOSIT AND WITHDRAW सीखने के लिए Video आइकन पे क्लिक करें 👽
          </p>
          <button className="bg-red-500 text-white px-5 py-2 rounded shadow hover:bg-red-600">
            🎥 Watch Tutorial
          </button>
          
          {whatsapp && (
            <button
              onClick={openWhatsApp}
              className="flex items-center mt-2 gap-2 mx-auto bg-green-500 text-white px-3 py-3 rounded shadow hover:bg-green-600"
            >
              <BsWhatsapp size={22} />
              
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
