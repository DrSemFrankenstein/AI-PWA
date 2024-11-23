import { Col, Row } from "antd";
import GeminiChat from "./GeminiChat";

function AIPage() {
  return (
    <>
      <Row>
        <Col
          xs={24}
          sm={24}
          md={12}
          lg={12}
          xl={12}
          offset={0}
          md={{ offset: 6 }}
        >
          <GeminiChat />
        </Col>
      </Row>
    </>
  );
}

export default AIPage;
