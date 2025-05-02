import { useState } from "react";
import { FiX } from "react-icons/fi";

const ReadMore = () => {
  const [showModal, setShowModal] = useState(false);

  const item = {
    title: "Legal AI Development Process",
    imgSrc: "https://legalai-bucket.s3.ap-south-1.amazonaws.com/4.jpg",
    description:
      " In the legal sector, handling large volumes of documents is aroutine but essential task. Legal practitioners, researchers, and even clients frequently deal with extensive paperwork that demands careful review and analysis. However, this manual process is time-consuming, prone to errors, and can lead to inefficiencies within the legal workflow. Our solution aims to address these challenges through the power of ArtificialIntelligence and Machine Learning.",
  };

  return (
    <section className="bg-gradient-to-r from-yellow-200 via-green-400 orange to-violet-400 min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full text-center space-y-8">
        <img
          src={item.imgSrc}
          alt={item.title}
          className="rounded-2xl w-full h-72 object-cover shadow-lg"
        />
        <h2 className="text-4xl font-bold">{item.title}</h2>
        <p className="text-black-300 text-lg max-w-3xl mx-auto">
          {item.description.length > 200
            ? `${item.description.substring(0, 200)}...`
            : item.description}
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="px-8 py-3 bg-black hover:bg-gradient-to-r from-yellow-400 via green - 400 to-red-400 text-white rounded-full text-lg font-medium transition duration-300"
        >
          Read More
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-300 rounded-2xl max-w-4xl w-full p-8 relative text-black shadow-xl">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-black transition"
            >
              <FiX />
            </button>
            <img
              src={item.imgSrc}
              alt={item.title}
              className="rounded-xl h-72 w-full object-cover mb-6"
            />
            <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
            <p className="text-black text-lg leading-relaxed">
              {item.description}
              <br />
              <br />
              Our AI-based service specializes in summarizing and classifying
              legal documents to streamline legal processes. By leveraging
              advanced machine learning (ML) techniques, we have developed tools
              that assist legal professionals in managing information overload,
              improving accuracy, and enhancing workflow efficiency.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ReadMore;