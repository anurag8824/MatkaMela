import React from "react";
import { Link } from "react-router-dom";

const articles = [
  {
    title: "मुख्यमंत्री वर्क फ्रॉम होम योजना",
    img: "https://janmitram.com/Assests/WebsiteBlogImage/janmitram_app.jpeg",
    link: "/news",
  },
  {
    title: "JANMITRAM",
    img: "https://janmitram.com/Assests/WebsiteBlogImage/Janmitra_logo_final.png",
    link: "/news",
    featured: true,
  },
  {
    title: "Exploring East Africa and the threat to its wildlife",
    img: "https://janmitram.com/Assests/WebsiteBlogImage/Contiki-1-4-350x2102.jpg",
    link: "/news",
  },
  {
    title: "From mixed race to proud Afro-European",
    img: "https://janmitram.com/Assests/WebsiteBlogImage/1618EURS2020-350x210.jpg",
    link: "/news",
  },
  {
    title: "Exploring Wildlife with Na...",
    img: "https://janmitram.com/Assests/WebsiteBlogImage/Contiki-1-4-350x2101.jpg",
    link: "/news",
  },
  {
    title: "जनमित्रम का शुभारम्भ",
    img: "https://janmitram.com/Assests/WebsiteBlogImage/DSC_0006.JPG",
    link: "/news",
    featured: true,
  },
];

const Achievements = () => {
  return (
    <section className="py-12 bg-gray-50" id="blog">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            समाचार | प्रगति विवरण | उपलब्धियां
          </h1>
          <p className="text-gray-600 mt-2">
            हमारी हाल की गतिविधियों और उपलब्धियों पर एक नजर डालें
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <Link
              key={index}
              to={article.link}
            //   target="_blank"
            //   rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl shadow-md transition-transform hover:-translate-y-1 bg-white ${
                article.featured ? "sm:col-span-2" : ""
              }`}
            >
              <div className="relative h-56">
                <img
                  src={article.img}
                  alt={article.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blac bg-opacity-30 group-hover:bg-opacity-40 transition duration-300" />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {article.title}
                </h2>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a href="https://janmitram.com/News-NewsRoom" target="_blank" rel="noopener noreferrer">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
              और खबरें देखें
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
