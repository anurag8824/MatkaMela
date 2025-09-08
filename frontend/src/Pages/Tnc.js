import React from 'react'
import WalletHistory from './Wallet/WalletHistory';

const Tnc = () => {
    const terms = [
        "10000 इंटू की जोड़ी लगेगी मैक्सिमम",
        "20000 इंटू का हरूफ़ लगेगा मैक्सिमम",
        "2000 इंटू की क्रॉसिंग लगेगी मैक्सिमम",
        "रिजल्ट एप्लिकेशन मैं अपडेट होते ही आपका पैसा आपके एप्लिकेशन के वॉलेट में आ जाएगा",
        "कभी भी पैसा ऐड कर सकते हैं एप्लीकेशन मैं",
        "पैसा निकालने का समय सुबह 10 बजे से रात के 10 बजे तक हैं",
        "WITHDRAW REQUEST डालते ही 5 से 10 मिनट के अंदर पैसा आपके अकाउंट मैं आ जाएगा",
        "अगर आपको किसी भी प्रकार की समस्या होती है तो आप चैट कर सकते है"
      ];
    
  return (
    <div>
     <div className="container my-5 p-4 bg-white rounded shadow-lg">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-red-600">💥 KHELO MATKA TERMS AND CONDITIONS 💥</h1>
      </div>

      <ul className="list-decimal pl-5 space-y-3">
        {terms?.map((term, index) => (
          <li key={index} className="text-lg font-medium text-gray-800 flex items-start">
            <span className="mr-2 text-red-500">🔥</span>
            <span>{term}</span>
          </li>
        ))}
      </ul>
    </div>
                <WalletHistory />

    
    </div>
  )
}

export default Tnc