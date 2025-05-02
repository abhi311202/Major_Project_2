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
    if (selectedDocument) {
      setValue("title", selectedDocument.title || "");
      setValue(
        "ClassificationReason",
        selectedDocument.ClassificationReason || ""
      );
      setValue("uploadDate", selectedDocument.uploadDate || "");

      setValue("Class", selectedDocument.Class || "");
      setValue("summary", selectedDocument.summary || "");
    }
  }, [selectedDocument, setValue]);
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
      const storedObjectString = localStorage.getItem("Admin");
      const myObject = JSON.parse(storedObjectString);
      const adminInfo = {
        adminid: myObject.id,
      };

      await axios
        .post("http://localhost:4001/Admin/adminDocumentsUploaded", adminInfo)
        .then((res) => {
          if (res.data) {
            setDocuments(res.data.docs);
            setFilteredDocuments(res.data.docs);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.error(err);
          }
        });
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

  // Open Edit Modal
//   const renderEditDetailsModal = () => {
//     const editDetails2 = async (data) => {
//       if (!selectedDocument || !selectedDocument._id) {
//         console.error("Error: selectedDocument is null or missing _id.");
//         return;
//       }

//       const c = data.Class.split("\n") // Split by newline
//         .map((line) => line.replace(/\s+/g, " ").trim()) // Replace multiple spaces & trim
//         .filter((line) => line.length > 0) // Remove empty lines
//         .join("\n");

//       let oth = false;
//       if (c === "Category: Out of Scope!" || c==="Other") {
//         oth = true;
//       } else if (!validClasses.includes(c)) {
//         setClassError("Invalid case type! Allowed values: Civil Case, Criminal Case, Constitutional Case and their valid combinations.Multiple Values should be seperated by new line."); // Set error message

//           // Clear error after 5 seconds
//           setTimeout(() => {
//             setClassError("");
//           }, 10000);

//           return toast.error("Invalid case type!");
//       }

//       const requestData = {
//         id: selectedDocument._id,
//         title: data.title,
//         ClassificationReason: data.ClassificationReason,
//         Class: oth ? "Other" : c,
//         summary: data.summary,
//       };

//       console.log(requestData, "abhi");

//       try {
//         const response = await axios.post(
//           "http://localhost:4001/admin/adminEditDetails2",
//           requestData
//         );

//         if (response.status === 200) {
//           // Update the uploadedDocuments and filteredDocuments states
//           setDocuments((prevDocs) =>
//             prevDocs.map((doc) =>
//               doc._id === selectedDocument._id
//                 ? { ...doc, ...requestData }
//                 : doc
//             )
//           );

//           setFilteredDocuments((prevDocs) =>
//             prevDocs.map((doc) =>
//               doc._id === selectedDocument._id
//                 ? { ...doc, ...requestData }
//                 : doc
//             )
//           );

//           setShowEditDetailsModal(false);
//           toast.success("Document updated successfully!");
//         }
//       } catch (error) {
//         console.error(
//           "Error updating document:",
//           error.response?.data || error
//         );
//         toast.error("Error updating document.");
//       }
//     };

//     return (
//       <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
//         <div
//           className="bg-white dark:bg-[#222] shadow-md rounded-lg p-6 w-full max-w-8xl overflow-y-auto"
//           style={{
//             marginTop: "0",
//             height: "100vh",
//             maxHeight: "100vh",
//           }}
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
//               Edit Details
//             </h2>
//           </div>

//           <form
//             onSubmit={handleSubmit(editDetails2)}
//             method="dialog"
//             className="space-y-4"
//           >
//             {/* Class Section */}
//             <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black">
//               <label className="block text-lg text-gray-700 dark:text-white font-semibold">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-black text-gray-700 dark:text-white"
//                 placeholder="Enter title"
//                 {...register("title", { required: true })}
//               />
//               {errors.title && (
//                 <span className="p-2 text-sm text-red-500">
//                   This field is required
//                 </span>
//               )}
//             </div>

//             <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black">
//               <label className="block text-lg text-gray-700 dark:text-white font-semibold">
//                 Class
//               </label>
//               <textarea
//                 rows="3"
//                 className={`w-full p-4 border ${
//                   classError ? "border-red-500" : "border-gray-300 dark:border-gray-600"
//                 } rounded-lg resize-none bg-white dark:bg-black text-gray-700 dark:text-white`}
//                 placeholder="Enter Class"
//                 {...register("Class", { required: true })}
//               />
//               {errors.Class && (
//                 <span className="p-2 text-sm text-red-500">This field is required</span>
//               )}
//               {classError && (
//                 <span className="p-2 text-sm text-red-500">{classError}</span>
//               )}
//             </div>

//             {/* Classification Reason Section */}
//             <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black">
//               <label className="block text-lg text-gray-700 dark:text-white font-semibold">
//                 Classification Reason
//               </label>
//               <textarea
//                 rows="10"
//                 className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-black text-gray-700 dark:text-white"
//                 {...register("ClassificationReason", { required: true })}
//               />
//               {errors.ClassificationReason && (
//                 <span className="p-2 text-sm text-red-500">
//                   This field is required
//                 </span>
//               )}
//             </div>

