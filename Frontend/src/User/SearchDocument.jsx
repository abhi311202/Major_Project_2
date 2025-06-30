import React, { useMemo, useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Trash2, Pencil, Download } from "lucide-react";
const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable
import { useTranslation } from "react-i18next";
const SearchDocument = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [sortBy, setSortBy] = useState('name-asc');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditDetailsModal, setShowEditDetailsModal] = useState(false);
  // In the component's state (add useState for each new filter):
const [advOfPetitioner, setAdvOfPetitioner] = useState('');

const [advOfRespondent, setAdvOfRespondent] = useState('');
const [bench, setBench] = useState('');
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
const [classification, setClassification] = useState('');
const [courtName, setCourtName] = useState('');
const [judgementAuthor, setJudgementAuthor] = useState('');
const [caseno, setCaseno]=useState('');
const [courtno, setCourtno]=useState('');
const [title, setTitle]=useState('');
const [titleInput, setTitleInput] = useState('');
const [sortOrder, setSortOrder] = React.useState('asc'); // or 'desc'

const { t, i18n } = useTranslation();
  
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};



  const sortedDocuments = useMemo(() => {
    const sorted = [...filteredDocuments];
    switch (sortBy) {
      case 'date-asc':
        return sorted.sort((a, b) => new Date(a.MongoDB?.created_at || a.Doc?.created_at) - new Date(b.MongoDB?.created_at || b.Doc?.created_at));
      case 'date-desc':
        return sorted.sort((a, b) => new Date(b.MongoDB?.created_at || b.Doc?.created_at) - new Date(a.MongoDB?.created_at || a.Doc?.created_at));
      case 'name-desc':
        return sorted.sort((a, b) => (b.MongoDB?.Doc_Title || '').localeCompare(a.MongoDB?.Doc_Title || ''));
      case 'name-asc':
      default:
        return sorted.sort((a, b) => (a.MongoDB?.Doc_Title || '').localeCompare(b.MongoDB?.Doc_Title || ''));
    }
  }, [filteredDocuments, sortBy]);

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

const handleViewMore = (doc) => {
  console.log("Clicked doc:", doc);
  const docId = doc?.Doc?.doc_id;
  if (!docId) {
    alert("Document ID not found!");
    return;
  }

  const newTab = window.open(`/document-details/${docId}`, "_blank");
  newTab?.focus();
};
const [profileData, setProfileData] = useState({});
const [superAdminStatus, setSuperAdminStatus] = useState("not_requested");

const storedObjectString = localStorage.getItem("Users");

const myObject = JSON.parse(storedObjectString);
console.log(myObject);
useEffect(() => {
  const fetchProfileData = async () => {
    try {
      const storedObjectString = localStorage.getItem("Users");
      const myObject = JSON.parse(storedObjectString);

      if (!myObject?.id) return console.error("User ID not found in localStorage");

      const payload = { id: myObject.id };
      const res = await axios.post(`${baseURL}/User/get-profile-data`, payload);

      console.log("✅ Profile Data Response from Backend222:", res.data);

      // ✅ Access only the 'data' inside res.data
      const profile = res.data.data;

      setProfileData({
        userId: profile.id,
        profile: profile.profile_picture_url,
        name: profile.name,
        username: profile.username,
        email: profile.email,
        phone: profile.phone,
        dob: profile.dob,
        gender: profile.gender,
        aadhaar: profile.aadhar,
        profession: profile.profession,
        organisation: profile.organization,
        created_at: profile.created_at,
        validity_start_date: profile.validity_start_date,
        validity_end_date: profile.validity_end_date,
        user_type: profile.user_type,
        order_id: profile.order_id,

      });

    } catch (error) {
      console.error("❌ Error fetching profile data:", error);
    }
  };

  fetchProfileData();
}, []);

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

