import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteDataThunk,
  fetchDataThunk,
  postDataThunk,
  putDataThunk,
} from "../../Redux/apiThunks";
import { Button, Row, Col, List } from "antd";
import "./ExampleApiRequestsNoUI.css"; // Custom CSS file

const ExampleApiRequestsNoUI = () => {
  const dispatch = useDispatch();
  const apiState = useSelector((state) => state.api);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const existingData = apiState.data;
  const hasDataForCurrentPage = existingData && existingData[page];

  useEffect(() => {
    if (!hasDataForCurrentPage) {
      dispatch(fetchDataThunk("/launches", page));
    }
  }, [dispatch, page, hasDataForCurrentPage]);

  const handlePostData = () => {
    const payload = { key: "value" };
    dispatch(postDataThunk("/my-endpoint", payload));
  };

  const handlePutData = () => {
    const payload = { key: "newValue" };
    dispatch(putDataThunk("/my-endpoint", payload));
  };

  const handleDeleteData = () => {
    dispatch(deleteDataThunk("/my-endpoint"));
  };

  const loadMore = () => {
    if (!loading && apiState.data && apiState.data.length > 0) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
    if (bottom) {
      loadMore();
    }
  };

  return (
    <div>
      {apiState.loading && <p>Loading...</p>}
      {apiState.error && <p>Error: {apiState.error}</p>}

      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 }, // Responsive gutter values
        ]}
      >
        <Col xs={24} sm={24} md={24} lg={24}>
          <List
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            }}
            loading={loading}
            dataSource={apiState.data || []}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <div className="list-item-container">
                  <p className="item-text">{JSON.stringify(item, null, 2)}</p>
                </div>
              </List.Item>
            )}
            onScroll={handleScroll}
          />
        </Col>
      </Row>

      <div className="api-actions">
        <Button onClick={handlePostData}>Send POST Request</Button>
        <Button onClick={handlePutData}>Send PUT Request</Button>
        <Button onClick={handleDeleteData}>Send DELETE Request</Button>
      </div>
    </div>
  );
};

export default ExampleApiRequestsNoUI;
