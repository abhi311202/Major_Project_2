import { useState, useEffect } from "react";
import axios from "axios";
import { getDocument , GlobalWorkerOptions } from 'pdfjs-dist';
import toast from "react-hot-toast";
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
    <div className="flex min-h-screen max-h-max bg-white dark:bg-[#222] overflow-hidden">
      <div className="flex-1 p-6 py-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 dark:text-white">
          Document Q&A
        </h1>

        <div
          className={`mb-4 border-4 border-dashed rounded-lg p-6 text-center transition-colors 
           ${dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300"} 
           ${loading || chatOpen ? "opacity-50 cursor-not-allowed" : ""}`}
              style={{ width: "100%", height: "300px", pointerEvents: loading || chatOpen ? "none" : "auto" }} // Disable interaction when loading
              onDragOver={loading || chatOpen ? null : handleDragOver}
              onDragLeave={loading || chatOpen ? null : handleDragLeave}
              onDrop={loading ||chatOpen ? null : handleDrop}
        >
          <input
            id="fileUpload"
            type="file"
            
            className="hidden dark:text-white"
           onChange={loading || chatOpen ? null : handleFileUpload} // Disable file selection
           disabled={loading || chatOpen} // Disable input field
          />
          <label htmlFor="fileUpload" className="block h-full">
              <p className="text-lg text-gray-700 font-medium mb-12 dark:text-white">
              {loading ? "Processing..." : chatOpen ? "Chat open, file upload is disabled." :"Drag & drop a document (pdf format) here, or "} 
              {!loading && !chatOpen && <span className="text-blue-600 underline">browse</span>}
            </p>
              {/* <FontAwesomeIcon icon={faArrowUpFromBracket} /> */}
              <i className="fa-solid fa-file fa-7x"></i>
              {file && !loading && (
              <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-xs sm:max-w-sm mx-auto overflow-hidden text-ellipsis whitespace-nowrap border border-gray-100 p-2 rounded-md dark:text-white">
                Uploaded: <strong>{file.name}</strong> ({(file.size / 1024).toFixed(2)} KB)
              </p>
            )}
            </label>
        </div>

        <button
           className={`bg-blue-600 text-white font-medium px-5 py-3 rounded-md hover:bg-blue-700 transition duration-300 ${
            loading || chatOpen ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          onClick={handleIngestDocument}
          disabled={loading || chatOpen} // Disable button when loading
            
        >
          {loading ? "Ingesting..." : "Ingest Document"}
        </button>

        {/* Show upload error message if document is not uploaded in vector store */}
        {uploadError && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md text-center">
            <h1 className="text-2xl font-semibold text-red-700 mb-4">{uploadError}</h1>
          </div>
        )}



                    {/* Display Ingest or Loading Indicator */}
              {loading && (
              <div className="mt-8 p-6 bg-white shadow-lg rounded-lg text-center dark:bg-black">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white">
                  Processing...
                </h2>
                <p className="text-gray-600 dark:text-white">Please wait while the document is being Ingest.</p>
              </div>
        )}
        
         {/* Display Error Message if Fetch Fails */}
          {!loading && Error && (
            <div className="mt-8 p-6 bg-red-100 shadow-lg rounded-lg text-center border border-red-500">
              <h2 className="text-2xl font-semibold text-red-700 mb-4">
                Error
              </h2>
              <p className="text-red-600">{Error}</p>
            </div>
        )}
        
        {deleteMessage &&(
            <div className="mt-8 p-6 bg-green-100 shadow-lg rounded-lg text-center border border-green-500">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">
                {ingestOutput.index_name} 
              </h2>
              <p className="text-green-600">{deleteMessage}</p>
            </div>
        )}

{!loading && !Error && chatOpen && (
  <div className="mt-4 sm:mt-8 p-4 sm:p-6 bg-black border border-gray-800 shadow-lg rounded-lg text-center sm:text-left dark:bg-white w-full mx-auto"
>
    {/* <div className="bg-blue-600 text-white p-4 font-semibold flex justify-between items-center rounded-t-lg">
      <span>Chatbot</span>
      <button onClick={handleEndChat} className="text-white font-bold">X</button>
    </div> */}

    <div className="p-4 h-80 sm:h-80 overflow-y-auto flex flex-col">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`p-2 my-1 rounded-lg max-w-[80%] ${
            msg.type === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200 text-gray-800 self-start p-3"
          }`}
        >
            {/* {msg.text
              .replace(/\s+/g, " ") // Remove extra spaces between words
              .split("\n") // Split into lines
              .map((line, index) =>
                line.trim() === "" ? null : ( // Ignore empty lines
                  <p key={index} className="text-[15px] leading-normal text-left">{line}</p>
                )
              )} */}
          <div className="text-[15px] leading-normal text-left whitespace-pre-line">
              {msg.text}
          </div>
          
                  </div>
      ))}
              
              {waitingForResponse && (
                <div className="p-2 my-1 rounded-lg max-w-[80%] bg-gray-600 text-white self-start p-3">
                  
                  <span>Searching...</span>
                </div>
              )}
    </div>

    <div className="p-2 border-t flex items-center gap-2 flex-wrap"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-2 border rounded-lg dark:text-black w-full sm:w-auto"

        placeholder="Ask a question..."
        disabled={waitingForResponse} // Prevent input while processing
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"

        onClick={handleSendQuery}
      >
        Send
      </button>
              
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        onClick={handleEndChat}
      >
        End
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
        onClick={Clearchat}
      >
        Clear Chat
      </button>        
              
      
    </div>
  </div>
)}

      </div>
    </div>
  );
};



export default AdvanceRag;