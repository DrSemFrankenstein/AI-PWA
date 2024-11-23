import React from "react";
import { Col, Layout, Row } from "antd";
import CurrentTime from "../Components/CurrentTime";
import CurrentDate from "../Components/CurrentDate";
import BluetoothConnection from "../Utils/BluetoothConnection";

const { Content } = Layout;

const Settings = () => {
  return (
    <Content style={{ textAlign: "center" }}>
      <br />
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <CurrentTime />
          <CurrentDate />
          <BluetoothConnection />
        </Col>
      </Row>
    </Content>
  );
};

export default Settings;
