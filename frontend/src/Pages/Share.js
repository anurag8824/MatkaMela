import React, { useState } from 'react'

const Share = () => {
    const [isOpen, setIsOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const shareLink = "https://example.com";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };
  return (
    <div>
         <div className="flex flex-col items-center justify-center min-h-screen">
      
        <div className="fixed inset-0 bg-blue-900k bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg w-96 relative animate-fadeIn">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(()=>{window.location.href = '/'})}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>

            <h2 className="text-lg font-semibold mb-4 text-center text-gray-800">
              Website को शेयर करने के लिए नीचे दिए गए लिंक को कॉपी करें
            </h2>

            {/* Input + Copy button */}
            <div className="flex items-center border rounded-lg overflow-hidden">
              <input
                type="text"
                value={shareLink}
                readOnly
                className="flex-1 p-2 outline-none"
              />
              <button
                onClick={copyLink}
                className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
              >
                कॉपी
              </button>
            </div>
          </div>

          {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-bounce">
          Link कॉपी सफल रहा ✅
        </div>
      )}
     
        </div>
  

      {/* Toast */}
     
    </div>
    </div>
  )
}

export default Share