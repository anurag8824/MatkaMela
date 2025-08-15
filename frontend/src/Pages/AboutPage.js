import React from 'react'
import Achievements from '../Components/Content/Achievements'

const AboutPage = () => {
  return (
    <div><div className="text-center px-6 py-12 bg-white max-w-4xl mx-auto">
    <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6">
      जनमित्रम के सन्दर्भ में
    </h1>
    <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
      दैनन्दिनी जीवन में अनिवार्य उपयोग एवं उपभोग आने वाले खाद्य एवं अन्य वस्तुओं को 
      <span className="text-blue-600 font-medium"> थोक भाव में खरीदकर</span>, 
      <span className="text-blue-600 font-medium"> भण्डारण</span>, 
      <span className="text-blue-600 font-medium"> निर्माण</span>, 
      <span className="text-blue-600 font-medium"> पैकिंग</span> आदि की सम्पूर्ण प्रक्रिया पूर्ण करके 
      <span className="text-blue-600 font-medium"> जनमित्र समूह</span> के सदस्यों में नियमित 
      <span className="text-blue-600 font-medium"> वितरण</span> व 
      <span className="text-blue-600 font-medium"> विक्रय</span> करके 
      <span className="text-blue-600 font-medium"> लाभांश की निश्चित राशि</span> — कार्य, योग्यता, पद के अनुसार 
      <span className="text-blue-600 font-medium"> प्रतिमाह मानदेय</span> के रूप में भुगतान करना और समूह से जुड़े 
      <span className="text-blue-600 font-medium"> सभी कर्मियों को स्थायी रोजगार</span> देना 
      <span className="text-blue-600 font-semibold"> जनमित्रम (जन मित्र उद्योग)</span> का प्रमुख उद्देश्य है।
    </p>
  </div>
<div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h4 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">कार्य विवरण</h4>
        <ul className="list-disc pl-6 space-y-3 text-gray-700 leading-relaxed">
          <li>
            उपभोक्ता समूह का गठन कर उर्जावान सक्रिय सदस्यों को प्रोत्साहन, मार्गदर्शन एवं आवश्यक प्रशिक्षण यथा व्यक्तित्व परिष्कार, ग्रुप प्रबंधन, कार्यालय प्रबंधन आदि प्रदान कर आत्मनिर्भर बनाना। प्रत्येक सदस्य उपभोक्ता नियमित कर्मचारी, अधिकारी एवं व्यवसायिक भागीदार भी होगा।
          </li>
          <li>
            विशेषतया महिला सशक्तिकरण हेतु महिलाएं जो गृहणी हैं उन्हें रोजगार एवं स्वरोजगार के अवसर उपलब्ध करवाना।
          </li>
          <li>
            जिन्होंने लघु उद्योग स्थापित कर लिए हैं उनके उत्पाद जो दैनंदिनी जीवन में अनिवार्य हैं जनमित्र समूह में विपणन कर मार्केटिंग प्लेटफॉर्म उपलब्ध करवाना।
          </li>
          <li>
            उर्जावान समर्थ उद्यमियों को जो समूह के सदस्य हैं एवं पूंजी निवेश कर अपना स्वयं का कार्य प्रारंभ करना चाहते हैं, उनका लघु उद्योग स्थापित करवाना और विपणन हेतु सहयोग करना।
          </li>
          <li>
            स्वदेशी ऑर्गेनिक उत्पादों को बढ़ावा देना और स्वास्थ्य के लिए लाभदायक खाद्य पदार्थों के आसान विपणन की व्यवस्था करना।
          </li>
          <li>
            शुद्ध सात्विक खाद्य पदार्थों को, जो जिस क्षेत्र में बहुतायत में उत्पादन होता है, गुणवत्ता के आधार पर भंडारण, पैकिंग इकाई स्थापित कर विपणन की व्यवस्था करना एवं समूह से जुड़े सदस्यों को रोजगार/स्वरोजगार के अवसर उपलब्ध करवाना।
          </li>
          <li>
            हर परिवार आत्मनिर्भर बने, इस हेतु परिवार के एक सदस्य को नियमित आय के स्थायी रोजगार उपलब्ध करवाना एवं आवश्यक प्रशिक्षण प्रदान करना।
          </li>
        </ul>
      </div>
    </div>

    <Achievements/>
</div>
  )
}

export default AboutPage