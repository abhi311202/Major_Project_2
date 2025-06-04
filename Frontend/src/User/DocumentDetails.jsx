import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DocumentDetails = () => {
  const { id } = useParams();
  const [documentData, setDocumentData] = useState(null);
  const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await axios.post(`${baseURL}/Document/get-document-by-id`, {
          id: id,
        });
        setDocumentData(response.data.documents[0]); // Since it's one document
      } catch (error) {
        console.erraor("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, [id]);

  if (!documentData) return <div>Loading...</div>;

  const { Doc, Key_Entities, Metadata, MongoDB } = documentData;

  return (
  <div className="p-6 max-w-6xl mx-auto dark:bg-black">
  <div className="bg-white shadow-md rounded-lg p-6 dark:bg-[#222]">
    
    {/* Header */}
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
        Document Details
      </h1>
      <a
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        href={Doc?.S3_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download File
      </a>
    </div>

    {/* Document Basic Info */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      
      <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black dark:text-white">
        <strong>Title:</strong>
        <p>{MongoDB?.Doc_Title}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black dark:text-white">
        <strong>Classification:</strong>
        <p>{MongoDB?.Classification || "Not Classified"}</p>
      </div>
      <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black dark:text-white">
        <strong>Document Hash:</strong>
        <p className="break-all">{Doc?.Document_Hash}</p>
      </div>
      <div className="sm:col-span-4 bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black dark:text-white">
        <strong>Summary:</strong>
        <p className="mt-2">{MongoDB?.Summary}</p>
      </div>
    </div>

    {/* Key Entities Section */}
    {Key_Entities && (
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">
          Key Entities
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(Key_Entities).map(([key, value]) => (
            <div
              key={key}
              className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black dark:text-white"
            >
              <strong>{key}:</strong>
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Metadata Section */}
  {Metadata && (
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-2 dark:text-white">
      Metadata
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(Metadata).map(([key, value]) => {
        // Format fields that look like dates
        const isDateField = key.toLowerCase().includes("date");
        const formattedValue = isDateField
          ? new Date(value).toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            })
          : String(value);

        return (
          <div
            key={key}
            className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black dark:text-white"
          >
            <strong>{key}:</strong>
            <p>{formattedValue}</p>
          </div>
        );
      })}
    </div>
  </div>
)}

  </div>
</div>

  );
};

export default DocumentDetails;
