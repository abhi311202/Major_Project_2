import axios from "axios";
import { jsPDF } from "jspdf"; // Import jsPDF
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2, Pencil, Download } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
function UploadedDocument() {
  const [document, setDocument] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [summary, setSummary] = useState("");
  const [Class, SetClass] = useState("");
  const [Other, setOther] = useState(null);
  const [loading1, setLoading1] = useState(false); // Add loading state
  const [loading2, setLoading2] = useState(false); // Add loading state
  const [summarizationError, setSummarizationError] = useState(null);
  const [classificationError, setClassificationError] = useState(null);
  const [entitymetaError, setEntitymetaError] = useState(null);
  const [documents, setDocuments2] = useState([]);
  const [classification, setClassification] = useState("");
  const [entitymeta, setEntitymeta] = useState("");
  const [caseno, setCaseno] = useState("");
  const [casetype, setCasetype] = useState("");
  const [filingdate, setFilingdate] = useState("");
  const [casestatus, setCasestatus] = useState("");
  const [judgmentdate, setJudgmentdate] = useState("");
  const [courtname, setCourtname] = useState("");
  const [bench, setBench] = useState("");
  const [petitioner, setPetitioner] = useState("");
  const [respondent, setRespondent] = useState("");
  const [advofpetitioner, setAdvofpetitioner] = useState("");
  const [advofrespondent, setAdvofrespondent] = useState("");
  const [prevcasecitation, setPrevcasecitation] = useState("");
  const [penaltydetail, setPenaltydetail] = useState("");
  const [headnote, setHeadnote] = useState("");
  const [courtno, setCourtno] = useState("");
  const [judgementauthor, setJudgementauthor] = useState("");
  const [judgementtype, setJudgementtype] = useState("");
  const [langofjudgement, setLangofjudgement] = useState("");
  const [dateofhearing, setDateofhearing] = useState("");
  const [dateoforderpro, setDateoforderpro] = useState("");
  const [benchcomposition, setBenchcomposition] = useState("");
  const [referredacts, setReferredacts] = useState("");
  const [classificationReason, setClassificationReason] = useState("");
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
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  const [courtName, setCourtName] = useState('');
const [judgementAuthor, setJudgementAuthor] = useState('');
const [advOfRespondent, setAdvOfRespondent] = useState('');
const [advOfPetitioner, setAdvOfPetitioner] = useState('');
const [uploadedDocument, setUploadedDocuments] = useState([]);


const [caseStatus, setCaseStatus] = useState('');
const [filingDateFrom, setFilingDateFrom] = useState('');
const [filingDateTo, setFilingDateTo] = useState('');
const [judgementDateFrom, setJudgementDateFrom] = useState('');
const [judgementDateTo, setJudgementDateTo] = useState('');
const [orderDateFrom, setOrderDateFrom] = useState('');
const [orderDateTo, setOrderDateTo] = useState('');
const [hearingDateFrom, setHearingDateFrom] = useState('');
const [hearingDateTo, setHearingDateTo] = useState('');
const [uploadDateFrom, setUploadDateFrom] = useState('');
const [uploadDateTo, setUploadDateTo] = useState('');
const [judgementType, setJudgementType] = useState('');
const [languageOfJudgement, setLanguageOfJudgement] = useState('');

const [title, setTitle]=useState('');
const [titleInput, setTitleInput] = useState('');
const [sortOrder, setSortOrder] = React.useState('asc'); // or 'desc'
  //  const [document, setDocument] = useState(null);

//   const [sortOrder, setSortOrder] = useState("A-Z");

const renderEditDetailsModal = () => {
  const editDetails2 = async (data) => {
    if (!selectedDocument || !selectedDocument._id) {
      console.error("Error: selectedDocument is null or missing _id.");
      return;
    }

    const c = data.Class.split("\n") // Split by newline
      .map((line) => line.replace(/\s+/g, " ").trim()) // Replace multiple spaces & trim
      .filter((line) => line.length > 0) // Remove empty lines
      .join("\n");

    let oth = false;
    if (c === "Category: Out of Scope!" || c==="Other") {
      oth = true;
    } else if (!validClasses.includes(c)) {
      setClassError("Invalid case type! Allowed values: Civil Case, Criminal Case, Constitutional Case and their valid combinations.Multiple Values should be seperated by new line."); // Set error message

        // Clear error after 5 seconds
        setTimeout(() => {
          setClassError("");
        }, 10000);

        return toast.error("Invalid case type!");
    }

    const requestData = {
      id: selectedDocument._id,
      title: data.title,
      ClassificationReason: data.ClassificationReason,
      Class: oth ? "Other" : c,
      summary: data.summary,
    };

    console.log(requestData, "abhi");

    try {
      const response = await axios.post(
        "http://localhost:4001/admin/adminEditDetails2",
        requestData
      );

      if (response.status === 200) {
        // Update the uploadedDocuments and filteredDocuments states
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc._id === selectedDocument._id
              ? { ...doc, ...requestData }
              : doc
          )
        );

        setFilteredDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc._id === selectedDocument._id
              ? { ...doc, ...requestData }
              : doc
          )
        );

        setShowEditDetailsModal(false);
        toast.success("Document updated successfully!");
      }
    } catch (error) {
      console.error(
        "Error updating document:",
        error.response?.data || error
      );
      toast.error("Error updating document.");
    }
  };
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(`${baseURL}/Document/get-documents`);
        console.log("Documents response:", res.data);

        if (res.data && res.data.documents) {
          setDocuments2(res.data.documents);
          setFilteredDocuments(res.data.documents);
        }
      } catch (err) {
        console.error(err.response || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  useEffect(() => {
  let filtered = [...documents];

  

  // Classification
  if (classification) {
    filtered = filtered.filter(doc =>
      doc.MongoDB?.Classification === classification
    );
  }

if (advOfPetitioner.trim()) {
  filtered = filtered.filter(doc =>
    doc.Key_Entities?.Adv_of_petitioner?.toLowerCase().trim().includes(advOfPetitioner.toLowerCase().trim())
  );
}



if (advOfRespondent.trim()) {
  filtered = filtered.filter(doc =>
    doc.Key_Entities?.Adv_of_respondent?.toLowerCase().includes(advOfRespondent.toLowerCase())
  );
}


  // Bench
  if (bench.trim()) {
    filtered = filtered.filter(doc =>
      doc.Key_Entities?.Bench?.toLowerCase().includes(bench.toLowerCase())
    );
  }

    if (caseno.trim()) {
    filtered = filtered.filter(doc =>
      doc.Key_Entities?.Case_no?.toLowerCase().includes(caseno.toLowerCase())
    );
  }

    if (courtno.trim()) {
    filtered = filtered.filter(doc =>
      doc.Key_Entities?.Court_no?.toLowerCase().includes(courtno.toLowerCase())
    );
  }

  // Case Status
  if (caseStatus) {
    filtered = filtered.filter(doc =>
      doc.Key_Entities?.Case_Status?.toLowerCase() === caseStatus.toLowerCase()
    );
  }
    if (courtName.trim()) {
    filtered = filtered.filter(doc =>
      doc.Key_Entities?.Court_name?.toLowerCase().includes(courtName.toLowerCase())
    );
  }

  // Filing Date Range
  if (filingDateFrom) {
    filtered = filtered.filter(doc =>
      new Date(doc.Key_Entities?.Filing_date) >= new Date(filingDateFrom)
    );
  }

  if (filingDateTo) {
    filtered = filtered.filter(doc =>
      new Date(doc.Key_Entities?.Filing_date) <= new Date(filingDateTo)
    );
  }

    if (judgementDateFrom) {
    filtered = filtered.filter(doc =>
      new Date(doc.Key_Entities?.Judgement_date) >= new Date(judgementDateFrom)
    );
  }

  if (judgementDateTo) {
    filtered = filtered.filter(doc =>
      new Date(doc.Key_Entities?.Judgement_date) <= new Date(judgementDateTo)
    );
  }
//////

 if (uploadDateFrom) {
    filtered = filtered.filter(doc =>
      new Date(doc.Doc?.created_at) >= new Date(uploadDateFrom)
    );
  }

  if (uploadDateTo) {
    filtered = filtered.filter(doc =>
      new Date(doc.Doc?.created_at) <= new Date(uploadDateTo)
    );
  }
      if (orderDateFrom) {
    filtered = filtered.filter(doc =>
      new Date(doc.Metadata?.Date_of_order_pronouncement) >= new Date(orderDateFrom)
    );
  }

  if (orderDateTo) {
    filtered = filtered.filter(doc =>
      new Date(doc.Metadata?.Date_of_order_pronouncement) <= new Date(orderDateTo)
    );
  }

      if (hearingDateFrom) {
    filtered = filtered.filter(doc =>
      new Date(doc.Metadata?.Date_of_hearing) >= new Date(hearingDateFrom)
    );
  }

  if (hearingDateTo) {
    filtered = filtered.filter(doc =>
      new Date(doc.Metadata?.Date_of_hearing) <= new Date(hearingDateTo)
    );
  }

  // Judgement Type
  if (judgementType.trim()) {
    filtered = filtered.filter(doc =>
      doc.Metadata?.Judgement_type?.toLowerCase().includes(judgementType.toLowerCase())
    );
  }

  // Language of Judgement
  if (languageOfJudgement.trim()) {
    filtered = filtered.filter(doc =>
      doc.Metadata?.Language_of_Judgement?.toLowerCase().includes(languageOfJudgement.toLowerCase())
    );
  }
    if (judgementAuthor.trim()) {
    filtered = filtered.filter(doc =>
      doc.Metadata?.Judgement_author?.toLowerCase().includes(judgementAuthor.toLowerCase())
    );
  }

   if (caseno.trim()) {
    filtered = filtered.filter(doc =>
      doc.Key_Entities?.Case_no?.toLowerCase().includes(caseno.toLowerCase())
    );
  }

   if (courtno.trim()) {
    filtered = filtered.filter(doc =>
      doc.Key_Entities?.Court_no?.toLowerCase().includes(courtno.toLowerCase())
    );
  }
  if (title.trim()) {
    filtered = filtered.filter(doc =>
      doc.MongoDB?.Doc_Title?.toLowerCase().includes(title.toLowerCase())
    );
  }

  setFilteredDocuments(filtered);
  if (sortBy) {
  filtered.sort((a, b) => {
    switch (sortBy) {
      case 'date-asc':
        return new Date(a.MongoDB?.created_at || a.Doc?.created_at) - new Date(b.MongoDB?.created_at || b.Doc?.created_at);
      case 'date-desc':
        return new Date(b.MongoDB?.created_at || b.Doc?.created_at) - new Date(a.MongoDB?.created_at || a.Doc?.created_at);
      case 'name-desc':
        return (b.MongoDB?.Doc_Title || '').localeCompare(a.MongoDB?.Doc_Title || '');
      case 'name-asc':
      default:
        return (a.MongoDB?.Doc_Title || '').localeCompare(b.MongoDB?.Doc_Title || '');
    }
  });
}

}, [
  classification,
  advOfPetitioner,
  advOfRespondent,
  courtName,
  bench,
  caseno,
  courtno,
  caseStatus,
  filingDateFrom,
  judgementAuthor,
  filingDateTo,
  judgementType,
  languageOfJudgement,
  judgementDateFrom,
  judgementDateTo,
  orderDateFrom,
  orderDateTo,
  hearingDateFrom,
  hearingDateTo,
  uploadDateFrom,
  uploadDateTo,
  title,
  sortBy ,
  documents
]);



  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-[999]">
  <div
    className="bg-white dark:bg-[#222] shadow-md rounded-lg p-6 w-full max-w-10xl overflow-y-auto"
    style={{
      marginTop: "0",
      height: "100vh",
      maxHeight: "100vh",
    }}
  >
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
        Edit Details
      </h2>
    </div>

    <form onSubmit={handleSubmit(editDetails2)} method="dialog" className="space-y-6">
      {/* --- Title & Class Info --- */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black">
        <label className="block text-lg text-gray-700 dark:text-white font-semibold">Title</label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-black text-gray-700 dark:text-white"
          placeholder="Enter title"
          {...register("title", { required: true })}
        />
        {errors.title && <span className="p-2 text-sm text-red-500">This field is required</span>}
      </div>

      <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black">
        <label className="block text-lg text-gray-700 dark:text-white font-semibold">Class</label>
        <textarea
          rows="3"
          className={`w-full p-4 border ${classError ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-lg resize-none bg-white dark:bg-black text-gray-700 dark:text-white`}
          placeholder="Enter Class"
          {...register("Class", { required: true })}
        />
        {errors.Class && <span className="p-2 text-sm text-red-500">This field is required</span>}
        {classError && <span className="p-2 text-sm text-red-500">{classError}</span>}
      </div>

      {/* --- Classification Reason --- */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black">
        <label className="block text-lg text-gray-700 dark:text-white font-semibold">Classification Reason</label>
        <textarea
          rows="10"
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-black text-gray-700 dark:text-white"
          {...register("ClassificationReason", { required: true })}
        />
        {errors.ClassificationReason && <span className="p-2 text-sm text-red-500">This field is required</span>}
      </div>

      {/* --- Summary --- */}
      <div className="bg-gray-50 p-4 rounded-md shadow-sm dark:bg-black">
        <label className="block text-lg text-gray-700 dark:text-white font-semibold">Summary</label>
        <textarea
          rows="8"
          className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none bg-white dark:bg-black text-gray-700 dark:text-white"
          {...register("summary", { required: true })}
        />
        {errors.summary && <span className="p-2 text-sm text-red-500">This field is required</span>}
      </div>

      {/* --- Key Entities Section --- */}
      <div className="bg-gray-50 dark:bg-black p-4 rounded-md shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Key Entities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Case No", name: "caseno", value: caseno, setter: setCaseno },
            { label: "Case Type", name: "casetype", value: casetype, setter: setCasetype },
            { label: "Case Status", name: "casestatus", value: casestatus, setter: setCasestatus },
            { label: "Filing Date", name: "filingdate", value: filingdate, setter: setFilingdate, type: "date" },
            { label: "Judgment Date", name: "judgmentdate", value: judgmentdate, setter: setJudgmentdate, type: "date" },
            { label: "Court No", name: "courtno", value: courtno, setter: setCourtno },
            { label: "Court Name", name: "courtname", value: courtname, setter: setCourtname },
            { label: "Bench", name: "bench", value: bench, setter: setBench },
            { label: "Petitioner", name: "petitioner", value: petitioner, setter: setPetitioner },
            { label: "Respondent", name: "respondent", value: respondent, setter: setRespondent },
            { label: "Adv. of Petitioner", name: "advofpetitioner", value: advofpetitioner, setter: setAdvofpetitioner },
            { label: "Adv. of Respondent", name: "advofrespondent", value: advofrespondent, setter: setAdvofrespondent },
            { label: "Previous Case Citation", name: "prevcasecitation", value: prevcasecitation, setter: setPrevcasecitation },
            { label: "Penalty Detail", name: "penaltydetail", value: penaltydetail, setter: setPenaltydetail },
            { label: "Head Note", name: "headnote", value: headnote, setter: setHeadnote },
          ].map(({ label, name, value, setter, type }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">{label}:</label>
              <input
                type={type || "text"}
                value={value}
                onChange={(e) => {
                  setter(e.target.value);
                  setValue(name, e.target.value);
                }}
                className="w-full border rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- Meta Data Section --- */}
      <div className="bg-gray-50 dark:bg-black p-4 rounded-md shadow-sm">
        <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Meta Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Judgement Author", name: "judgementauthor", value: judgementauthor, setter: setJudgementauthor },
            { label: "Judgement Type", name: "judgementtype", value: judgementtype, setter: setJudgementtype },
            { label: "Language of Judgement", name: "langofjudgement", value: langofjudgement, setter: setLangofjudgement },
            { label: "Date of Hearing", name: "dateofhearing", value: dateofhearing, setter: setDateofhearing, type: "date" },
            { label: "Date of Order Pronouncement", name: "dateoforderpro", value: dateoforderpro, setter: setDateoforderpro, type: "date" },
            { label: "Bench Composition", name: "benchcomposition", value: benchcomposition, setter: setBenchcomposition },
            { label: "Referred Acts", name: "referredacts", value: referredacts, setter: setReferredacts },
          ].map(({ label, name, value, setter, type }) => (
            <div key={name}>
              <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">{label}:</label>
              <input
                type={type || "text"}
                value={value}
                onChange={(e) => {
                  setter(e.target.value);
                  setValue(name, e.target.value);
                }}
                className="w-full border rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- Submit Buttons --- */}
      <div className="flex justify-end gap-4 mt-6">
        <button type="button" onClick={() => setShowEditDetailsModal(false)} className="bg-black text-white px-6 py-3 rounded-md">
          Cancel
        </button>
        <button type="submit" className="bg-black text-white px-6 py-3 rounded-md">
          Save
        </button>
      </div>
    </form>
  </div>
</div>

  );
};
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
        console.log("📦 Documents length", response.data.documents.length); // ✅ Log documents array
  
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

  const handleDelete = async (doc) => {
    const documentId = doc?.Doc?.doc_id;
  
    if (!documentId) {
      console.error("❌ doc_id not found!");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:4001/Document/delete-document-by-id",
        { document_id: documentId }
      );
  
      console.log("🗑️ Delete successful:", response.data);
      toast.success("Document deleted successfully!");
  
      // Remove from UI
      setUploadedDocuments((prev) =>
        prev.filter((d) => d.Doc.doc_id !== documentId)
      );
    } catch (error) {
      console.error("❌ Failed to delete document:", error);
    }
  };
  
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await axios.get(`${baseURL}/Document/get-documents`);
        console.log("Documents response:", res.data);

        if (res.data && res.data.documents) {
          setDocuments(res.data.documents);
          setFilteredDocuments(res.data.documents);
        }
      } catch (err) {
        console.error(err.response || err.message);
      } finally {
        setLoading(false);
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
    console.log("Clicked doc:", doc);
    const docId = doc?.Doc?.doc_id;
    if (!docId) {
      alert("Document ID not found!");
      return;
    }
  
    const newTab = window.open(`/document-details2/${docId}`, "_blank");
    newTab?.focus();
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
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

  

  return (
    <>
       <div className="flex min-h-screen dark:bg-[#222]">
  
       <aside className="w-64 sticky top-20 h-fit bg-white p-4 rounded-lg shadow-md space-y-6">
    <h3 className="text-lg font-semibold mb-4">Meta Data Filters</h3>
    
 

    

    <div className="mb-4">
  <label className="block font-medium mb-1">{t("judgementAuthor")}</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Metadata?.Judgement_author?.trim())
          .filter(Boolean)
      )
    ]}
    value={judgementAuthor}
    onInputChange={(event, newValue) => setJudgementAuthor(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder={t("enterAuthorName")}
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>
<div className="mb-4">
  <label className="block font-medium mb-1">{t("judgementType")}</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Metadata?.Judgement_type?.trim())
          .filter(Boolean)
      )
    ]}
    value={judgementType}
    onInputChange={(event, newValue) => setJudgementType(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder={t("enterJudgementType")}
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>
<div className="mb-4">
  <label className="block font-medium mb-1">{t("languageOfJudgement")}</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Metadata?.Language_of_Judgement?.trim())
          .filter(Boolean)
      )
    ]}
    value={languageOfJudgement}
    onInputChange={(event, newValue) => setLanguageOfJudgement(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder={t("enterLanguage")}
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>
<div className="mb-4">
  <label className="block font-medium mb-1">Bench Composition</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Metadata?.Bench_Composition?.trim())
          .filter(Boolean)
      )
    ]}
    value={benchcomposition}
    onInputChange={(event, newValue) => setBenchcomposition(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Bench Composition"
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Referred Acts</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Metadata?.Referred_acts?.trim())
          .filter(Boolean)
      )
    ]}
    value={referredacts}
    onInputChange={(event, newValue) => setReferredacts(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Refrred Acts"
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>
  {/* Judgement Date Range */}







<div className="mb-4">
  <label className="block font-medium mb-1">{t("orderPronounceFrom")}</label>
  <input
    type="date"
    value={orderDateFrom}
    onChange={e => setOrderDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>


<div className="mb-4">
  <label className="block font-medium mb-1">{t("orderPronounceTo")}</label>
   <input
    type="date"
    value={orderDateTo}
    onChange={e => setOrderDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>



<div className="mb-4">
  <label className="block font-medium mb-1">{t("hearingDateFrom")}</label>
   <input
    type="date"
    value={hearingDateFrom}
    onChange={e => setHearingDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">{t("hearingDateTo")}</label>
  <input
    type="date"
    value={hearingDateTo}
    onChange={e => setHearingDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

  </aside>




  <main className="flex-1 p-4 sm:p-6">
  <h1 className="text-4xl font-bold text-center w-full text-gray-800">
     {t("searchDocumentAdvanced")}
</h1>

  <div className="mb-4 flex items-center gap-2">
  <div className="flex-1">
    <Autocomplete
  freeSolo
  options={[
    ...new Set(
      documents
        .map(doc => doc.MongoDB?.Doc_Title?.trim())
        .filter(Boolean)
    )
  ]}
  value={titleInput}
  onInputChange={(event, newValue) => setTitleInput(newValue)}
  size="small"
  slotProps={{
    popper: {
      modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
    },
    paper: {
      sx: {
        fontSize: '12px',
        maxHeight: '150px',
        paddingY: '4px',
      },
    },
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder={t("enterDocumentTitle")}
      variant="outlined"
      className="w-full"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '12px',
          padding: '2px',
          '@media (min-width: 640px)': {
            fontSize: '13px',
            padding: '4px',
          },
        },
        '& .MuiInputBase-input': {
          padding: '6px 8px',
        },
      }}
    />
  )}
/>



  </div>
  <button
    onClick={() => setTitle(titleInput)}
    className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
  >
    🔍
  </button>
</div>

    {filteredDocuments.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-1 gap-4 ">
{filteredDocuments.map((doc) => {
  const metadata = doc.Metadata || {};
  const mongo = doc.MongoDB || {};
  const docInfo = doc.Doc || {};
  return (
    <div
  key={docInfo.doc_id}
  className="relative bg-white shadow-lg rounded-xl p-4 w-full max-w-4xl mx-auto border dark:bg-gray-800 dark:border-gray-700 mb-4"
>
  {/* Top-right action buttons */}
  <div className="absolute top-2 right-2 flex gap-2 z-10">
    <button
      className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-1 sm:p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8"
      onClick={() => {
        setSelectedDocument(doc);
        setShowEditDetailsModal(true);
      }}
    >
      <Pencil className="w-3 sm:w-4 h-3 sm:h-4" />
    </button>

    <button
      onClick={() => handleDelete(doc)}
      className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-1 sm:p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8"
    >
      <Trash2 className="w-3 sm:w-4 h-3 sm:h-4" />
    </button>

    {/* Uploaded doc download */}
    <div className="relative group">
      <button
        onClick={() => handleDownloadPDF(doc)}
        className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
      >
        <Download className="w-3 sm:w-4 h-3 sm:h-4" />
      </button>
      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
        Uploaded doc
      </span>
    </div>

    {/* Original doc download */}
    <div className="relative group">
      <button
        onClick={() => orignalPDF(doc)}
        className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
      >
        <Download className="w-3 sm:w-4 h-3 sm:h-4" />
      </button>
      <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
        Original doc
      </span>
    </div>
  </div>

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
      className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
    >
     {t("viewMore")}
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
      </main>
      <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md order-1 md:order-none">
    <h3 className="text-lg font-semibold mb-4">Key Entity Filters</h3>
    
    <div className="mb-4">
  <label className="block font-medium mb-1">{t("classification")}</label>
  <select
    value={classification}
    onChange={(e) => setClassification(e.target.value)}
    className="w-full border rounded px-2 py-1"
  >
    <option value="">{t("all")}</option>
    <option value="Civil Case">{t("civilCase")}</option>
    <option value="Criminal Case">{t("criminalCase")}</option>
    <option value="Criminal Case">Constiutional</option>
  </select>
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">{t("caseNo")}</label>
   <Autocomplete
  freeSolo
  options={[
    ...new Set(
      documents
        .map(doc => doc.Key_Entities?.Case_no?.trim())
        .filter(Boolean)
    )
  ]}
  value={caseno}
  onInputChange={(event, newValue) => setCaseno(newValue)}
  size="small" // 👈 shrinks outer autocomplete
  slotProps={{
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    },
    paper: {
      sx: {
        fontSize: '12px',     // 👈 smaller font for dropdown items
        maxHeight: '150px',   // 👈 optional: smaller dropdown height
        paddingY: '4px',
      },
    },
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder={t("enterCaseNo")}
      variant="outlined"
      className="w-full"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '12px',
          padding: '2px',
          '@media (min-width: 640px)': {
            fontSize: '13px',
            padding: '4px',
          },
        },
        '& .MuiInputBase-input': {
          padding: '6px 8px',
        },
      }}
    />
  )}
/>
</div>


<div className="mb-4">
  <label className="block font-medium mb-1">{t("courtNo")}</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Key_Entities?.Court_no?.trim())
          .filter(Boolean)
      )
    ]}
    value={courtno}
    onInputChange={(event, newValue) => setCourtno(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder={t("enterCourtNo")}
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>
{/* Court Name */}
<div className="mb-4">
  <label className="block font-medium mb-1">{t("courtName")}</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Key_Entities?.Court_name?.trim())
          .filter(Boolean)
      )
    ]}
    value={courtName}
    onInputChange={(event, newValue) => setCourtName(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder={t("enterCourtName")}
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>

    {/* Add more filters based on Metadata, Key_Entities etc. */}


  {/* Judgement Date Range */}
<div className="mb-4">
  <label className="block font-medium mb-1">{t("judgementDateFrom")}</label>
  <input
    type="date"
    value={judgementDateFrom}
    onChange={e => setJudgementDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

{/* Filing Date To */}
<div className="mb-4">
  <label className="block font-medium mb-1">{t("judgementDateTo")}</label>
  <input
    type="date"
    value={judgementDateTo}
    onChange={e => setJudgementDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>


<div className="mb-4">
  <label className="block font-medium mb-1">Petitioner</label>
 <Autocomplete
  freeSolo
  options={[
    ...new Set(
      documents
        .map(doc => doc.Key_Entities?.Petitioner?.trim())
        .filter(Boolean)
    )
  ]}
  value={petitioner}
  onInputChange={(event, newValue) => setPetitioner(newValue)}
  size="small" // 👈 shrinks outer autocomplete
  slotProps={{
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    },
    paper: {
      sx: {
        fontSize: '12px',     // 👈 smaller font for dropdown items
        maxHeight: '150px',   // 👈 optional: smaller dropdown height
        paddingY: '4px',
      },
    },
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Enter Petitioner"
      variant="outlined"
      className="w-full"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '12px',
          padding: '2px',
          '@media (min-width: 640px)': {
            fontSize: '13px',
            padding: '4px',
          },
        },
        '& .MuiInputBase-input': {
          padding: '6px 8px',
        },
      }}
    />
  )}
