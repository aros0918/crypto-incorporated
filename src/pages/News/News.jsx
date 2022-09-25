import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import moment from "moment/moment";
import React, { useState } from "react";
import Loader from "../../components/Loader/Loader";
import { useGetCryptosQuery } from "../../services/cryptoApi";
import { useGetCryptosNewsQuery } from "../../services/cryptoNewsApi";

const demoImage = `http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg`;
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptosNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data: cryptosList } = useGetCryptosQuery(100);

  if (!cryptoNews?.value) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowercase().indexOf(input.toLocaleLowerCase()) >
              0
            }
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {cryptosList &&
              cryptosList?.data?.coins.map((coin) => (
                <Option value={coin.name} key={coin.name}>
                  {coin.name}
                </Option>
              ))}
          </Select>
        </Col>
      )}
      {cryptoNews &&
        cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} key={news.url}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="News"
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar
                      src={
                        news.provider[0]?.image?.thumbnail?.contentUrl ||
                        demoImage
                      }
                      alt="News"
                    />
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>
                    {moment(news.datePublished).startOf(`ss`).fromNow()}
                  </Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default News;
