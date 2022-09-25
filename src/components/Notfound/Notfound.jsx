import { Typography } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const Notfound = () => {
  return (
    <div className="notfound-container">
      <Title>404 Page not found!</Title>
      <Text>
        Please reload the page. Go back to homepage <Link to="/">Home</Link>{" "}
      </Text>
    </div>
  );
};

export default Notfound;
