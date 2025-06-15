import React from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from "@/components/Navbar";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Services() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.ragSingleDoc.title'),
      category: t('services.ragSingleDoc.category'),
      description: t('services.ragSingleDoc.description'),
      link: '#',
    },
    {
      title: t('services.ragGlobalScope.title'),
      category: t('services.ragGlobalScope.category'),
      description: t('services.ragGlobalScope.description'),
      link: '#',
    },
    {
      title: t('services.search.title'),
      category: t('services.search.category'),
      description: t('services.search.description'),
      link: '/SearchDocument',
    },
    {
      title: t('services.visionSingle.title'),
      category: t('services.visionSingle.category'),
      description: t('services.visionSingle.description'),
      link: '#',
    },
    {
      title: t('services.visionGlobal.title'),
      category: t('services.visionGlobal.category'),
      description: t('services.visionGlobal.description'),
      link: '#',
    },
  ];

  return (
    <>
      <Navbar />
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 underline">
        {t('servicesPageTitle')}
      </h2>

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
              {t('viewService')} <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
