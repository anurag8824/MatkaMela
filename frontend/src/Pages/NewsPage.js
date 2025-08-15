import React from 'react';

const NewsPage = () => {
  const newsItems = [
    {
      imgSrc: 'https://janmitram.com/Assests/WebsiteBlogImage/DSC_0006.JPG',
      date: '07-Dec-2021',
      title: 'जनमित्रम का शुभारम्भ',
      link: 'https://janmitram.com/News-Details',
      description:
        'वर्क फ्रॉम होम के द्वारा महिला सशक्तिकरण हेतु कार्य योजना का शुभारम्भ जनमित्र उद्योग द्वारा किया गया है | मुख्यमंत्री वर्क फ्रॉम होम योजाना के राजस्थान सरकार के पोर्टल पर आवेदन आमंत्रित है |',
    },
    {
      imgSrc:
        'https://janmitram.com/Assests/WebsiteBlogImage/Identity-crisis-woman-1024x576-1-466x4101.jpg',
      date: '07-Dec-2021',
      title: 'प्राकृतिक जीवन',
      link: 'https://janmitram.com/News-Details',
      description:
        'प्रकृति की सुरम्य वादियों में आत्मोन्मुख होने और परमात्मा की निकटता का आभास होता है |',
    },
    {
      imgSrc: 'https://janmitram.com/Assests/WebsiteBlogImage/DSC_9942.JPG',
      date: '07-Dec-2021',
      title: 'शुध्द लायें , स्वादिष्ट पकाएं ,स्वदेशी अपनाएं',
      link: 'https://janmitram.com/News-Details',
      description:
        'शुध्द सात्विक प्राकृतिक स्वदेशी उत्पाद ही जीवन के लिए उपयोगी और स्वाथ्य वर्धक है |',
    },
  ];

  return (
    <div id="newsroom" className="py-10 bg-white">
      <div className="container mx-auto px-4">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row border-b border-gray-300 py-6 gap-6"
          >
            <div className="md:w-1/3">
              <img
                src={item.imgSrc}
                alt=""
                className="w-full h-auto object-cover rounded"
              />
            </div>
            <div className="md:w-2/3 flex flex-col justify-center">
              <div className="text-sm text-gray-500 mb-2">
                By{' '}
                <a
                  href="https://janmitram.com/"
                  className="text-blue-600 hover:underline"
                >
                  JanMitra Udyog
                </a>{' '}
                <span className="mx-1">|</span> {item.date}
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                <a href={item.link} className="hover:underline">
                  {item.title}
                </a>
              </h2>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;
