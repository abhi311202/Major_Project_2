import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, Pencil, Download } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import React from "react";

function UploadedDocument() {
  const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable
  const navigate = useNavigate();
  const [uploadedDocuments, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(""); // State to track the selected document
//   const [isEditing, setIsEditing] = useState(false);
//   const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
//   const [selectedClassType, setSelectedClassType] = useState("All");
  const [classError, setClassError] = useState("");
  //  const [document, setDocument] = useState(null);

//   const [sortOrder, setSortOrder] = useState("A-Z");

  const stripHTML = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };
  const {
    register,
    handleSubmit,
    setValue, // <-- Add this
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: selectedDocument?.title || "",
      Class: selectedDocument?.Class || "",
      uploadDate: selectedDocument?.uploadDate || "",
      ClassificationReason: selectedDocument?.ClassificationReason || "",
      summary: selectedDocument?.summary || "",
    },
  });
  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${baseURL}/Document/get-documents`);
  
        console.log("📦 Full API Response:", response.data); // ✅ Log full response
  
        if (response.data && Array.isArray(response.data.documents)) {
          setDocuments(response.data.documents);
          setFilteredDocuments(response.data.documents);
        } else {
          console.warn("⚠️ Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("❌ Error fetching documents:", error);
      }
    };
  
    fetchDocuments();
  }, []);
  
//   useEffect(() => {
//     handleSearch();
//   }, [startDate, endDate, sortOrder, selectedClassType]);

//   const caseTypes = ["All", "Criminal", "Civil", "Constitutional"];

//   const handleSearch = () => {
//     let filtered = [...uploadedDocuments];

//     // Filter by Class Type
//     if (selectedClassType && selectedClassType !== "All") {
//       filtered = filtered.filter((doc) => {
//         const docClassTypes = stripHTML(doc.Class)
//           .toLowerCase()
//           .replace(/\s+/g, ""); // Remove whitespaces

//         return docClassTypes.includes(selectedClassType.toLowerCase());
//       });
//     }

//     // Filter by Date Range
//     if (startDate && endDate) {
//       filtered = filtered.filter((doc) => {
//         const docDate = new Date(doc.uploadDate);
//         return docDate >= new Date(startDate) && docDate <= new Date(endDate);
//       });
//     }

//     // Sort Documents
//     if (sortOrder) {
//       filtered.sort((a, b) =>
//         sortOrder === "A-Z"
//           ? a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
//           : b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
//       );
//     }

//     // Update the filtered documents
//     setFilteredDocuments(filtered);
//   };

  // Fetch uploaded documents
  React.useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${baseURL}/Document/get-documents`);
if (response.data && Array.isArray(response.data.documents)) {
  setDocuments(response.data.documents);
  setFilteredDocuments(response.data.documents);
} else {
  console.warn("Unexpected response format:", response.data);
}

      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
  
    fetchDocuments();
  }, []);
  

  const handleViewMore = (doc) => {
    const newTab = window.open(`/document-details2/${doc._id}`, "_blank");
    newTab.focus();
  };


  // Handle document deletion
//   const handleDelete = async (doc1) => {

//     console.log(doc1,"ayush");
//     try {
//       // deleting pdf first
//       // const pdfInfo = {
//       //   filename: doc1.title,
//       // };
//       // await axios.post("http://localhost:4001/delete-pdf", pdfInfo).then((res)=>{
//       //   if(res.data){
//       //     // alert("file Uploaded: "+res.data);
//       //     // toast.success(res.data.message);
//       //   }
//       // }).catch((err)=>{
//       //   if(err.response){
//       //     // alert("error occured");
//       //     toast.error(err.response);
//       //   }
//       // });


//       // deleting form DB
//       const response = await axios.delete(
//         `http://localhost:4001/admin/adminDeleteDocument/${doc1._id}`
//       );

