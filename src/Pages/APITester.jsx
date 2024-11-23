import { Radio } from "antd";
import ExampleApiRequests from "../Components/APITester/ExampleApiRequests";
import ExampleApiRequestsNoUI from "../Components/APITester/ExampleApiRequestsNoUI";
import { useState } from "react";

function APITester() {
  const [position, setPosition] = useState("noui");

  return (
    <div style={{ marginTop: "6rem", height:'100vh', width:'97vw' }}>
      <h1>Tester</h1>
      <div style={{ maxWidth: "400px" }}></div>
      <Radio.Group
        value={position}
        onChange={(e) => setPosition(e.target.value)}
        buttonStyle="solid" // Ensures the buttons have a solid appearance
      >
        <Radio.Button value="noui" type="primary">
          NoUI
        </Radio.Button>
        <Radio.Button value="ui" type="primary">
          UI
        </Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: "1rem" }}>
        {position === "ui" ? <ExampleApiRequests /> : <ExampleApiRequestsNoUI />}
      </div>
    </div>
  );
}

export default APITester;
