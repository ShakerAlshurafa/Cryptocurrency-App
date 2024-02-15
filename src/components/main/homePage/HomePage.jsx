import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic, Spin } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../../../services/cryptoApi'
import { Cryptocurrencies, News } from '../../../components'

const { Title } = Typography;
function HomePage() {
  
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if(isFetching){
    return <Spin />;
  }
  return (
    <div>
      <Title level={2} className='heading'>Global Crypto Stats</Title>
      <Row gutter={[24,24]}>
        <Col span={8}><Statistic title="Total Cryptocurrencies" value={millify(globalStats.total)} /></Col>
        <Col span={8}><Statistic title="Total Exchnges" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={8}><Statistic title="Total Market" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={8}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={8}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className='home-title'>Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurrencies'>Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified/>

      <div className="home-heading-container">
        <Title level={2} className='home-title'>Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
      </div>
      <News simplified/>
      
    </div>
  )
}

export default HomePage