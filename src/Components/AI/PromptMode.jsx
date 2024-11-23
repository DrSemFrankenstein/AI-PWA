import React, { useState } from "react";
import { Input, Button } from "antd";
import SetPromptTemplate from "../../Utils/SetPromptTemplate";

const PromptMode = ({ apiKey, template, parameters, sendPromptToAPI }) => {
  const [parameterValues, setParameterValues] = useState({}); // Store parameter values
  const [promptConversation, setPromptConversation] = useState([]); // Chat history for Prompt Mode
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update the parameter value when user types in the input field
  const handleInputChange = (e, key) => {
    const value = e.target.value;
    setParameterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Replace placeholders in the template with the correct parameter values
  const generateFinalPrompt = () => {
    // Map parameter keys (like "parameter1") to actual names in the template (like "number", "type", "category")
    const mappedParameters = {};
    Object.entries(parameters).forEach(([paramKey, paramName]) => {
      mappedParameters[paramName] = parameterValues[paramKey];
    });

    // Replace the placeholders in the template with the mapped values
    return template.replace(
      /{(.*?)}/g,
      (_, key) => mappedParameters[key] || `{${key}}`
    );
  };

  const sendPrompt = async () => {
    const finalPrompt = generateFinalPrompt();

    // Check if any placeholders are still in the prompt, indicating missing parameters
    if (finalPrompt.includes("{") || !finalPrompt.trim()) {
      setError("Please fill all the parameters correctly.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Send final prompt to the parent to call API
      await sendPromptToAPI(finalPrompt, setPromptConversation); // Pass conversation update function
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h4>Enter Parameters for Prompt:</h4>
        {/* Generate input fields dynamically based on the template parameter names */}
        {Object.entries(parameters).map(([key, hint], index) => (
          <Input
            key={index}
            placeholder={`Enter ${hint}`} // Use the parameter name as the placeholder (e.g., "Enter number")
            value={parameterValues[key] || ""}
            onChange={(e) => handleInputChange(e, key)}
            size="middle"
            allowClear
            style={{ marginBottom: "10px" }}
          />
        ))}
      </div>
      <Button
        type="primary"
        size="large"
        onClick={sendPrompt}
        disabled={loading || !apiKey}
        loading={loading}
        style={{ marginTop: "10px" }}
      >
        Send
      </Button>
      {error && <div style={{ color: "red" }}>{error}</div>}

      {/* Prompt Conversation History */}
      <div className="chat-box" style={{ marginTop: "20px" }}>
        {promptConversation.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.sender === "User" ? "user-message" : "ai-message"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
        <SetPromptTemplate />
    </div>
  );
};

export default PromptMode;
