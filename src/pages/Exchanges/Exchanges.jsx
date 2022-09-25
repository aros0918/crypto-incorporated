import { Avatar, Col, Collapse, Row, Typography } from "antd";
import HTMLReactParser from "html-react-parser";
import millify from "millify";
import React from "react";
import Loader from "../../components/Loader/Loader";
import { useGetExchangesQuery } from "../../services/cryptoApi";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();

  const exchangeList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
      </Row>
      <Row>
        {exchangeList &&
          exchangeList.map((exchange) => (
            <Col span={24} key={exchange.uuid}>
              <Collapse>
                <Panel
                  key={exchange.uuid}
                  showArrow={false}
                  header={
                    <Row key={exchange.uuid}>
                      <Col span={6} className="currency-name-container">
                        <Text>
                          <strong>{exchange.rank}.</strong>
                        </Text>
                        <Avatar
                          style={{ margin: "0 10px" }}
                          src={exchange.iconUrl}
                        />
                        <Text>
                          <strong>{exchange.name}</strong>
                        </Text>
                      </Col>
                      <Col span={6}>${millify(exchange["24hVolume"])}</Col>
                      <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                    </Row>
                  }
                >
                  {HTMLReactParser(exchange.description || "")}
                </Panel>
              </Collapse>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default Exchanges;
