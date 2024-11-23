import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Radio } from "antd";
import ChatMode from "./ChatMode";
import PromptMode from "./PromptMode";
import SetApiKey from "../../Utils/SetApiKey";

const GeminiChat = () => {
  const [mode, setMode] = useState("chat");
  const apiKey = useSelector((state) => state.apiKey.value);
  const template = useSelector((state) => state.promptTemplate.template);
  const parameters = useSelector((state) => state.promptTemplate.parameters);

  const sendPromptToAPI = async (finalPrompt, setConversation) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: finalPrompt }],
          },
        ],
      }),
    });

    const data = await response.json();
    if (response.ok) {
      const modelResponse =
        data.candidates[0]?.content.parts[0]?.text || "No response";
      setConversation((prev) => [
        ...prev,
        { sender: "User", text: finalPrompt },
        { sender: "AI", text: modelResponse },
      ]);
    } else {
      throw new Error(data.error || "API error");
    }
  };

  return (
    <div>
      <SetApiKey />
      <Radio.Group
        onChange={(e) => setMode(e.target.value)}
        value={mode}
        style={{ marginBottom: "20px" }}
        buttonStyle="solid" 
      >
        <Radio.Button value="chat" type="primary">
          Chat Mode
        </Radio.Button>
        <Radio.Button value="prompt" type="primary">
          Prompt Mode
        </Radio.Button>
      </Radio.Group>

      {mode === "chat" ? (
        <ChatMode apiKey={apiKey} sendPromptToAPI={sendPromptToAPI} />
      ) : (
        <PromptMode
          apiKey={apiKey}
          template={template}
          parameters={parameters}
          sendPromptToAPI={sendPromptToAPI}
        />
      )}
    </div>
  );
};

export default GeminiChat;
