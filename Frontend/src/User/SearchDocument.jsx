import React, { useMemo, useState, useEffect } from 'react';
import Navbar from "@/components/Navbar";
import axios from "axios";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
const baseURL = import.meta.env.VITE_API_BASE_URL; // ✅ Vite env variable
const SearchDocument = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [sortBy, setSortBy] = useState('name-asc');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Navbar />
    

    <div className="px-6 pr-6 flex gap-8">
      

  {/* Left sidebar for filters */}
  <aside className="w-64 sticky top-20 h-fit bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Filters</h3>
    
    <div className="mb-4">
  <label className="block font-medium mb-1">Classification</label>
  <select
    value={classification}
    onChange={(e) => setClassification(e.target.value)}
    className="w-full border rounded px-2 py-1"
  >
    <option value="">All</option>
    <option value="Civil Case">Civil Case</option>
    <option value="Criminal Case">Criminal Case</option>
  </select>
</div>

    
{/* Court Name */}
<div className="mb-4">
  <label className="block font-medium mb-1">Court Name</label>
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
        placeholder="Enter court name"
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
  <label className="block font-medium mb-1">Judgement Author</label>
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
        placeholder="Enter author name"
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
  <label className="block font-medium mb-1">Judgement Date From</label>
  <input
    type="date"
    value={judgementDateFrom}
    onChange={e => setJudgementDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

{/* Filing Date To */}
<div className="mb-4">
  <label className="block font-medium mb-1">Judgement Date To</label>
  <input
    type="date"
    value={judgementDateTo}
    onChange={e => setJudgementDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Adv. of Petitioner</label>
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
      placeholder="Enter adv."
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
  <label className="block font-medium mb-1">Adv. of Respondent</label>
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
      placeholder="Enter adv."
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
  <label className="block font-medium mb-1">Bench</label>
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
        placeholder="Enter bench"
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
  <label className="block font-medium mb-1">Case Status</label>
  <select
    value={caseStatus}
    onChange={e => setCaseStatus(e.target.value)}
    className="w-full border rounded px-2 py-1"
  >
    <option value="">All</option>
    <option value="open">Open</option>
    <option value="closed">Closed</option>
    <option value="pending">Pending</option>
  </select>
</div>

{/* Filing Date From */}
<div className="mb-4">
  <label className="block font-medium mb-1">Filing Date From</label>
  <input
    type="date"
    value={filingDateFrom}
    onChange={e => setFilingDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

{/* Filing Date To */}
<div className="mb-4">
  <label className="block font-medium mb-1">Filing Date To</label>
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
  <label className="block font-medium mb-1">Judgement Type</label>
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
        placeholder="Enter judgement type"
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
  <label className="block font-medium mb-1">Language of Judgement</label>
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
        placeholder="Enter language"
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
  Search Document Using Advance Filters
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
      placeholder="Enter document title"
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
  <div className="flex items-start justify-between mb-2">
    <h2 className="text-xl font-semibold">{MongoDB?.Doc_Title || 'Untitled Document'}</h2>
    {Doc?.S3_url && (
      <a
        href={Doc.S3_url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 font-medium hover:underline"
      >
        View PDF
      </a>
    )}
  </div>

  {/* Details */}
  <p className="text-sm text-gray-500 mb-1"><strong>Classification:</strong> {MongoDB?.Classification || 'N/A'}</p>
  <p className="text-sm text-gray-500 mb-1"><strong>Case No:</strong> {Key_Entities?.Case_no || 'N/A'}</p>
  <p className="text-sm text-gray-500 mb-1"><strong>Court:</strong> {Key_Entities?.Court_name || 'N/A'}</p>
  <p className="text-sm text-gray-500 mb-1"><strong>Judgement Date:</strong> {Key_Entities?.Judgement_date || 'N/A'}</p>
  <p className="text-sm text-gray-500 mb-4"><strong>Judgement Author:</strong> {Metadata?.Judgement_author || 'N/A'}</p>

  {/* Bottom-right View More button */}
  <div className="flex justify-start">
    <button
      onClick={() => handleViewMore(docItem)}
      className="bg-blue-600 text-white text-sm px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
    >
      View More
    </button>
  </div>
</div>


      );
    })}
  </main>

    <aside className="w-64 sticky top-20 h-fit bg-white p-4 rounded-lg shadow-md">
    <h3 className="text-lg font-semibold mb-4">Filters</h3>
    
 

    


  {/* Judgement Date Range */}
<div className="mb-4">
  <label className="block font-medium mb-1">Judgement Date From</label>
  <input
    type="date"
    value={judgementDateFrom}
    onChange={e => setJudgementDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

{/* Filing Date To */}
<div className="mb-4">
  <label className="block font-medium mb-1">Judgement Date To</label>
  <input
    type="date"
    value={judgementDateTo}
    onChange={e => setJudgementDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>







<div className="mb-4">
  <label className="block font-medium mb-1">Case No.</label>
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
      placeholder="Enter Case No."
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
  <label className="block font-medium mb-1">Court No.</label>
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
        placeholder="Enter Court NO."
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
  <label className="block font-medium mb-1">Order of Pronouncement From</label>
  <input
    type="date"
    value={orderDateFrom}
    onChange={e => setOrderDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>


<div className="mb-4">
  <label className="block font-medium mb-1">Order of Pronouncement To</label>
   <input
    type="date"
    value={orderDateTo}
    onChange={e => setOrderDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Uploaded date from</label>
   <input
    type="date"
    value={uploadDateFrom}
    onChange={e => setUploadDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Uploaded date to</label>
  <input
    type="date"
    value={uploadDateTo}
    onChange={e => setUploadDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Hearing date from</label>
   <input
    type="date"
    value={hearingDateFrom}
    onChange={e => setHearingDateFrom(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>

<div className="mb-4">
  <label className="block font-medium mb-1">Hearing date to</label>
  <input
    type="date"
    value={hearingDateTo}
    onChange={e => setHearingDateTo(e.target.value)}
    className="w-full border rounded px-2 py-1"
  />
</div>
{/* Sort By */}
<div className="mb-4">
  <label className="block font-medium mb-1">Sort By</label>
  <select
    value={sortOrder}
    onChange={(e) => setSortOrder(e.target.value)}
    className="w-full border rounded px-2 py-1"
  >
    <option value="">Select Order</option>
    <option value="A-Z">Title (A - Z)</option>
    <option value="Z-A">Title (Z - A)</option>
  </select>
</div>




  </aside>

</div>

    </>
  );
};

export default SearchDocument;
