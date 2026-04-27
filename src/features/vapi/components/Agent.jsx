import React, { useState, useEffect } from "react";
import VapiModule from "@vapi-ai/web";
import "../style/agent.scss";

const Agent = ({ apiKey, assistantId }) => {
  const [vapi, setVapi] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    if (!apiKey) return;

    const Vapi = VapiModule.default || VapiModule;
    const vapiInstance = new Vapi(apiKey);
    setVapi(vapiInstance);

    vapiInstance.on("call-start", () => {
      console.log("Call started");
      setIsConnected(true);
    });

    vapiInstance.on("call-end", () => {
      console.log("Call ended");
      setIsConnected(false);
      setIsSpeaking(false);
    });

    vapiInstance.on("speech-start", () => {
      console.log("Assistant started speaking");
      setIsSpeaking(true);
    });

    vapiInstance.on("speech-end", () => {
      console.log("Assistant stopped speaking");
      setIsSpeaking(false);
    });

    vapiInstance.on("message", (message) => {
      if (message.type === "transcript") {
        const newMessage = {
          role: message.role,
          text: message.transcript,
        };

        setTranscript((prev) => {
          const updated = [...prev, newMessage];
          // Update last message to show in subtitle
          setLastMessage(message.transcript);
          return updated;
        });
      }
    });

    vapiInstance.on("error", (error) => {
      console.error("Vapi error:", error);
    });

    return () => {
      vapiInstance?.stop();
    };
  }, [apiKey]);

  const toggleCall = () => {
    if (isConnected) {
      if (vapi) {
        vapi.stop();
      }
    } else {
      if (vapi) {
        vapi.start(assistantId);
      }
    }
  };

  return (
    <div className="agent-widget">
      <div className="agent-widget__container">
        {/* Main Avatar Card */}
        <div className="agent-widget__avatar-card">
          <div
            className={`agent-widget__avatar-wrapper ${isSpeaking ? "agent-widget__avatar-wrapper--speaking" : ""}`}
          >
            <div className="agent-widget__avatar">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="agent-widget__avatar-icon"
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Animated rings when speaking */}
            {isConnected && (
              <>
                <div className="agent-widget__avatar-ring agent-widget__avatar-ring--1" />
                <div className="agent-widget__avatar-ring agent-widget__avatar-ring--2" />
              </>
            )}
          </div>

          <h2 className="agent-widget__brand">InterBuddy</h2>
        </div>

        {/* Subtitle Card - Shows last transcribed message */}
        <div className="agent-widget__subtitle-card">
          <p className="agent-widget__subtitle">
            {lastMessage || "Ready to start your interview"}
          </p>
        </div>

        {/* Call/End Toggle Button */}
        <button
          className={`agent-widget__toggle-btn ${isConnected ? "agent-widget__toggle-btn--active" : ""}`}
          onClick={toggleCall}
          aria-label={isConnected ? "End call" : "Start call"}
        >
          <span className="agent-widget__toggle-icon">
            {isConnected ? (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M12 9c-1.6 0-3.15.25-4.6.72v3.1c0 .39-.23.74-.56.9-.98.49-1.87 1.12-2.66 1.85-.18.18-.43.28-.7.28-.28 0-.53-.11-.71-.29L.29 13.08c-.18-.17-.29-.42-.29-.7 0-.28.11-.53.29-.71C3.34 8.78 7.46 7 12 7s8.66 1.78 11.71 4.67c.18.18.29.43.29.71 0 .28-.11.53-.29.71l-2.48 2.48c-.18.18-.43.29-.71.29-.27 0-.52-.11-.7-.28-.79-.74-1.69-1.36-2.67-1.85-.33-.16-.56-.5-.56-.9v-3.1C15.15 9.25 13.6 9 12 9z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.26-.26.36-.62.25-1-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
            )}
          </span>
          <span className="agent-widget__toggle-text">
            {isConnected ? "End Call" : "Call"}
          </span>
        </button>

        {/* Hidden transcript for debugging/accessibility */}
        {transcript.length > 0 && (
          <div className="agent-widget__transcript-hidden" aria-live="polite">
            {lastMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Agent;
