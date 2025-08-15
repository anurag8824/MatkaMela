import React from 'react'
import Achievements from '../Components/Content/Achievements'

const MSME = () => {
  return (
    <div>  <div className="max-w-3xl mx-auto  p-6 bg-white rounded-2xl shadow-lg">
    <h1 className="text-2xl md:text-3xl font-bold text-blue-700 mb-6 text-center leading-snug">
      सूक्ष्म, लघु और माध्यम इंटरप्राइजेज <br />
      (प्रोत्साहन, रजिस्ट्रेशन, विस्तार - विकास, विपणन, मार्केटिंग आदि)
    </h1>
   
  </div>
  
  <div className="py-12 mt-2 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 rounded-2xl shadow-md">
          <h4 className="text-xl md:text-2xl font-semibold text-indigo-700 mb-6">
            जनमित्र उद्योग द्वारा MSME के विकास हेतु कार्य –
          </h4>
          <ul className="list-disc list-inside text-gray-800 space-y-4 text-base leading-relaxed">
            <li>
              स्थापित MSME के गुणवत्ता पूर्ण स्वदेशी उत्पादों को, जो विशेष रूप से महिला उद्यमियों द्वारा संचालित हैं, उनके उत्पादों को विपणन हेतु मार्केटिंग प्लेटफॉर्म प्रदान करना — अर्थात उत्पादों का क्रय करके विपणन की व्यवस्था करना और विक्रय मूल्य के अतिरिक्त लाभांश में भागीदार बनाना।
            </li>
            <li>
              आवश्यकता एवं आपूर्ति के आधार पर नए उद्यमियों को प्रशिक्षण, मार्गदर्शन प्रदान कर MSME इकाइयों की स्थापना करना, रजिस्ट्रेशन, विस्तार, विकास आदि कार्यों में सहयोग करना।
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Achievements />
    
    </div>
  )
}

export default MSME