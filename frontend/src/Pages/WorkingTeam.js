import React, { useEffect } from 'react'
import AOS from "aos"
import "aos/dist/aos.css";

const WorkingTeam = () => {

    useEffect(() => {
        AOS.init({
          duration: 800,       // animation duration (ms)
          easing: "ease-in-out", // smooth easing
          once: true,            // whether animation should happen only once
        });
      }, []);

    const teamMembers = [
        {
          name: "आचार्य मनमोहन विश्वकर्मा",
          role: "प्रबंध निदेशक",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/photo.jpeg",
        },
        {
          name: "डॉ . अपर्णा कुमारी",
          role: "सलाहकार , मार्गदर्शक",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/adm-1.jpg",
        },
        {
          name: "श्री मनीष मोदी",
          role: "निदेशक, लेखा, जोखा, क्रय, विक्रय स्वीकृति",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/PHOTO_MANISH1.JPG",
        },
        {
          name: "श्री मनोज कुमार",
          role: "निदेशक, चयन नियुक्ति, प्रशिक्षण, सेमिनार, विनिर्माण इकाई प्रबंधन",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/3.jpg",
        },
        {
          name: "श्री बसंत बहार असवाल",
          role: "प्रशासनिक एवं कानूनी सलाहकार क्रय –विक्रय, निरीक्षण",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/1.jpg",
        },
        {
          name: "डॉ. बी . डी. शर्मा",
          role: "निदेशक सलाहकार, नियुक्ति, सम्मान समारोह",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/adm-6.jpg",
        },
        {
          name: "श्री भास्कर आनंद",
          role: "निदेशक, कार्यालय प्रबंधन, साफ्ट वेयर, निरीक्षण",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/adm-5.jpg",
        },
        {
          name: "श्री अजय कुमार ओझा",
          role: "प्रबंधक",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/ajay_ojha.jpg",
        },
        {
          name: "श्री मदन लाल",
          role: "स्टॉक प्रबंधन, जनमित्रम मुख्य केंद्र",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/shree-madan-lal-repswal.jpg",
        },
        {
          name: "चरण सिंह",
          role: "कार्यालय प्रबंधक",
          image: "https://janmitram.com/Assests/WebsiteManagementImage/WhatsApp_Image_2023-07-03_at_2_16",
        },
      ];
      
  return (
    <div>  <div className="bg-gradient-to-br from-[#f0f4ff] to-[#fef9f6] py-12 px-6">
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl border border-gray-100 p-8 md:p-10 space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1e293b]">
        प्रशासन, प्रबंधन
      </h1>
      <p className="text-lg text-gray-700 leading-relaxed">
        प्रबंध कार्यकारिणी के द्वारा नियुक्त पदाधिकारी, प्रबंधन एवं प्रशासन का दायित्व निर्वहन करेंगे।
      </p>
    </div>
  </div>


  <div style={{backgroundImage:"url(/images/polygon.jpg)", backgroundPosition:"30px"}} className="bg-gradient-to-br from-[#f7faff] to-[#fffdfc] py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
          हमारी टीम
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 px-4 sm:px-6 lg:px-8">
  {teamMembers.map((member, index) => (
    <div
      key={index}
      className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 hover:border-indigo-200 focus-within:ring-2 focus-within:ring-indigo-400 focus-within:outline-none"
      tabIndex={0}
      role="group"
      aria-label={`Team member: ${member.name}`}
      data-aos="fade-up" // AOS animation
      data-aos-delay={index * 100} // staggered animation
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-64 object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-blk,, bg-opacity-0 group-hover:bg-opacity-20 transition duration-300 rounded-t-2xl" />
      </div>
      <div className="px-1 text-center">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition-colors duration-200">
          {member.role}
        </h3>
        <p className="text-sm text-gray-500">{member.name}</p>
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  
  </div>
  )
}

export default WorkingTeam