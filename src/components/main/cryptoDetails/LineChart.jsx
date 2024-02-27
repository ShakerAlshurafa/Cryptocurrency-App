import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography} from 'antd';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto'
import 'chartjs-adapter-moment';
Chart.register(CategoryScale);

const { Title } = Typography;

export default function LineChart({coinHistory, currentPrice, coinName}) {
  const coinPrice = [];
  const coinTimestamp = [];
 
  for(let i= 0 ; i < coinHistory?.data?.history?.length ; i++) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      }
    ]
  }
  const options = {
    scales: {
      // x: {
      //   type: 'time',
      //   time: {
      //     unit: 'day',
      //     displayFormats: {
      //       day: 'MMM DD',
      //     },
      //   },
      // },
      y: {
          ticks: {
            beginAtZero: false,
          }
        }
    }
  }
  return (
    <React.Fragment>
      <Row className='chart-header'>
        <Title level={2} className='chart-title'>{coinName} Price Chart</Title>
        <Col className='price-container'>
          <Title level={5} className='price-change'>{coinHistory?.data?.change}%</Title>
          <Title level={5} className='current-price'>Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>

      <Line data={data} options={options} />
    </React.Fragment>
  )
}