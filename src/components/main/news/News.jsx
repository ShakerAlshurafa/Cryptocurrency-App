import React, { useEffect, useState } from 'react'
import { Select, Typography, Row, Col, Avatar,  Card, Input, Spin} from 'antd'
import moment from 'moment'
import { useGetCryptoNewsQuery } from '../../../services/cryptoNewsApi'
import icon from '../../../images/News-icon.png'
import Search from 'antd/es/input/Search'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Provider } from 'react-redux';

const { Text, Title } = Typography;
const { Option } = Select;

function News({simplified}) {
  const { data : cryptoNewsList, isFetching } = useGetCryptoNewsQuery(simplified ? 5 : 100);
  
  const [cryptoNews, setCryptoNews] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const filteredData = cryptoNewsList?.filter((news)=> news.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setCryptoNews(filteredData);
  },[cryptoNewsList,searchTerm])
  
  const coins = ['Bitcoin', 'Ethereum', 'U.S. Dollar']
  if(isFetching) return <Spin />;
  return (
    <React.Fragment>
      <Row gutter={[24,24]}>
        {!simplified&& <Col span={24}> 
          <Select showSearch className='select-news' placeholder="Select a Crypto" optionFilterProp='children' onChange={e=>setSearchTerm(e)}
           filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())} >
            <Option value="">All</Option>
            {coins.map((coin)=> <Option key={coin} value={coin}>{coin}</Option>) }
          </Select>
          <div className='search'>
            <Search placeholder="Search News" onChange={(e)=> setSearchTerm(e.target.value)} enterButton />
          </div></Col>}
          
        {cryptoNews?.map((news,i)=> (
          <Col xs={24}  sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target='blank' rel="noopener noreferrer">
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{i+1}. {news.title}</Title>
                  <Avatar shape="square" size={64} src={icon} alt='news'/>
                </div>
                <p>{news.description > 100 ? `${news.description.substring(0, 50)}...` : news.description}</p>
                <div className="news-time">
                  <Text><ClockCircleOutlined /> {moment(news.date).fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  )
}

export default News