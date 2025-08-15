import React from "react";
import Marquee from "react-fast-marquee";

const HighlightMarquee = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 py-3">
      <Marquee
        speed={60}
        gradient={false}
        pauseOnHover={true}
        className="text-white font-semibold text-lg md:text-xl tracking-wide"
      >
        🌟 जनमित्रम का उद्देश्य – सभी कर्मियों को स्थायी रोजगार, थोक में खरीद, निर्माण, पैकिंग और विक्रय द्वारा लाभांश सुनिश्चित करना! 💼👩‍🍳📦 | 
        📢 जुड़ें जनमित्र समूह से और बनें आत्मनिर्भर भारत की शक्ति का हिस्सा! 🇮🇳💪 |
        🎯 जनमित्रम – एक संगठित, सशक्त और सुरक्षित भविष्य की दिशा में कदम 🚀✨ |
      </Marquee>
    </div>
  );
};

export default HighlightMarquee;
