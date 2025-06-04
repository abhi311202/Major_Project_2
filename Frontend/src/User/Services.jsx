import React from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from "@/components/Navbar";
import { useNavigate } from 'react-router-dom';
const services = [
  {
    title: 'RAG on Specific Doc',
    category: 'Service',
    description: 'Use Retrieval-Augmented Generation for individual documents',
    link: '#'
  },
  {
    title: 'Use RAG on Global/State/Local Scope',
    category: 'Service',
    description: 'Apply RAG across large document collections by scope',
    link: '#'
  },
  {
    title: 'Search Document',
    category: 'Data',
    description: 'Perform smart search across indexed legal or academic documents',
    link: '/SearchDocument'
  },
  {
    title: 'Vision RAG on Single Doc',
    category: 'Infrastructure',
    description: 'Integrate image understanding with RAG for single docs',
    link: '#'
  },
  {
    title: 'Vision RAG with Global Scope',
    category: 'Infrastructure',
    description: 'Scale Vision + RAG across massive document stores',
    link: '#'
  }
];

export default function Services() {
    const navigate = useNavigate();
  return (
    <>
    <Navbar />
    
      {/* <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 underline">Services</h2> */}

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-100 p-6 rounded-3xl shadow-lg hover:shadow-indigo-500 transition duration-300 border border-gray-100 hover:border-indigo-500"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-blue-200 to-purple-200 text-blue-900 mb-4">
              {service.category}
            </span>
            <h3 className="text-xl font-semibold text-gray-900">{service.title}</h3>
            <p className="text-gray-600 mt-2 mb-4">{service.description}</p>
            <button
              onClick={() => navigate(service.link)}
              className="flex items-center text-sm font-medium text-indigo-600 hover:underline"
            >
              View service <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
   
    </>
  );
}
