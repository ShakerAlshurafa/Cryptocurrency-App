import './App.css';
import { Route, Routes} from 'react-router-dom';
import { Layout } from 'antd';
import { Navbar,Footer, HomePage, Exchanges,Cryptocurrencies, CryptoDetails, News  } from './components';

function App() {
  return (
    <div className='app'>
      <div className='navbar'>
        <Navbar />
      </div>
      <div className='main'>
        <Layout>
          <div className="routes">
            <Routes>
              <Route path="/" element={<HomePage/>} />  
              <Route path='/exchanges' element={<Exchanges />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies/>} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
                
        <div className='footer'>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
