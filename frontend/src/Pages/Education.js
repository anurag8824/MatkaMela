import React from 'react'
import Achievements from '../Components/Content/Achievements'

const Education = () => {
  return (
    <div> 

<div className="bg-gradient-to-br from-[#fef9f6] to-[#f0f4ff] py-12 px-2">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8 md:p-12 space-y-6 border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b] tracking-tight">
          शैक्षणिक, सामाजिक, सांस्कृतिक और अध्यात्मिक कार्यक्रम
        </h1>

        <p className="text-gray-700 text-lg">
          जनमित्र उद्योग द्वारा शैक्षणिक, सामाजिक, सांस्कृतिक और अध्यात्मिक कार्यक्रम –
        </p>

        <div className="space-y-4">
          <p className="text-gray-800 text-base leading-relaxed">
            <span className="font-semibold text-[#3b82f6]">शिक्षा –</span> आध्यामिक, संस्कारयुक्त शिक्षा को बढ़ावा देना, जरूरतमंद मेधावी विद्यार्थियों को छात्रवृत्ति एवं आर्थिक सहायता प्रदान करना। ईश्वराश्रित विद्यार्थियों की पूर्ण शिक्षा की व्यवस्था करना।
          </p>

          <p className="text-gray-800 text-base leading-relaxed">
            <span className="font-semibold text-[#3b82f6]">सामाजिक - सांस्कृतिक –</span> सामाजिक समरसता के लिए प्रयास करना, कुरीति उन्मूलन, नशा निवारण, एकता समता के लिए क्रियाकलापों का संचालन करना। सामूहिक विवाह समारोह के माध्यम से गरीब बालिकाओं के विवाह करवाना। सांस्कृतिक कार्यक्रमों का आयोजन, संस्कृति सामान्य एवं आध्यात्म ज्ञान प्रतियोगिताओं का आयोजन करवाना, प्रतिभाओं को सम्मानित, पुरष्कृत करना।
          </p>
        </div>
      </div>
    </div>

  <Achievements/>
  
  </div>
  )
}

export default Education