/>

</div>


<div className="mb-4">
  <label className="block font-medium mb-1">Respondent</label>
   <Autocomplete
  freeSolo
  options={[
    ...new Set(
      documents
        .map(doc => doc.Key_Entities?.Respondent?.trim())
        .filter(Boolean)
    )
  ]}
  value={respondent}
  onInputChange={(event, newValue) => setRespondent(newValue)}
  size="small" // 👈 shrinks outer autocomplete
  slotProps={{
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    },
    paper: {
      sx: {
        fontSize: '12px',     // 👈 smaller font for dropdown items
        maxHeight: '150px',   // 👈 optional: smaller dropdown height
        paddingY: '4px',
      },
    },
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder="Respondent"
      variant="outlined"
      className="w-full"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '12px',
          padding: '2px',
          '@media (min-width: 640px)': {
            fontSize: '13px',
            padding: '4px',
          },
        },
        '& .MuiInputBase-input': {
          padding: '6px 8px',
        },
      }}
    />
  )}
/>
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">{t("advOfPetitioner")}</label>
 <Autocomplete
  freeSolo
  options={[
    ...new Set(
      documents
        .map(doc => doc.Key_Entities?.Adv_of_petitioner?.trim())
        .filter(Boolean)
    )
  ]}
  value={advOfPetitioner}
  onInputChange={(event, newValue) => setAdvOfPetitioner(newValue)}
  size="small" // 👈 shrinks outer autocomplete
  slotProps={{
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    },
    paper: {
      sx: {
        fontSize: '12px',     // 👈 smaller font for dropdown items
        maxHeight: '150px',   // 👈 optional: smaller dropdown height
        paddingY: '4px',
      },
    },
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder={t("enterAdv")}
      variant="outlined"
      className="w-full"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '12px',
          padding: '2px',
          '@media (min-width: 640px)': {
            fontSize: '13px',
            padding: '4px',
          },
        },
        '& .MuiInputBase-input': {
          padding: '6px 8px',
        },
      }}
    />
  )}
