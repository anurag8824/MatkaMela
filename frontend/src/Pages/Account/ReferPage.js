import React from 'react'

const ReferPage = () => {
    const mobilenumber = localStorage.getItem("mobile");
     // यहां अपना मेसेज define करो
  const message = `अपने दोस्तों को रेफर करें और अपने दोस्तों की प्रत्येक हानि बोली (बुकिंग) पर 5% कमीशन राशि प्राप्त करें रेफरल कोड का उपयोग करके | रेफरल कोड ${mobilenumber} https://matkamela.shop/`;

  // Encode message for WhatsApp
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    message
  )}`;
  return (
    <div>
      <section className="container refer">
        <div className="margin-bottom-88 mb-0">
          <div className="pt-1">
            <h3 className="text-dark text-center mt-3">Refer & Earn</h3>
            <p className="text-secondary font-bold">
            अगर आप को अपने friend को डाउनलोड करवाते हो तो आपको 5% कमीशन कमा सकते हो | ये 5% कमीशन आपको लाइफ टाइम मिलेगा |
            </p>
            <p className="px-2 mt-3 font-bold">
              <span className="text-color-danger font-extrabold">नोट :</span> आपको 5% कमीशन तभी मिलेगा अगर आपका कोई friend गेम खेलता है । और उस गेम से कंपनी को जो Profit हुआ उसका 5% आपको मिलेगा |
            </p>
            <div className="d-flex justify-content-between">
            <a
                className="d-block btnbal w-100 btn btn-transparent border border-danger mx-1"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="bi bi-share-fill sharebtn color_result"></i>
                Share & Earn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ReferPage;
