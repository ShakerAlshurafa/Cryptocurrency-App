import React, { useEffect, useState } from 'react'
import { useGetExchangeQuery } from '../../../services/cryptoExchangeApi'
import { Spin, Col, Row, Typography } from 'antd'
import CurrencyRow from './CurrencyRow'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { GiCoinflip } from "react-icons/gi";


const { Title } = Typography

function Exchanges() {
  const [base, setBase] = useState('USD')
  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate, setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

  let toAmount, fromAmount
  if (amountInFromCurrency) {
      fromAmount = amount
      toAmount = amount * exchangeRate || 1
    } else {
      toAmount = amount
      fromAmount = amount / (exchangeRate==0? 1 : exchangeRate)
    }
    
  const { data, error, isLoading } = useGetExchangeQuery(base)

  
  useEffect(() => {
    if (data) {
      const firstCurrency = Object.keys(data.result)[0]
      setCurrencyOptions([data.base, ...Object.keys(data.result)])
      setFromCurrency(data.base)
      setToCurrency(firstCurrency)
      setExchangeRate(data.result[firstCurrency])
    }
  }, [data])

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      setBase(fromCurrency)
      setExchangeRate(data?.result[toCurrency])
    }
  }, [fromCurrency,toCurrency])

  function handleFromAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange(e) {
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }

  if (isLoading) {
    return <Spin />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='cryptoConverter'>
      <Title level={2} className='converter'>
        <div class="two alt-two">
          <h1>
            Cryptocurrency Converter
            <span>Instantly convert your crypto with our real-time rates</span>
          </h1>
        </div>
      </Title>
      <Row justify="center" className="content">
        <Col span={8}>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={fromCurrency}
            onChangeCurrency={e => setFromCurrency(e.target.value)}
            onChangeAmount={handleFromAmountChange}
            amount={fromAmount}
          />
        </Col>
        <Col span={8}>
          <div className="equals"><ArrowLeftOutlined /><ArrowRightOutlined /></div>
        </Col>
        <Col span={8}>
          <CurrencyRow
            currencyOptions={currencyOptions}
            selectedCurrency={toCurrency}
            onChangeCurrency={e => setToCurrency(e.target.value)}
            onChangeAmount={handleToAmountChange}
            amount={toAmount}
          />
        </Col>
      </Row>
      <Row>
        <GiCoinflip className='exchangeBottomIcon' />
      </Row>
    </div>
  )
}

export default Exchanges