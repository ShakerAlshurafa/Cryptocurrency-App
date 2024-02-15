import React from 'react'
import { Typography, Space } from 'antd'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
    <Typography.Title level={5} style={{color: 'white', textAlign:'center'}}>
        Cryptoverse <br />
        All rights reserverd
    </Typography.Title>
    <Space>
        <Link to='/'>Home</Link>
        <Link to='/exchanges'>Exchanges</Link>
        <Link to='/news'>News</Link>
    </Space>
    </div>
  )
}

export default Footer