//             {/* Summary Section */}
//             <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black">
//               <label className="block text-lg text-gray-700 dark:text-white font-semibold">
//                 Summary
//               </label>
//               <textarea
//                 rows="18"
//                 className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-black text-gray-700 dark:text-white"
//                 placeholder="Summary"
//                 {...register("summary", { required: true })}
//               />
//               {errors.summary && (
//                 <span className="p-2 text-sm text-red-500">
//                   This field is required
//                 </span>
//               )}
//             </div>

//             {/* Buttons Section */}
//             <div className="flex justify-end gap-4 mt-6">
//               <button
//                 type="button"
//                 className="bg-red-500 text-white px-6 py-3 rounded-md"
//                 onClick={() => setShowEditDetailsModal(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="bg-green-600 text-white px-6 py-3 rounded-md"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     );
//   };

  // function to download Orignal pdf
//   function orignalPDF(doc) {
//     const newTab = window.open(
//       doc.pdfUrl,
//       "_blank"
//     );
//     newTab.focus();
//   };

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

  // Function to download document as PDF
  // const handleDownloadPDF = () => {
  //   const doc = new jsPDF();

  //   doc.setFont("helvetica", "normal");
  //   doc.setFontSize(14);

  //   // Add Title
  //   doc.text(`Title: ${selectedDocument.title || "Untitled"}`, 10, 10);
  //   doc.text(`Class: ${stripHTML(selectedDocument.Class) || "Not Classified"}`, 10, 20);
  //   doc.text(
  //     `Uploaded Date: ${selectedDocument.uploadDate || "Not Available"}`,
  //     10,
  //     30
  //   );

  //   // Add Summary
  //   doc.text("Summary:", 10, 40);
  //   const summary = stripHTML(selectedDocument.summary || "No summary available.");
  //   doc.text(summary, 10, 50, { maxWidth: 180 });

  //   // Add Content
  //   doc.text("Content:", 10, 70);
  //   const content = stripHTML(
  //     selectedDocument.content || "No additional content provided."
  //   );

  //   // Add the content text with automatic wrapping
  //   const contentLines = doc.splitTextToSize(content, 180);
  //   doc.text(contentLines, 10, 80);

  //   // Save the PDF
  //   doc.save(`${selectedDocument.title || "Document"}.pdf`);
  // };

  return (
    <>
       <div className="flex min-h-screen max-h-max dark:bg-[#222]">
  <div className="flex-1 p-4 sm:p-6">
    <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">
      Documents Uploaded
    </h2>

  

    {filteredDocuments.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 ">
        {filteredDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white dark:bg-black p-3 sm:p-4 rounded-lg shadow-md w-full sm:max-w-[1150px] mx-auto relative border rounded-md resize-none"
          >
            {/* Buttons on Top-Right */}
            <div className="absolute top-2 right-2 flex gap-2">
              {/* <button
                className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-1 sm:p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8"
                onClick={() => {
                  setSelectedDocument(doc);
                  setShowEditDetailsModal(true);
                }}
              >
                <Pencil className="w-3 sm:w-4 h-3 sm:h-4" />
              </button> */}

              {/* <button
                onClick={() => handleDelete(doc)}
                className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-1 sm:p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8"
              >
                <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
              </button> */}
                {/* Download Buttons */}
                {/* <div className="relative group">
                      <button
                        onClick={()=>handleDownloadPDF(doc)}
                        className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
                      >
                        <Download className="w-3 sm:w-4 h-3 sm:h-4" />
                      </button>
                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                        Uploaded doc
                      </span>
                 </div> */}
                 {/* <div className="relative group">
                      <button
                        onClick={() => orignalPDF(doc)}
                        className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
                      >
                        <Download className="w-3 sm:w-4 h-3 sm:h-4" />
                      </button>
                      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
                        Original doc
                      </span>
                    </div> */}


            </div>

            {/* Document Title and Date */}
            <div className="mb-2 ">
              <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-white truncate w-full sm:w-[1050px]">
                {doc.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-white truncate w-full sm:w-[1050px]">
                <strong>Upload date:</strong> {stripHTML(doc.uploadDate) || "No date available."}
              </p>
              <p className="text-xs sm:text-sm text-gray-700 dark:text-white truncate w-full sm:w-[1050px]">
                <strong>Class:</strong> {stripHTML(doc.Class) || "Unclassified"}
              </p>
              <p className="text-sm text-gray-700 dark:text-white line-clamp-2 overflow-hidden text-ellipsis">
                <strong>Summary:</strong> {stripHTML(doc.summary) || "No summary available."}
              </p>
              <p className="text-sm text-gray-700 dark:text-white line-clamp-2 overflow-hidden text-ellipsis">
                <strong>Case No:</strong> {stripHTML(doc.caseno) || "No summary available."}
              </p>
              
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
              <button
                onClick={() => handleViewMore(doc)}
                className="bg-black text-white px-3 sm:px-4 py-2 rounded-md hover:bg-gray-700 transition duration-300 w-full sm:w-auto text-xs sm:text-sm"
              >
                View More
              </button>
            </div>
          </div>
        ))}
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
