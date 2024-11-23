import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiKey } from "../Redux/apiKeySlice";
import { Button, Input, Typography, Space } from "antd";

const { Title, Text, Link } = Typography;

const SetApiKey = () => {
  const dispatch = useDispatch();
  const apiKey = useSelector((state) => state.apiKey.value); // Get the current API key
  const [inputKey, setInputKey] = useState(apiKey);

  const handleSaveKey = () => {
    dispatch(setApiKey(inputKey)); // Save the API key in Redux
  };

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto" }}>
      <Title level={4} style={{color: "var(--text-color)"}}>Set AI API Key</Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Input
          type="text"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Enter API Key"
          allowClear
        />
        <Button type="primary" onClick={handleSaveKey}>
          Save API Key
        </Button>
        {apiKey && (
          <Text style={{color: "var(--text-color)"}}>
            <strong>Current API Key:</strong> {apiKey}
          </Text>
        )}
        <Text style={{color: "var(--text-color)"}}>
          You can get your API key from:{" "}
          <Link
            href="https://aistudio.google.com/app/apikey"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://aistudio.google.com/app/apikey
          </Link>
        </Text>
      </Space>
    </div>
  );
};

export default SetApiKey;
