import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTemplate, setParameters } from "../Redux/promptTemplateSlice";
import { Input, Button } from "antd";

const SetPromptTemplate = () => {
  const dispatch = useDispatch();
  const template = useSelector((state) => state.promptTemplate.template);

  const [inputTemplate, setInputTemplate] = useState(template);

  const extractParameters = (template) => {
    const regex = /{(.*?)}/g;
    let match;
    const params = {};
    let index = 1;

    while ((match = regex.exec(template)) !== null) {
      const paramName = match[1] || `parameter${index}`;
      params[`parameter${index}`] = paramName;
      index++;
    }
    return params;
  };

  const handleSaveTemplate = () => {
    const parameters = extractParameters(inputTemplate);
    dispatch(setTemplate(inputTemplate));
    dispatch(setParameters(parameters));
  };

  return (
    <div>
      <h4>Set Prompt Template</h4>
      <Input.TextArea
        rows={5}
        value={inputTemplate}
        onChange={(e) => setInputTemplate(e.target.value)}
        placeholder='Enter the prompt template (e.g., "Please generate list of {10} {names} of {cats}")'
      />
      <Button type="primary" onClick={handleSaveTemplate}>
        Save Template
      </Button>
      <div>
        <h5>Current Template:</h5>
        <p>{template}</p>
        <h5>Extracted Parameters:</h5>
        <pre>{JSON.stringify(extractParameters(inputTemplate), null, 2)}</pre>
      </div>
    </div>
  );
};

export default SetPromptTemplate;
