import React, { useState, useEffect } from "react";
import axios from "axios";
import { getDocument , GlobalWorkerOptions } from 'pdfjs-dist';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();

const AdvanceRag = () => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [vectorCount, setVectorCount] = useState(0); // Dummy vector count
  const [chatOpen, setChatOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [ingestOutput, setIngestOutput] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const [Error, setError] = useState(null);
  const [waitingForResponse, setWaitingForResponse] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(""); // State to store delete message
  const [uploadError, setUploadError] = useState(""); // State to show error when vector upload count is 0

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
  useEffect(() => {
    // Simulating fetching vector count from backend
    setTimeout(() => {
      setVectorCount(1); // Change this to 0 to test "Doc not uploaded"
    }, 1000);
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };
   const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  function cleanString(inputString) {
    return inputString.replace(/\s+/g, " ").trim();
  }

  const handleIngestDocument = async () => {
    if (!file) {
        // setSummarizationError("No file selected.");
      // setLoading(false);
      // error handelling ----> do it Sanskar...
      setError("No file selected.");
      setTimeout(() => {
        setError(""); // Clear the error after 5 seconds
      }, 5000);
      return;
    }
    setLoading(true);
    setError(null); // Reset error state before starting
    setUploadError(""); // Reset error before starting
    setIngestOutput("");
    let pages = [];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async function () {
        try {
            const pdfData = new Uint8Array(reader.result);
            const pdf = await getDocument({
                data: pdfData,
                standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
            }).promise;

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const textContent = await page.getTextContent();
                const text = textContent.items.map((item) => item.str).join(" ");

                pages.push({
                    page_number: i,
                    page_char_count: text.length,
                    page_token_count: text.length / 4,
                    page_word_count: text.split(" ").length,
                    page_sentence_count_raw: text.split(".").length,
                    text: cleanString(text),
                });
            }

            const jsonData = {
                doc_id: 12345,
                doc_name: file.name,
                metadata: {},
                pages: pages,
          };
          
          // console.log(jsonData);

          await axios.post("http://52.66.174.249:9000/ingest", jsonData)
            .then((res) => {
              // console.log(JSON.stringify(ingestOutput));
              // console.log(ingestOutput);
              // console.log(JSON.stringify(ingestOutput.vector_upload_count));
              if (res.status === 200) {
                if (res.data) {
                  setIngestOutput(res.data);
                  console.log(res.data);
                  // console.log(ingestOutput.vector_upload_count);
                  console.log(res.data.vector_upload_count);
                  // ingestOutput.vector_upload_count == 0
                  if (res.data.vector_upload_count === 0) {
                    setUploadError("Document not uploaded in vector store.");
                    setChatOpen(false); // Prevent chatbox from opening
                    setTimeout(() => {
                      setUploadError(null);
                    }, 5000);
                  }
                  else {
                    setUploadError(null); // Clear error if upload is successful
                    setChatOpen(true);
                    localStorage.setItem("IngestDocIndex", res.data.index_name);
                  }
                }
              } else {

                console.error("Failed to ingest:", res.statusText);
                setUploadError(JSON.stringify(res.status) + ": " + JSON.stringify(res.statusText)); // Show error message in UI
              }

            })
            .catch((err) => {
              console.error(err);
             
            })
          .finally(() => {
                    setLoading(false); // Stop loading after request completes
          });

        } catch (error) {
          console.error("Error processing file:", error);
          setError("An error occurred while processing the document.");
          setLoading(false);
        }
    };

    reader.onerror = () => {
      console.error("Error reading the file.");
      setLoading(false);
    };

  };

  const handleEndChat = async () => {
  if (!ingestOutput || !ingestOutput.index_name) {
    console.error("No index name available to delete.");
    setChatOpen(false);
    setMessages([]);
    setQuery("");
    return;
  }

  const jsonData = {
    index_name: ingestOutput.index_name,
  };
    
  console.log(JSON.stringify(jsonData));
  const toastId = toast.loading("Please wait...");

  try {
    const response = await axios.post("http://52.66.174.249:9000/delete", jsonData);
    console.log("Delete Response:", response.data);

    if (response.data.deleted) {
      // alert("Index deleted successfully.");
      toast.dismiss(toastId);
      setDeleteMessage("Deleted Successfully"); // Show message
      localStorage.removeItem("IngestDocIndex");
      setTimeout(() => setDeleteMessage(""), 3000); // Hide message after 3 sec
      setChatOpen(false);
      setMessages([]);
      setQuery("");
      setFile(null);
   

      document.getElementById("fileUpload").value = "";
    } else {
      alert(`Failed to delete index: ${response.data.comments}`);
    }
  } catch (error) {
    console.error("Error deleting index:", error);
    alert("Error deleting index. Check console for details.");
  }
};

const Clearchat = () =>{
  setMessages([]);
  setQuery("");
};


  // AI generated markdown text to noemal teext
  
  // function markdownToPlainText(markdown) {
  //   return markdown
  //       // Convert headings (remove # but keep spacing)
  //       .replace(/^#{1,6}\s*/gm, '')
  //       // Convert bold and italic text
  //       .replace(/\*\*\*(.*?)\*\*\*/g, '$1') // bold + italic (***text***)
  //       .replace(/\*\*(.*?)\*\*/g, '$1') // bold (**text**)
  //       .replace(/\*(.*?)\*/g, '$1') // italic (*text*)
  //       .replace(/__(.*?)__/g, '$1') // bold (__text__)
  //       .replace(/_(.*?)_/g, '$1') // italic (_text_)
  //       // Convert inline code and code blocks
  //       .replace(/`([^`]+)`/g, '$1') // inline code (`text`)
  //       .replace(/```[\s\S]*?```/g, '') // remove fenced code blocks
  //       // Convert lists (keep list items but remove bullets)
  //       .replace(/^\s*[-*+]\s+/gm, '- ') // unordered lists
  //       .replace(/^\s*\d+\.\s+/gm, '') // ordered lists
  //       // Convert blockquotes (remove > but keep indentation)
  //       .replace(/^\s*>+\s?/gm, '')
  //       // Convert links (keep text, remove URL)
  //       .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
  //       // Remove images ![alt](url)
  //       .replace(/!\[.*?\]\(.*?\)/g, '')
  //       // Remove extra spaces and new lines
  //       .trim();
  // }

  function markdownToPlainText1(markdown) {
    return markdown
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold (**text** -> text)
        .replace(/\*(.*?)\*/g, '$1') // Remove italic (*text* -> text)
        .replace(/__([^_]+)__/g, '$1') // Remove bold (__text__ -> text)
        .replace(/_([^_]+)_/g, '$1') // Remove italic (_text_ -> text)
        .replace(/`([^`]+)`/g, '$1') // Remove inline code (`text` -> text)
        .replace(/#{1,6}\s*(.*)/g, '$1') // Remove Markdown headings (# text -> text)
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links ([text](url) -> text)
        .replace(/\!\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove images (![alt](url) -> alt)
        .replace(/[-*+]\s+(.*)/g, '$1') // Remove bullet points (- text -> text)
        .replace(/\d+\.\s+(.*)/g, '$1') // Remove numbered lists (1. text -> text)
        .replace(/>\s*(.*)/g, '$1') // Remove blockquotes (> text -> text)
        .replace(/\n{2,}/g, '\n\n'); // Ensure spacing is preserved
}

  const handleSendQuery = async () => {
    if (query.trim() === "") return;

  setMessages([...messages, { type: "user", text: query }]);
  setQuery(""); // Clear the input field immediately after adding the message
    setWaitingForResponse(true);
    

    try {
      const jsonData = { query };
      const res = await axios.post("http://52.66.174.249:9000/query", jsonData);
      if (res.data) {
        console.log(res.data);
        if (res.data.response === "Sorry! No relevant information found!") {
          // text1 = res.data.response;
          setMessages((prevMessages) => [
            ...prevMessages,
            { type: "bot", text: res.data.response },
          ]);
        }
        else {
          // text1 = res.data.response + "\n\nReferences: \n" + res.data.references;
          setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: res.data.response },
          ]);
          
          setMessages((prevMessages) => [
          ...prevMessages,
          { type: "bot", text: "Page References: " + res.data.references.join(", ") }

          ]);
        }
      }
    } catch (err) {
      console.error("Error processing query:", err);
    } finally {
      setWaitingForResponse(false);
      
    }

    
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
    <main className="flex-1 p-4 sm:p-6 order-2">
    <div className="flex-1 p-6 pb-2 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
        Document Q&A
      </h1>
  
      {/* Loading / Error / Upload Info */}
      {/* You can insert any loading or error components here */}
  
      {/* Chat Messages */}
      <div className="mb-4 p-4 bg-gray-100 dark:bg-white border rounded h-80 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded max-w-[80%] ${
              msg.type === "user"
                ? "bg-blue-500 text-white self-end ml-auto"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            <div className="text-[15px] whitespace-pre-line">{msg.text}</div>
          </div>
        ))}
        {waitingForResponse && (
          <div className="p-2 my-1 rounded bg-gray-300 text-gray-700">
            Searching...
          </div>
        )}
      </div>
    </div>
  
    {/* Chat Input Section */}
    <div
      className="p-3 border-t flex items-center gap-2 bg-white dark:bg-black"
      onDrop={(e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === "application/pdf") {
          setFile(droppedFile);
          toast.success(`File "${droppedFile.name}" selected`);
        } else {
          toast.error("Only PDF files are allowed");
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      {/* Input Box */}
      <input
        type="text"
        className="flex-1 px-3 py-2 border rounded dark:text-black"
        placeholder="Ask a question..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={waitingForResponse}
      />
  
      {/* Chat Action Buttons */}
      <button
        onClick={handleSendQuery}
        className="bg-blue-600 text-white px-3 py-2 rounded"
        disabled={waitingForResponse}
      >
        ➤
      </button>
      <button
        onClick={handleEndChat}
        className="bg-red-500 text-white px-3 py-2 rounded"
      >
        End
      </button>
      <button
        onClick={Clearchat}
        className="bg-yellow-500 text-white px-3 py-2 rounded"
      >
        Clear All
      </button>
    </div>
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
</>
  
  );
};



export default AdvanceRag;