/>

</div>

<div className="mb-4">
  <label className="block font-medium mb-1">{t("advOfRespondent")}</label>
   <Autocomplete
  freeSolo
  options={[
    ...new Set(
      documents
        .map(doc => doc.Key_Entities?.Adv_of_respondent?.trim())
        .filter(Boolean)
    )
  ]}
  value={advOfRespondent}
  onInputChange={(event, newValue) => setAdvOfRespondent(newValue)}
  size="small" // 👈 shrinks outer autocomplete
  slotProps={{
    popper: {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 4],
          },
        },
      ],
    },
    paper: {
      sx: {
        fontSize: '12px',     // 👈 smaller font for dropdown items
        maxHeight: '150px',   // 👈 optional: smaller dropdown height
        paddingY: '4px',
      },
    },
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      placeholder={t("enterAdv")}
      variant="outlined"
      className="w-full"
      size="small"
      sx={{
        '& .MuiOutlinedInput-root': {
          fontSize: '12px',
          padding: '2px',
          '@media (min-width: 640px)': {
            fontSize: '13px',
            padding: '4px',
          },
        },
        '& .MuiInputBase-input': {
          padding: '6px 8px',
        },
      }}
    />
  )}
/>
</div>

{/* Bench */}
<div className="mb-4">
  <label className="block font-medium mb-1">{t("bench")}</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Key_Entities?.Bench?.trim())
          .filter(Boolean)
      )
    ]}
    value={bench}
    onInputChange={(event, newValue) => setBench(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder={t("enterBench")}
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>

{/* Case Status */}
<div className="mb-4">
  <label className="block font-medium mb-1">{t("caseStatus")}</label>
  <select
    value={caseStatus}
    onChange={e => setCaseStatus(e.target.value)}
    className="w-full border rounded px-2 py-1"
  >
    <option value="">{t("caseStatusAll")}</option>
    <option value="open">{t("caseStatusOpen")}</option>
    <option value="closed">{t("caseStatusClosed")}</option>
    <option value="pending">{t("caseStatusPending")}</option>
  </select>
</div>

{/* Filing Date From */}
<div className="mb-4">
  <label className="block font-medium mb-1">{t("filingDateFrom")}</label>
  <input
    type="date"
    value={filingDateFrom}
    onChange={e => setFilingDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

{/* Filing Date To */}
<div className="mb-4">
  <label className="block font-medium mb-1">{t("filingDateTo")}</label>
  <input
    type="date"
    value={filingDateTo}
    onChange={e => setFilingDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Previous Case Citation</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Key_Entities?.Previous_case_citation?.trim())
          .filter(Boolean)
      )
    ]}
    value={prevcasecitation}
    onInputChange={(event, newValue) => setPrevcasecitation(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Enter Previous Case Citation"
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Penalty Details</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Key_Entities?.Penalty_detail?.trim())
          .filter(Boolean)
      )
    ]}
    value={penaltydetail}
    onInputChange={(event, newValue) => setPenaltydetail(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Enter Penality Details"
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Head Note</label>
  <Autocomplete
    freeSolo
    options={[
      ...new Set(
        documents
          .map(doc => doc.Key_Entities?.Head_note?.trim())
          .filter(Boolean)
      )
    ]}
    value={headnote}
    onInputChange={(event, newValue) => setHeadnote(newValue)}
    size="small"
    slotProps={{
      popper: {
        modifiers: [{ name: 'offset', options: { offset: [0, 4] } }],
      },
      paper: {
        sx: {
          fontSize: '12px',
          maxHeight: '150px',
          paddingY: '4px',
        },
      },
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        placeholder="Enter Head Note"
        variant="outlined"
        className="w-full"
        size="small"
        sx={{
          '& .MuiOutlinedInput-root': {
            fontSize: '12px',
            padding: '2px',
            '@media (min-width: 640px)': {
              fontSize: '13px',
              padding: '4px',
            },
          },
          '& .MuiInputBase-input': {
            padding: '6px 8px',
          },
        }}
      />
    )}
  />
</div>
{/* 🔹 Normal Filters Section */}
<div className="mt-6 border-t pt-4">
  <h4 className="text-md font-semibold mb-3">Normal Filters</h4>

  <div className="mb-4">
    <label className="block font-medium mb-1">{t("uploadDateFrom")}</label>
    <input
      type="date"
      value={uploadDateFrom}
      onChange={(e) => setUploadDateFrom(e.target.value)}
      className="w-full border rounded px-2 py-1"
    />
  </div>

  <div className="mb-4">
    <label className="block font-medium mb-1">{t("uploadDateTo")}</label>
    <input
      type="date"
      value={uploadDateTo}
      onChange={(e) => setUploadDateTo(e.target.value)}
      className="w-full border rounded px-2 py-1"
    />
  </div>

  <div className="mb-4">
    <label className="block font-medium mb-1">{t("sortBy")}</label>
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="w-full border rounded px-2 py-1"
    >
      <option value="">{t("selectSortOrder")}</option>
      <option value="A-Z">{t("sortAZ")}</option>
      <option value="Z-A">{t("sortZA")}</option>
    </select>
  </div>
</div>


  </aside>

  </div>

  {showEditDetailsModal && renderEditDetailsModal()}



    </>
  );
}

export default UploadedDocument;