//       if (response.status === 200) {
//         setDocuments((prevDocs) => prevDocs.filter((doc) => doc._id !== doc1._id));
//         setFilteredDocuments((prevDocs) =>
//           prevDocs.filter((doc) => doc._id !== doc1._id)
//         );
//         toast.success("Document deleted successfully!");
//       } else {
//         alert("Failed to delete document");
//       }
//     } catch (error) {
//       console.error("Error deleting document:", error);
//       alert("Error deleting document");
//     }
//   };
//   const handleEditClick = (doc) => {
//     setSelectedDocument(doc);
//     setShowEditDetailsModal(true);
//   };

  const validClasses = [
    "Civil Case",
    "Criminal Case",
    "Constitutional Case",
    "Civil Case\nCriminal Case",
    "Criminal Case\nCivil Case",
    "Civil Case\nConstitutional Case",
    "Constitutional Case\nCivil Case",
    "Criminal Case\nConstitutional Case",
    "Constitutional Case\nCriminal Case",
    "Civil Case\nCriminal Case\nConstitutional Case",
    "Civil Case\nConstitutional Case\nCriminal Case",
    "Criminal Case\nCivil Case\nConstitutional Case",
    "Criminal Case\nConstitutional Case\nCivil Case",
    "Constitutional Case\nCivil Case\nCriminal Case",
    "Constitutional Case\nCriminal Case\nCivil Case",
  ];

 

   function handleDownloadPDF (doc1){
    console.log(doc1);
      const doc = new jsPDF();
  
      // Define margins and styles
      const margin = 10;
      const topMargin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let currentY = topMargin;
  
      // Title Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`Title: ${doc1.title || "Untitled"}`, margin, currentY);
      currentY += 10;
  
      // Metadata Section
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("Class:", margin, currentY);
      currentY += 10;
      doc.setFont("helvetica", "normal");
  
      const classText = stripHTML(doc1.Class || "Not Classified");
      const classLines = doc.splitTextToSize(classText, pageWidth - margin * 2);
  
      classLines.forEach((line) => {
        if (currentY + 10 > pageHeight - margin) {
          doc.addPage();
          currentY = topMargin;
        }
        doc.text(line, margin, currentY);
        currentY += 10;
      });
  
  
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("ClassificationReason:", margin, currentY);
      currentY += 10;
      doc.setFont("helvetica", "normal");
  
  const classificationReason = stripHTML(doc1.ClassificationReason || "Not Classified");
  const classificationLines = doc.splitTextToSize(classificationReason, pageWidth - margin * 2);
  
  classificationLines.forEach((line) => {
    if (currentY + 10 > pageHeight - margin) {
      doc.addPage();
      currentY = topMargin;
    }
    doc.text(line, margin, currentY);
    currentY += 10;
  });
  
      doc.setFont("helvetica", "bold");
      doc.text("Upload Date:", margin, currentY);
      doc.setFont("helvetica", "normal");
      doc.text(new Date(doc1.uploadDate).toLocaleDateString() || "Not Available", margin + 32, currentY);
      currentY += 10;
  
      // Summary Section
      doc.setFont("helvetica", "bold");
      doc.text("Summary:", margin, currentY);
      currentY += 10;
      doc.setFont("helvetica", "normal");
      const summary = stripHTML(doc1.summary || "No summary available.");
      const summaryLines = doc.splitTextToSize(summary, pageWidth - margin * 2);
      summaryLines.forEach((line) => {
        if (currentY + 10 > pageHeight - margin) {
          doc.addPage();
          currentY = topMargin;
        }
        doc.text(line, margin, currentY);
        currentY += 10;
      });
  
      // Content Section
      doc.setFont("helvetica", "bold");
      doc.text("Content:", margin, currentY);
      currentY += 10;
      doc.setFont("helvetica", "normal");
      const content = stripHTML(doc1.content || "No content available.");
      const contentLines = doc.splitTextToSize(content, pageWidth - margin * 2);
      contentLines.forEach((line) => {
        if (currentY + 10 > pageHeight - margin) {
          doc.addPage();
          currentY = topMargin;
        }
        doc.text(line, margin, currentY);
        currentY += 10;
      });
  
      // Footer with Page Numbers
      const totalPages = doc.internal.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text(`Page${i} of ${totalPages}`, pageWidth / 2, pageHeight - margin, { align: "center" });
      }
  
      // Save the PDF
      doc.save(`${doc1.title || "Document"}.pdf`);
  
    };

  

  return (
    <>
       <div className="flex min-h-screen max-h-max dark:bg-[#222]">
  <div className="flex-1 p-4 sm:p-6">
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
      Documents Uploaded
    </h2>

  

    {filteredDocuments.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 ">
{filteredDocuments.map((doc) => {
  const metadata = doc.Metadata || {};
  const mongo = doc.MongoDB || {};
  const docInfo = doc.Doc || {};
  return (
    <div
    key={docInfo.doc_id}
    className="bg-white shadow-lg rounded-xl p-4 w-full sm:w-[1100px] border border-gray-200 dark:bg-gray-800 dark:border-gray-700 mb-4"
  >
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
        {mongo.Doc_Title || metadata.title || "Untitled"}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        <strong>Upload date:</strong>{" "}
        {new Date(docInfo.created_at).toLocaleDateString() || "No date"}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        <strong>Class:</strong>{" "}
        {mongo.Classification || metadata.Class || "Unclassified"}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        <strong>Summary:</strong> {mongo.Summary || metadata.summary || "No summary"}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        <strong>Case No:</strong> {doc.Key_Entities?.Case_no || "Not available"}
      </p>
    </div>

    <div className="flex justify-start">
      <button
        onClick={() => handleViewMore(doc)}
        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 transition"
      >
        View More
      </button>
    </div>
  </div>
  );
})}


      </div>
    ) : (
      <div className="text-center text-gray-500 dark:text-white">
        No document available
      </div>
    )}
  </div>

  {/* {showEditDetailsModal && renderEditDetailsModal()} */}
</div>
    </>
  );
}

export default UploadedDocument;
