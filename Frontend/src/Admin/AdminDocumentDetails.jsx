import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu"; // ✅ Adjust the path based on your folder structure
  import { Globe, ChevronDown, Download, Sun, Moon } from "lucide-react";
  import { Button } from "@/components/ui/button"; // ✅ adjust path
  import { useTranslation } from "react-i18next";

const AdminDocumentDetails = () => {
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
  const { t, i18n } = useTranslation();
  
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};

  if (!documentData) return <div>Loading...</div>;

  const { Doc, Key_Entities, Metadata, MongoDB } = documentData;

  return (
    <>
    <div className="sticky top-0 z-50 bg-white dark:bg-[#111] shadow-md border-b border-gray-200 dark:border-gray-800 mb-6">
  <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
    
    {/* Left: Title */}
    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Admin side Document</h2>

    {/* Right: Controls */}
    <div className="flex items-center gap-4">

      {/* 🌐 Language Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded-md text-sm">
          <Globe size={18} />
          <ChevronDown size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("hi")}>Hindi</DropdownMenuItem>
          <DropdownMenuItem onClick={() => changeLanguage("bn")}>Bengali</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 🌗 Theme Toggle */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>{t("light")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>{t("dark")}</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>{t("system")}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 📥 Download Buttons */}
      <div className="flex items-center gap-2">
        <div className="relative group">
          <button
            onClick={() => handleDownloadPDF(documentData)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <Download className="w-4 h-4" />
          </button>
          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
            Uploaded doc
          </span>
        </div>
        <div className="relative group">
          <button
            onClick={() => orignalPDF(documentData)}
            className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white p-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <Download className="w-4 h-4" />
          </button>
          <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
            Original doc
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

    
  <div className="p-6 max-w-6xl mx-auto dark:bg-black">
  <div className="bg-white shadow-md rounded-lg p-6 dark:bg-[#222]">
    
    {/* Header */}
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
        Document Details
      </h1>
      {/* <a
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        href={Doc?.S3_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        Download File
      </a> */}
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
      {/* <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black dark:text-white">
        <strong>Document Hash:</strong>
        <p className="break-all">{Doc?.Document_Hash}</p>
      </div> */}
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
</>

  );
};

export default AdminDocumentDetails;
