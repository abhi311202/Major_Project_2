import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import pdfToText from "react-pdftotext";
import mammoth from "mammoth";
import { FiUpload, FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerUrl from "pdfjs-dist/legacy/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

function UploadNewDocument() {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const [selectedFileName, setSelectedFileName] = useState('');
  const [extractedJson, setExtractedJson] = useState(null);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [summary, setSummary] = useState("");
  const [Class, SetClass] = useState("");
  const [Other, setOther] = useState(null);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [summarizationError, setSummarizationError] = useState(null);
  const [classificationError, setClassificationError] = useState(null);
  const [entitymetaError, setEntitymetaError] = useState(null);
  const [classification, setClassification] = useState("");
  const [classificationReason, setClassificationReason] = useState("");
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
  const [classError, setClassError] = useState("");
  const [PdfUrl, setPdfUrl] = useState("");
  const [fileKey, setFileKey] = useState("");
  const [hashHex, setHashHex] = useState('');
  const [profileData, setProfileData] = useState({});
  const [fileName, setFileName] = useState("");
  const [pageContents, setPageContents] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isInScope, setIsInScope] = useState(null);
  const [documentContent, setDocumentContent] = useState(null);
  const [responseValue, setResponseValue] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expectedValue, setExpectedValue] = useState(null);
  const [matchMessage, setMatchMessage] = useState("");
  const [pa,setpa]= useState([]);
  const storedObjectString = localStorage.getItem("Admin");
  const myObject = JSON.parse(storedObjectString);
  
  useEffect(() => {
    setProfileData({
      username: myObject.username,
      owner_id: myObject.id,
    });
  }, []);

  useEffect(() => {
    const fetchExpectedValue = async () => {
      try {
        const response = await axios.get(`${baseURL}/SuperAdmin/get-threshhold1`);
        const expectedValue = response.data.data.threshold_value;
        localStorage.setItem("Threshold_Id", response.data.data.threshold_id);
        setExpectedValue(expectedValue);
      } catch (error) {
        console.error("Error fetching expected value:", error);
      }
    };
    fetchExpectedValue();
  }, []);

  const cleanString = (inputString) => inputString.replace(/\s+/g, " ").trim();

  const markdownToPlainText = (markdown) => {
    return markdown
      .replace(/^#{1,6}\s*/gm, "")
      .replace(/\*\*\*(.*?)\*\*\*/g, "$1")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/__(.*?)__/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/^\s*[-*+]\s+/gm, "- ")
      .replace(/^\s*\d+\.\s+/gm, "")
      .replace(/^\s*>+\s?/gm, "")
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      .replace(/!\[.*?\]\(.*?\)/g, "")
      .trim();
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const validClasses = [
    "Civil Case", "Criminal Case", "Constitutional Case",
    "Civil Case\nCriminal Case", "Criminal Case\nCivil Case",
    "Civil Case\nConstitutional Case", "Constitutional Case\nCivil Case",
    "Criminal Case\nConstitutional Case", "Constitutional Case\nCriminal Case",
    "Civil Case\nCriminal Case\nConstitutional Case",
    "Civil Case\nConstitutional Case\nCriminal Case",
    "Criminal Case\nCivil Case\nConstitutional Case",
    "Criminal Case\nConstitutional Case\nCivil Case",
    "Constitutional Case\nCivil Case\nCriminal Case",
    "Constitutional Case\nCriminal Case\nCivil Case"
  ];

  const uploadToS3 = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${baseURL}/Services/upload-pdf`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return {
        pdfUrl: response.data.pdf,
        fileKey: response.data.filekey,
        fileName: file?.name || "",
      };
    } catch (error) {
      console.error("S3 Upload Error:", error);
      toast.error("Failed to upload PDF to S3");
      return false;
    }
  };

  const cleanValue = (value) => value || "";

  const onSubmit = async (data) => {
    console.log("sdfgvsdf", data);
   toast.success("Document Uploaded Successfully");
  };

  const handleResetButton = () => {
    reset({
      title: "",
      serialnum: "",
      content: "",
      summary: "",
      Class: "",
      classificationReason: "",
      caseno: "",
      casetype: "",
      casestatus: "",
      filingdate: "",
      judgmentdate: "",
      courtname: "",
      courtno: "",
      bench: "",
      petitioner: "",
      respondent: "",
      advofpetitioner: "",
      advofrespondent: "",
      prevcasecitation: "",
      penaltydetail: "",
      headnote: "",
      judgementauthor: "",
      judgementtype: "",
      langofjudgement: "",
      dateofhearing: "",
      dateoforderpro: "",
      benchcomposition: "",
      referredacts: ""
    });
    setFile(null);
    setFilePreview("");
    setSummary("");
    setContent("");
    SetClass("");
    setClassification("");
    setClassificationReason("");
    setPageContents([]);
    setCurrentPageIndex(0);
  };

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (!selected) {
      setSelectedFileName('');
      setFile(null);
      setDocumentContent('');
      return;
    }

    setFile(selected);
    setLoading(true);
    setSelectedFileName(selected.name);

    const arrayBuffer = await selected.arrayBuffer();

    // SHA-256 hash
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHexValue = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    setHashHex(hashHexValue);

    let finalDoc = null;
    let allTexts = [];

    if (selected.type === "application/pdf") {
      try {
        const typedArray = new Uint8Array(arrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedArray).promise;

        const pages = [];

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map(item => item.str).join(" ").trim();

          const wordCount = pageText.split(/\s+/).filter(Boolean).length;
          const charCount = pageText.length;
          const sentenceCount = (pageText.match(/[.!?]+/g) || []).length;
          const tokenCount = wordCount;

          pages.push({
            page_number: i,
            page_char_count: charCount,
            page_token_count: tokenCount,
            page_word_count: wordCount,
            page_sentence_count_raw: sentenceCount,
            text: pageText
          });
        }

        setpa(pages);

        finalDoc = {
          doc_id: 12345,
          doc_name: selected.name,
          metadata: {},
          entities: {},
          repetition: 5,
          pages
        };

        setExtractedJson(finalDoc);
        allTexts = pages.map(p => p.text || "[Blank Page]");
        setPageContents(allTexts);
        setDocumentContent(allTexts.join("\n\n"));
        setContent(allTexts.join("\n\n"));
        setValue("content", allTexts.join("\n\n"));

      } catch (err) {
        console.error("PDF parsing error:", err);
        toast.error("Error parsing PDF file");
      }
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        setDocumentContent(content);
        setContent(content);
        setValue("content", content);
      };
      reader.readAsText(selected);
    }

    if (finalDoc) {
      try {
        const response = await axios.post(
          `${baseURL}/AI-Services/document-scope-validation`,
          finalDoc,
          { headers: { "Content-Type": "application/json" } }
        );

        const simulatedResponseValue = response.data?.threshold ?? 0;
        setResponseValue(simulatedResponseValue);
        setIsInScope(expectedValue !== null && simulatedResponseValue >= expectedValue);

      } catch (apiError) {
        console.error("Scope Validation API Error:", apiError);
        toast.error("Error validating document scope");
      }
    }
    setLoading(false);
  };

  const handleEntityMetadataExtraction = async () => {
    if (!extractedJson) {
      toast.warn("No document content available");
      return;
    }

    try {
      const res = await axios.post(
        `${baseURL}/AI-Services/entity-metadata-extraction`,
        extractedJson,
        { headers: { "Content-Type": "application/json" } }
      );

      const responseData = res.data.data;
      const entities = responseData.entities || {};
      const metadata = responseData.metadata || {};

      // Map entity fields
      const entityFields = {
        "CASE_NO": ["caseno", setCaseno],
        "CASE_TYPE": ["casetype", setCasetype],
        "CASE_STATUS": ["casestatus", setCasestatus],
        "FILING_DATE": ["filingdate", setFilingdate],
        "JUDGEMENT_DATE": ["judgmentdate", setJudgmentdate],
        "COURT_NO": ["courtno", setCourtno],
        "COURT_NAME": ["courtname", setCourtname],
        "BENCH": ["bench", setBench],
        "PETITIONER": ["petitioner", setPetitioner],
        "RESPONDENT": ["respondent", setRespondent],
        "ADV_OF_PETITIONER": ["advofpetitioner", setAdvofpetitioner],
        "ADV_OF_RESPONDENT": ["advofrespondent", setAdvofrespondent],
        "PREVIOUS_CASE_CITATION": ["prevcasecitation", setPrevcasecitation],
        "PENALTY_DETAIL": ["penaltydetail", setPenaltydetail],
        "HEAD_NOTE": ["headnote", setHeadnote],
      };

      for (const key in entityFields) {
        const [fieldName, setter] = entityFields[key];
        const value = entities[key] || "";
        setter(value);
        setValue(fieldName, value);
      }

      // Map metadata fields
      const metadataFields = {
        "JUDGEMENT_AUTHOR": ["judgementauthor", setJudgementauthor],
        "JUDGEMENT_TYPE": ["judgementtype", setJudgementtype],
        "LANGUAGE_OF_JUDGEMENT": ["langofjudgement", setLangofjudgement],
        "DATE_OF_HEARING": ["dateofhearing", setDateofhearing],
        "DATE_OF_ORDER_PRONOUNCEMENT": ["dateoforderpro", setDateoforderpro],
        "BENCH_COMPOSITION": ["benchcomposition", setBenchcomposition],
        "REFERRED_ACTS": ["referredacts", setReferredacts],
      };

      for (const key in metadataFields) {
        const [fieldName, setter] = metadataFields[key];
        const value = metadata[key] || "";
        setter(value);
        setValue(fieldName, value);
      }

      toast.success("Entities and metadata extracted successfully");

    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to extract entities and metadata");
    }
  };

  const handleSummarizaton = async () => {
    if (!extractedJson) {
      toast.warn("No document content available");
      return;
    }

    try {
      // console.log(`${baseURL}/AI-Services/summarization`);
      const res = await axios.post(
        `${baseURL}/AI-Services/summarization`,
        extractedJson,
        { headers: { "Content-Type": "application/json" } }
      );

      const summaryText = res.data?.data?.summarization || "";
      setSummary(summaryText);
      setValue("summary", summaryText);
      toast.success("Summary generated successfully");

    } catch (error) {
      console.error("Error fetching summary:", error);
      toast.error("Failed to generate summary");
    }
  };

  const handleClassify = async () => {
    if (!extractedJson) {
      toast.warn("No document content available");
      return;
    }

    try {
      const res = await axios.post(
      `${baseURL}/AI-Services/classification`,
        extractedJson,
        { headers: { "Content-Type": "application/json" } }
      );

      const categoryText = res.data?.data?.classification?.category?.[0] || "";
      const reasonText = res.data?.data?.classification?.reason || "";

      setClassification(categoryText);
      setClassificationReason(reasonText);
      setValue("Class", categoryText);
      setValue("ClassificationReason", reasonText);
      toast.success("Classification completed");

    } catch (error) {
      console.error("Error fetching classification:", error);
      toast.error("Failed to classify document");
    }
  };

  const handleClear_Metadata = () => {
    setJudgementauthor("");
    setJudgementtype("");
    setLangofjudgement("");
    setDateofhearing("");
    setDateoforderpro("");
    setBenchcomposition("");
    setReferredacts("");
    setValue("judgementauthor", "");
    setValue("judgementtype", "");
    setValue("langofjudgement", "");
    setValue("dateofhearing", "");
    setValue("dateoforderpro", "");
    setValue("benchcomposition", "");
    setValue("referredacts", "");
  };

  const handleClear_Classification = () => {
    setClassification("");
    setClassificationReason("");
    setValue("Class", "");
    setValue("ClassificationReason", "");
  };

  return (
    <div className="flex min-h-screen max-h-max overflow-hidden">
      <div className="flex flex-col items-center justify-start w-full p-4">
        {/* File Chooser */}
        <div className="w-full ml-[950px]">
          <label
            htmlFor="file-upload"
            className={`inline-block cursor-pointer text-white text-base font-semibold py-3 px-6 rounded-md transition-all duration-300 dark:bg-white dark:text-black
              ${isInScope ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-700'}`}
          >
            Browse File
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={isInScope}
            className="hidden"
          />
          {selectedFileName && (
            <p className="mt-2 text-sm text-gray-700 dark:text-white">{selectedFileName}</p>
          )}
        </div>

        <br />

        {/* Loading or Error Messages */}
        {loading && <p className="text-black mb-4">Loading...</p>}
        {error && (
          <div className="bg-red-500 text-white p-4 mb-4 w-full max-w-3xl rounded-md">
            Error fetching expected value
          </div>
        )}

        {/* In Scope Form */}
        {isInScope === true && (
          <div className="w-full px-0 mx-[-125px]">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Upload New Document
            </h2>

            <form method="dialog" className="space-y-6 text-black">
              {/* Title */}
              <div>
                <label className="block text-gray-600 dark:text-white font-medium mb-1">
                  Document Title:
                </label>
                <input
                  type="text"
                  className="w-full p-4 rounded-md border border-gray-300 dark:bg-black dark:border-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Enter document title"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Serial No */}
              <div>
                <label className="block text-gray-600 dark:text-white font-medium mb-1">
                  Serial No:
                </label>
                <input
                  type="text"
                  className="w-full p-4 rounded-md border border-gray-300 dark:bg-black dark:border-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                  placeholder="Enter serial number"
                  {...register("serialnum", { required: true })}
                />
                {errors.serialnum && (
                  <span className="text-sm text-red-500">This field is required</span>
                )}
              </div>

              {/* Show Result Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  className={`w-full sm:w-auto bg-black text-white font-medium px-6 py-2 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white ${
                    file ? "hover:bg-gray-700" : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => {
                    handleSummarizaton();
                    handleClassify();
                    handleEntityMetadataExtraction();
                  }}
                  disabled={!file}
                >
                  Show Result
                </button>
              </div>

              {/* Key Entities Section */}
              <div className="border rounded-lg p-6 shadow-md bg-white dark:bg-gray-900">
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Key Entities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Case No:", value: caseno, setter: setCaseno, name: "caseno" },
                    { label: "Case Type:", value: casetype, setter: setCasetype, name: "casetype" },
                    { label: "Case Status:", value: casestatus, setter: setCasestatus, name: "casestatus" },
                    { label: "Filing Date:", value: filingdate, setter: setFilingdate, name: "filingdate" },
                    { label: "Judgment Date:", value: judgmentdate, setter: setJudgmentdate, name: "judgmentdate" },
                    { label: "Court No:", value: courtno, setter: setCourtno, name: "courtno" },
                    { label: "Court Name:", value: courtname, setter: setCourtname, name: "courtname" },
                    { label: "Bench:", value: bench, setter: setBench, name: "bench" },
                    { label: "Petitioner:", value: petitioner, setter: setPetitioner, name: "petitioner" },
                    { label: "Respondent:", value: respondent, setter: setRespondent, name: "respondent" },
                    { label: "Adv. of Petitioner:", value: advofpetitioner, setter: setAdvofpetitioner, name: "advofpetitioner" },
                    { label: "Adv. of Respondent:", value: advofrespondent, setter: setAdvofrespondent, name: "advofrespondent" },
                    { label: "Previous Case Citation:", value: prevcasecitation, setter: setPrevcasecitation, name: "prevcasecitation" },
                    { label: "Penalty Detail:", value: penaltydetail, setter: setPenaltydetail, name: "penaltydetail" },
                    { label: "Head Note:", value: headnote, setter: setHeadnote, name: "headnote" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
                        {field.label}
                      </label>
                      <textarea
                        rows="2"
                        value={field.value}
                        className="w-full border p-4 rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        onChange={(e) => {
                          field.setter(e.target.value);
                          setValue(field.name, e.target.value);
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* Meta Data Section */}
                <h2 className="text-xl font-bold mb-4 mt-6 text-gray-800 dark:text-white">Meta Data</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Judgement Author:", value: judgementauthor, setter: setJudgementauthor, name: "judgementauthor" },
                    { label: "Judgement Type:", value: judgementtype, setter: setJudgementtype, name: "judgementtype" },
                    { label: "Language of Judgement:", value: langofjudgement, setter: setLangofjudgement, name: "langofjudgement" },
                    { label: "Date of Hearing:", value: dateofhearing, setter: setDateofhearing, name: "dateofhearing" },
                    { label: "Date of Order Pronouncement:", value: dateoforderpro, setter: setDateoforderpro, name: "dateoforderpro" },
                    { label: "Bench Composition:", value: benchcomposition, setter: setBenchcomposition, name: "benchcomposition" },
                    { label: "Referred acts:", value: referredacts, setter: setReferredacts, name: "referredacts" },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
                        {field.label}
                      </label>
                      <textarea
                        rows="2"
                        value={field.value}
                        className="w-full border p-4 rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                        onChange={(e) => {
                          field.setter(e.target.value);
                          setValue(field.name, e.target.value);
                        }}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={handleEntityMetadataExtraction}
                    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Show Result 
                  </button>
                  <button
                    onClick={handleClear_Metadata}
                    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Classification Section */}
              <div className="border rounded-lg p-6 shadow-md bg-white dark:bg-gray-900">
                <label className="block text-gray-600 font-medium dark:text-white">
                  Classification:
                  <div className="relative w-full">
                    <textarea
                      rows="3"
                      value={classification}
                      onChange={(e) => {
                        setClassification(e.target.value);
                        setValue("Class", e.target.value);
                      }}
                      className={`w-full p-4 border rounded-lg resize-none text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                        classError || classificationError ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {loading1 && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80">
                        <span className="text-3xl font-bold text-gray-600 dark:text-gray-300 animate-pulse">
                          Processing...
                        </span>
                      </div>
                    )}
                    {classError && !loading1 && (
                      <span className="text-red-500 text-sm font-medium mt-1 block">
                        {classError}
                      </span>
                    )}
                  </div>
                </label>

                {/* Classification Reason */}
                <div className="mt-4">
                  <label className="block text-gray-600 dark:text-white font-medium mb-1">
                    Classification Reason:
                  </label>
                  <textarea
                    rows="8"
                    value={classificationReason}
                    onChange={(e) => {
                      setClassificationReason(e.target.value);
                      setValue("ClassificationReason", e.target.value);
                    }}
                    className="w-full p-3 border rounded-md resize-none dark:bg-black dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={handleClassify}
                    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Show Result
                  </button>
                  <button
                    onClick={handleClear_Classification}
                    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Summary Section */}
              <div className="border rounded-lg p-6 shadow-md bg-white dark:bg-gray-900">
                <div>
                  <label className="block text-gray-600 dark:text-white font-medium mb-1">
                    Summary:
                  </label>
                  <textarea
                    rows="10"
                    value={summary}
                    onChange={(e) => {
                      setSummary(e.target.value);
                      setValue("summary", e.target.value);
                    }}
                    className="w-full p-3 border rounded-md resize-none dark:bg-black dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-4">
                  <button
                    onClick={handleSummarizaton}
                    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Show Result
                  </button>
                  <button
                    onClick={() => {
                      setSummary("");
                      setValue("summary", "");
                    }}
                    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Content Section */}
              <div>
                <label className="block text-gray-600 dark:text-white font-medium mb-1">
                  Document Content {pageContents.length > 0 && `(Page ${currentPageIndex + 1} of ${pageContents.length})`}
                </label>

                {pageContents.length > 0 ? (
                  <>
                    <div className="w-full h-64 p-4 border rounded-md overflow-y-auto dark:bg-gray-900 dark:text-white whitespace-pre-wrap">
                      {pageContents[currentPageIndex] || "[No text on this page]"}
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-4">
                      <button
                        onClick={() => setCurrentPageIndex(prev => Math.max(prev - 1, 0))}
                        disabled={currentPageIndex === 0}
                        className={`w-10 h-10 flex items-center justify-center border rounded ${
                          currentPageIndex === 0
                            ? "text-black-400 border-black-400 cursor-not-allowed"
                            : "text-black-700 border-black-700 hover:bg-black-50"
                        }`}
                      >
                        <span className="text-xl">&lt;</span>
                      </button>

                      <span className="text-lg text-gray-800 dark:text-white">
                        {currentPageIndex + 1} of {pageContents.length}
                      </span>

                      <button
                        onClick={() => setCurrentPageIndex(prev => Math.min(prev + 1, pageContents.length - 1))}
                        disabled={currentPageIndex === pageContents.length - 1}
                        className={`w-10 h-10 flex items-center justify-center border rounded ${
                          currentPageIndex === pageContents.length - 1
                            ? "text-black-400 border-black-400 cursor-not-allowed"
                            : "text-black-700 border-black-700 hover:bg-black-50"
                        }`}
                      >
                        <span className="text-xl">&gt;</span>
                      </button>
                    </div>

                 
                  </>
                ) : (
                  <textarea
                    rows="10"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                      setValue("content", e.target.value);
                    }}
                    className="w-full p-4 border rounded-md resize-none dark:bg-black dark:border-gray-600 dark:text-white"
                    placeholder="Enter document content here..."
                  />
                )}
              </div>

              {/* Submit + Reset Buttons */}
              <div className="flex justify-between">
                <button
                  className="w-1/4 mr-2 bg-black text-white py-2 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  onClick={handleSubmit(onSubmit)}
                  disabled={loading || loading1}
                >
                  {loading || loading1 ? "Processing..." : "Submit"}
                </button>
                <button
                  className="w-1/4 ml-2 bg-black text-white py-2 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                  type="reset"
                  onClick={handleResetButton}
                  disabled={loading || loading1}
                >
                  {loading || loading1 ? "Processing..." : "Reset"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Out of Scope Warning */}
        {isInScope === false && (
          <div className="bg-yellow-500 text-black p-4 rounded-md w-full max-w-3xl text-center mt-4">
            ❌ Document is out of scope
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadNewDocument;