import { useState, useRef } from "react"; 
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import { Mic, MicOff } from "lucide-react"; 

const GPT_MODELS = [
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.0-flash",     // fallback if 2.5 is unavailable
];
const SELECTED_MODEL = "gemini-2.5-flash"; 

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export default function Micc() {
  const [history, setHistory] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recognitionRef = useRef(null);
  const shouldSpeak = useRef(false); 

  // Helper: Speak text
  function speak(text) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  // Updated send function: accepts optional text to allow auto-sending
  async function send(textOverride = null) {
    // Determine which text to use: the override (voice) or the state (typed)
    // We check if textOverride is a string because onClick passes an event object
    const userText = (typeof textOverride === 'string' ? textOverride : prompt).trim();
    
    if (!userText) return;

    setPrompt("");
    setLoading(true);

    const newHuman = { role: "user", content: userText };
    setHistory((h) => [...h, newHuman]);

    const messages = [
      new SystemMessage("You are a helpful assistant."),
      ...history.map((m) => new HumanMessage(m.content)),
      new HumanMessage(userText),
    ];

    const llm = new ChatGoogleGenerativeAI({
      model: SELECTED_MODEL,     
      temperature: 0.5,
      apiKey: GOOGLE_KEY,
    });

    try {
      const aiMsg = await llm.invoke(messages);
      setHistory((h) => [...h, { role: "assistant", content: aiMsg.content }]);
      
      // Auto-speak if the flag is set
      if (shouldSpeak.current) {
        speak(aiMsg.content);
        shouldSpeak.current = false; 
      }
    } catch (err) {
      console.error("Gemini call failed", err);
      setHistory((h) => [...h, { role: "assistant", content: `Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  }

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false; 
    recognition.interimResults = true; 

    // Variable to capture final text for auto-send
    let finalTranscript = "";

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      finalTranscript = transcript; // Store it for onend
      setPrompt(transcript); // Update UI so user sees what they said
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    // When speech ends, automatically send the captured text
    recognition.onend = () => {
      setIsListening(false);
      if (finalTranscript) {
        shouldSpeak.current = true; // Enable voice output for the reply
        send(finalTranscript);      // Trigger send immediately
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="max-w-lg mx-auto ">
   

     
      <div className="flex ">
       
        
      {/* Mic Button Floating in Center */}
<div className="flex justify-center ">
  <button
    onClick={() => {
      setIsModalOpen(true);
      toggleListening();   // starts voice recognition
    }}
    className=" hover:bg-blue-700  rounded-full shadow-lg"
  >
    <Mic size={28} />
  </button>
</div>
{isModalOpen && (
  <div className="fixed h-screen inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center">
    <div className="bg-white w-full max-w-lg rounded-xl p-4 shadow-xl mx-4">

      {/* Close Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setIsModalOpen(false)}
          className="text-gray-600 hover:text-gray-900"
        >
          ✖
        </button>
      </div>

      {/* Chat Section */}
      <div className="h-80 overflow-y-auto bg-gray-100 rounded-lg p-3 mb-4">
        {history.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`${m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"} px-3 py-2 rounded-lg mb-1 max-w-xs`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <p className="italic text-center text-gray-500">Thinking…</p>}
      </div>

      {/* Input + Send */}
      <div className="flex items-center space-x-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          className="flex-grow border rounded-md px-3 py-2"
          placeholder="Say or type something..."
        />
        <button
          onClick={() => send()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Send
        </button>

        <button
          onClick={toggleListening}
          className={`p-2 rounded-md text-white ${
            isListening ? "bg-red-500" : "bg-gray-700"
          }`}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>

    </div>
  </div>
)}


      </div>
      
    </div>
  );
}