const filteredDocs = documents.filter((doc) => {
  const advPetitionerMatch =
    advOfPetitioner === '' ||
    doc.Key_Entities?.Adv_of_petitioner?.toLowerCase().includes(advOfPetitioner.trim().toLowerCase());

  const advRespondentMatch =
    advOfRespondent === '' ||
    doc.Key_Entities?.Adv_of_respondent?.toLowerCase().includes(advOfRespondent.trim().toLowerCase());

  const benchMatch =
    bench === '' ||
    doc.Key_Entities?.Bench?.toLowerCase().includes(bench.trim().toLowerCase());

  const courtNameMatch =
    courtName === '' ||
    doc.Key_Entities?.Court_name?.toLowerCase().includes(courtName.trim().toLowerCase());

  const judgementAuthorMatch =
    judgementAuthor === '' ||
    doc.Metadata?.Judgement_author?.toLowerCase().includes(judgementAuthor.trim().toLowerCase());

  const judgementTypeMatch =
    judgementType === '' ||
    doc.Metadata?.Judgement_type?.toLowerCase().includes(judgementType.trim().toLowerCase());

  const languageOfJudgementMatch =
    languageOfJudgement === '' ||
    doc.Metadata?.Language_of_Judgement?.toLowerCase().includes(languageOfJudgement.trim().toLowerCase());
  const courtnoMatch =
    courtno === '' ||
    doc.Key_Entities?.Court_no?.toLowerCase().includes(courtno.trim().toLowerCase());

  const casenoMatch =
    caseno === '' ||
    doc.Key_Entities?.Case_no?.toLowerCase().includes(caseno.trim().toLowerCase());

  const titleMatch =
    caseno === '' ||
    doc.MongoDB?.Doc_Title?.toLowerCase().includes(title.trim().toLowerCase());

    

    

  return (
    advPetitionerMatch &&
    advRespondentMatch &&
    benchMatch &&
    courtNameMatch &&
    judgementAuthorMatch &&
    judgementTypeMatch &&
    courtnoMatch &&
    casenoMatch &&
    title &&
    languageOfJudgementMatch
  );
});




  if (loading) return <div className="p-6 text-center">Loading documents...</div>;

  if (!documents.length) return <div className="p-6 text-center">No documents found.</div>;

  return (
    <>
      
    

    <div className="px-6 pr-6 flex gap-8">
      

  {/* Left sidebar for filters */}
  <aside className="w-64 sticky top-20 h-fit bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">{t("filters")}</h3>
    
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
  </select>
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

    {/* Judgement Author filter */}
 {/* Judgement Author */}
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

{/* Judgement Type */}
{/* Judgement Type */}
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

{/* Language of Judgement */}
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

  </aside>

  

  {/* Right side: Cards */}
  <main className="flex-1 flex flex-col gap-6 pr-6 mt-4">
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


    {sortedDocuments.map((docItem, index) => {
      const { MongoDB, Doc, Key_Entities, Metadata } = docItem;
      return (
<div key={index} className="bg-white rounded-2xl shadow-md p-5 border hover:shadow-lg transition relative">
  {/* Top section with Title and PDF link */}
  <div className="flex items-start justify-between mb-4">
  <div>
    <h2 className="text-xl font-semibold">{MongoDB?.Doc_Title || t("untitledDocument")}</h2>

    </div>
    <div className="flex gap-2">
     

      {/* Uploaded doc download */}
      <div className="relative group">
        <button
          onClick={() => handleDownloadPDF(docItem)}
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
  <a
    href={Doc?.S3_url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-300 dark:bg-gray-800 text-gray-700 dark:text-white p-2 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700 transition flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8"
  >
    <Download className="w-3 sm:w-4 h-3 sm:h-4" />
  </a>
  <span className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">
    {t("viewPDF")}
  </span>
</div>

    </div>
  </div>

  {/* Details */}
  <p className="text-sm text-gray-500 mb-1"><strong>{t("classification")}:</strong> {MongoDB?.Classification || 'N/A'}</p>
  <p className="text-sm text-gray-500 mb-1"><strong>{t("caseNo")}:</strong> {Key_Entities?.Case_no || 'N/A'}</p>
  <p className="text-sm text-gray-500 mb-1"><strong>{t("court")}:</strong> {Key_Entities?.Court_name || 'N/A'}</p>
  <p className="text-sm text-gray-500 mb-1"><strong>{t("judgementDate")}:</strong> {Key_Entities?.Judgement_date || 'N/A'}</p>
  <p className="text-sm text-gray-500 mb-4"><strong>{t("judgementAuthor")}:</strong> {Metadata?.Judgement_author || 'N/A'}</p>

  {/* Bottom-right View More button */}
  <div className="flex justify-start">
    <button
      onClick={() => handleViewMore(docItem)}
      className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
    >
     {t("viewMore")}
    </button>
  </div>
</div>


      );
    })}
  </main>

   
  {profileData.user_type === "super user" ? (
 <aside className="w-64 sticky top-20 h-fit bg-white p-4 rounded-lg shadow-md">
 <h3 className="text-lg font-semibold mb-4">Advance Filters</h3>
 


 


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

{/* Bench */}
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

{/* Case Status */}



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
<label className="block font-medium mb-1">{t("uploadDateFrom")}</label>
<input
 type="date"
 value={uploadDateFrom}
 onChange={e => setUploadDateFrom(e.target.value)}
 className="w-full border rounded px-2 py-1"
/>
</div>

<div className="mb-4">
<label className="block font-medium mb-1">{t("uploadDateTo")}</label>
<input
 type="date"
 value={uploadDateTo}
 onChange={e => setUploadDateTo(e.target.value)}
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
{/* Sort By */}
<div className="mb-4">
<label className="block font-medium mb-1">{t("sortBy")}</label>
<select
 value={sortOrder}
 onChange={(e) => setSortOrder(e.target.value)}
 className="w-full border rounded px-2 py-1"
>
 <option value="">{t("selectSortOrder")}r</option>
 <option value="A-Z">{t("sortAZ")}</option>
 <option value="Z-A">{t("sortZA")}</option>
</select>
</div>




</aside>
) : (
  <div className="w-64 sticky top-20 h-fit bg-white p-5 rounded-xl shadow-lg text-center flex flex-col items-center justify-center gap-4 dark:bg-gray-900 dark:text-white transform transition-transform duration-500 hover:scale-105 animate-fade-in">
 
  <h3 className="text-lg font-bold">Take Super User Premuim and take Features</h3>
  <p className="text-sm text-gray-600 dark:text-gray-300 px-2">
    Get access to advanced filters and premium document tools.
  </p>
  <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md font-semibold shadow transition">
    Buy Now
  </button>
</div>

)}

</div>

    </>
  );
};

export default SearchDocument;
