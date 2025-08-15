import React from "react";

const ContactPage = () => {
  const contacts = [
    {
      icon: "https://janmitram.com/assest/images/contact-icon.svg",
      title: "Help Center",
      description: ["Want a quick answer?", "Janmitram Help Desk"],
      color: "bg-blue-100",
    },
    {
      icon: "https://janmitram.com/assest/images/icon-phone.svg",
      title: "Call us",
      description: [
        "Monday through Friday",
        "09:00am - 09:00pm PST",
        "+919784338720 , +91 9571523516",
      ],
      color: "bg-green-100",
    },
    {
      icon: "https://janmitram.com/assest/images/icon-email-us__1_.svg",
      title: "Message Us",
      description: ["Still need help?", "SABKA MITRA JANMITRA"],
      color: "bg-yellow-100",
    },
  ];

  return (
    <>
      <div class="text-center">
        <h1>सुझाव –सहयोग हेतु संपर्क करें </h1>
        <p className="mt-2">
          विशेष योग्यता प्रगति एवं उपलब्धि हस्तगत करने वाले व्यक्तियों को जो
          समूह का अंग है एवं स्वतंत्र रूप से भी जो उत्तरोतर प्रगति पथ पर अग्रसर
          हैं ,अनुकरणीय अभिनंदनीय कार्य कर रहे है उन्हें सम्मानित पुरस्कृत किया
          जायेगा , जिसका चयन निदेशक समूह द्वारा अधिकृत चयन समिति द्वारा किया
          जायेगा |
        </p>
      </div>

      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {contacts.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col transform transition duration-300 ease-in-out hover:scale-105 hover:z-10 hover:translate-x-2  items-center text-center p-6 shadow-sm border rounded-lg hover:shadow-md  ${item.color} hover:bg-opacity-75`}
              >
                <div className="mb-4">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-16 h-16 mx-auto"
                  />
                </div>
                <div className="">
                  <strong className="text-lg font-semibold">
                    {item.title}
                  </strong>
                  <div className="mt-4 space-y-1 text-sm text-gray-600">
                    {item.description.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
