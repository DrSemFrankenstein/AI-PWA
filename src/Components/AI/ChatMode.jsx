import React, { useState } from "react";
import { Input, Button } from "antd";

const ChatMode = ({ apiKey, sendPromptToAPI }) => {
  const [prompt, setPrompt] = useState("");
  const [chatConversation, setChatConversation] = useState([]); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);

  const sendPrompt = async () => {
    const trimmedValue = prompt.trim();
    if (!trimmedValue) {
      setError("Please enter a valid prompt.");
      return;
    }
    setLoading(true);
    setError(null);
    
    try {
      await sendPromptToAPI(trimmedValue, setChatConversation);
      setPrompt("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Type your message..."
        size="large"
        allowClear
      />
      <Button
        type="primary"
        size="large"
        onClick={sendPrompt}
        disabled={!prompt.trim() || !apiKey || loading}
        loading={loading}
        style={{ marginTop: "10px", color: "var(--text-color)" }}
      >
        Send
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Chat History */}
      <div className="chat-box" style={{ marginTop: "20px" }}>
        {chatConversation.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "User" ? "user-message" : "ai-message"}`}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMode;
