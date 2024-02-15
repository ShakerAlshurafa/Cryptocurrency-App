import React, { useEffect, useState } from 'react'
import { Select, Typography, Row, Col, Avatar,  Card, Input, Spin} from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../../../services/cryptoNewsApi'
import icon from '../../../images/News-icon.png'
import Search from 'antd/es/input/Search'

const { Text, Title } = Typography;
const { Option } = Select;

function News({simplified}) {
  const { data : cryptoNewsList, isFetching } = useGetCryptoNewsQuery(simplified ? 5 : 20);
  
  const [cryptoNews, setCryptoNews] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const filteredData = cryptoNewsList?.filter((news)=> news.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptoNews(filteredData);
  },[cryptoNewsList,searchTerm])
  
  if(isFetching) return <Spin />;
  return (
    <React.Fragment>
      {!simplified&& <div className='search'>
          <Search placeholder="Search News" onChange={(e)=> setSearchTerm(e.target.value)} enterButton />
        </div>}
      <Row gutter={[24,24]}>
        {cryptoNews?.map((news,i)=> (
          <Col xs={24}  sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target='blank' rel="noopener noreferrer">
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{i+1}. {news.title}</Title>
                  <Avatar shape="square" size={64} src={icon} alt='logo'/>
                </div>
                <p>{news.description > 100 ? `${news.description.substring(0, 50)}...` : news.description}</p>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  )
}

export default News