import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

      // Replace with real data or pass via props
  const storeOpenTime = '9:00 AM'
  const storeCloseTime = '6:00 PM'
  const numberFirst = '+91 9876543210'
  const numberSecond = '+91 9123456780'
  const emailId = 'info@example.com'
  const emailIdOther = 'support@example.com'
  return (
    <footer className="bg-gray-100 text-gray-700 pt-10">
    <div className="max-w-7xl hidden mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-8 border-b pb-10">
        {/* Counter Support & Press */}
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Counter Support</h3>
            <ul className="space-y-2 text-sm">
              <li><i className="lar la-clock"></i> M-F: {storeOpenTime} – {storeCloseTime} PT</li>
              <li><i className="las la-phone"></i> {numberFirst}, {numberSecond}</li>
              <li><a href="#" className="text-blue-600 hover:underline"><i className="lar la-envelope"></i> Submit a Request</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Press Inquiries</h3>
            <ul className="space-y-2 text-sm">
              <li><i className="lar la-envelope"></i> <a href={`mailto:${emailId}`} className="hover:underline">{emailId}, {emailIdOther}</a></li>
            </ul>
          </div>
        </div>

        {/* हमारा संगठन */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">हमारा संगठन</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="kendra" className="hover:underline">जनमित्रम केंद्र</a></li>
              <li><a href="/foundation" className="hover:underline">जनमित्रम फाउंडेशन</a></li>
              <li><a href="/group" className="hover:underline">समूह संघठन</a></li>
              <li><a href="/education" className="hover:underline">शैक्षणिक, सामाजिक, सांस्कृतिक और अध्यात्मिक कार्यक्रम</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">कार्य शैली</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/working-team" className="hover:underline">प्रशासन, प्रबंधन</a></li>
              <li><a href="/working-training" className="hover:underline">प्रशिक्षण एवं रोजगार</a></li>
              <li><a href="/working-schemes" className="hover:underline">योजनायें</a></li>
              <li><a href="/working-business" className="hover:underline">व्यापार नीति</a></li>
            </ul>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/product" className="hover:underline">हमारे उत्पाद</a></li>
            <li><a href="/msme" className="hover:underline">सूक्ष्म ,लघु और माध्यम इंटरप्राइजेज</a></li>
            <li><a href="/news" className="hover:underline">समाचार</a></li>
            <li><a href="/gallery" className="hover:underline">फोटो गैलरी</a></li>
            <li><a href="/contact" className="hover:underline">संपर्क करें</a></li>
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-10 flex justify-center">
        <form className="flex w-full max-w-xl bg-white border rounded shadow-sm">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 flex items-center justify-center"
          >
            <svg viewBox="0 0 64 64" className="w-4 h-4" fill="currentColor">
              <g stroke="currentColor" fill="currentColor" strokeWidth="1">
                <path d="M44.152,32.024L15.824,60.353c-0.787,0.787-0.787,2.062,0,2.849c0.394,0.394,0.909,0.59,1.424,0.59 
                c0.515,0,1.031-0.196,1.424-0.59l29.736-29.736c0.557-0.557,0.718-1.439,0.445-2.177c-0.101-0.272-0.26-0.519-0.464-0.725 
                L18.652,0.828c-0.787-0.787-2.062-0.787-2.848,0c-0.787,0.787-0.787,2.061,0,2.848L44.152,32.024z" />
              </g>
            </svg>
          </button>
        </form>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
        © 2021 <a href="javascript:void(0)" className="text-blue-600 hover:underline">Jan Mitra Udyog</a> - All Rights Reserved.
      </div>
    </div>

    <div class="menufooter bg-white border-t border-gray-200 fixed bottom-0 left-0 w-full">
  <ul class="flex justify-around items-center">
    
    {/* <!-- Home --> */}
    <li class="menu">
      <div class="inactive iconmenu">
        <Link to="/" class="flex flex-col items-center text-gray-600 hover:text-blue-600 py-2">
          <i class="bi bi-house-door-fill text-xl"></i>
          <span class="text-xs">Home</span>
        </Link>
      </div>
    </li>
    
    {/* <!-- Play --> */}
    <li class="menu">
      <div class="inactive iconmenu">
        <Link to="/Play" class="flex flex-col items-center text-gray-600 hover:text-blue-600 py-2">
          <i class="bi bi-controller text-xl"></i>
          <span class="text-xs">Play</span>
        </Link>
      </div>
    </li>
    
    {/* <!-- Wallet --> */}
    <li class="menu">
      <div class="inactive iconmenu">
        <Link to="/wallet" class="flex flex-col items-center text-gray-600 hover:text-blue-600 py-2">
          <i class="bi bi-wallet2 text-xl"></i>
          <span class="text-xs">Wallet</span>
        </Link>
      </div>
    </li>
    
    {/* <!-- Help --> */}
    <li class="menu">
      <div class="iconmenu">
        <Link to="/help" class="flex flex-col items-center text-gray-600 hover:text-blue-600 py-2">
          <i class="bi bi-info-square text-xl"></i>
          <span class="text-xs">Help</span>
        </Link>
      </div>
    </li>

  </ul>
</div>

  </footer>
  )
}

export default Footer