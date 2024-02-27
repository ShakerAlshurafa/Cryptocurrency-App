import React, { useEffect, useState } from 'react'
import { Button, Menu, Typography, Avatar} from 'antd'
import { Link } from 'react-router-dom'
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons'
import icon from '../../images/cryptocurrency.png'

function Navbar() {
  const items = [{
    label: <Link to="/">Home</Link>,
    icon: <HomeOutlined />,
    key: 'home',
   },{
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
      icon: <FundOutlined />,
      key: 'cryptocurrencies',
   },{
      label: <Link to="/exchanges">Exchanges</Link>,
      icon: <MoneyCollectOutlined />,
      key: 'exchanges',
   },{
      label: <Link to="/news">News</Link>,
      icon: <BulbOutlined />,
      key: 'news',
   },
   ];

   const [activeMenu, setActiveMenu] = useState(true);
   const [screenSize, setScreenSize] = useState(null);

   useEffect(() => {
       const handleResize = () => setScreenSize(window.innerWidth);
       window.addEventListener('resize', handleResize);
       handleResize();
       return () => window.removeEventListener('resize', handleResize);
     }, []);

     useEffect(() => {
      if (screenSize <= 768) {
        setActiveMenu(false);
      } else {
        setActiveMenu(true);
      }
    }, [screenSize]);
  return (
    <div className='nav-container'>
        <div className="logo-container">
            <Avatar src={icon} size="large" />   
            <Typography.Title level={2} className='logo'>
                <Link to="/">Crytoverse</Link>
            </Typography.Title>
            <Button className='menu-control-container' onClick={() => setActiveMenu(!activeMenu)}>
               <MenuOutlined />
            </Button>
        </div>
        {activeMenu && <Menu theme='dark' items={items} />}
    </div>
  )
}

export default Navbar