import { useState, useRef } from "react";
import { Mic, MicOff, X } from "lucide-react";
import { backendApiUrl } from "../../api/backendUrl";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface SpeechRecognitionAlternative {
  transcript: string;
}

interface SpeechRecognitionResult extends ArrayLike<SpeechRecognitionAlternative> {
  isFinal: boolean;
}

interface SpeechRecognitionEvent extends Event {
  results: ArrayLike<SpeechRecognitionResult>;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

export default function Micc() {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const shouldSpeak = useRef(false);

  function speak(text: string) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }

  async function send(textOverride?: string) {
    const userText = (textOverride ?? prompt).trim();
    if (!userText) return;

    setPrompt("");
    setLoading(true);

    setHistory((messages) => [...messages, { role: "user", content: userText }]);

    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      ...history.slice(-20),
      { role: "user", content: userText },
    ];

    try {
      const response = await fetch(backendApiUrl("assistant/chat"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages }),
      });
      const responseText = await response.text();
      let data: unknown;
      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch {
        const isHtml = responseText.trimStart().startsWith("<");
        throw new Error(
          isHtml
            ? `Chat backend returned a web page instead of JSON (HTTP ${response.status}). Verify VITE_BACKEND_URL and restart the backend with the assistant route.`
            : `Chat backend returned invalid JSON (HTTP ${response.status}).`
        );
      }

      if (!response.ok) {
        const errorMessage =
          typeof data === "object" &&
          data !== null &&
          "message" in data &&
          typeof data.message === "string"
            ? data.message
            : `AI assistant request failed (${response.status})`;
        throw new Error(errorMessage);
      }

      if (
        typeof data !== "object" ||
        data === null ||
        !("reply" in data) ||
        typeof data.reply !== "string"
      ) {
        throw new Error("AI assistant returned an invalid response.");
      }

      const reply = data.reply;
      setHistory((messages) => [...messages, { role: "assistant", content: reply }]);

      if (shouldSpeak.current) {
        speak(reply);
        shouldSpeak.current = false;
      }
    } catch (err) {
      console.error("NVIDIA assistant request failed", err);
      shouldSpeak.current = false;
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setHistory((messages) => [
        ...messages,
        { role: "assistant", content: `Error: ${errorMessage}` },
      ]);
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

    const SpeechRecognitionConstructor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognitionConstructor) {
      alert("Your browser does not support the Web Speech API.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = true;

    let finalTranscript = "";

    recognition.onstart = () => setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0]?.transcript ?? "")
        .join("");

      finalTranscript = transcript;
      setPrompt(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (finalTranscript) {
        shouldSpeak.current = true;
        void send(finalTranscript);
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open AI voice chat"
        onClick={() => {
          setIsModalOpen(true);
          if (!isListening) toggleListening();
        }}
        className="fixed top-3 right-3 z-[70] flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition hover:bg-primary/90"
      >
        <Mic size={20} />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <section
            role="dialog"
            aria-modal="true"
            aria-label="AI voice chat"
            className="relative z-[101] flex w-full max-w-lg flex-col rounded-xl bg-card p-4 shadow-xl"
          >
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                aria-label="Close AI voice chat"
                onClick={() => {
                  recognitionRef.current?.stop();
                  setIsListening(false);
                  setIsModalOpen(false);
                }}
                className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-4 h-80 overflow-y-auto rounded-lg bg-muted p-3">
              {history.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`mb-1 max-w-xs rounded-lg px-3 py-2 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-border text-foreground"
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {loading && (
                <p className="text-center italic text-muted-foreground">Thinking…</p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <input
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") void send();
                }}
                className="min-w-0 flex-grow rounded-md border px-3 py-2"
                placeholder="Say or type something..."
              />
              <button
                type="button"
                onClick={() => void send()}
                disabled={loading}
                className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
              >
                Send
              </button>

              <button
                type="button"
                aria-label={isListening ? "Stop voice input" : "Start voice input"}
                onClick={toggleListening}
                className={`rounded-md p-2 \${
                  isListening ? "bg-red-500 text-white" : "bg-primary text-primary-foreground"
                }`}
              >
                {isListening ? <MicOff size={20} /> : <Mic size={20} />}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}