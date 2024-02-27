import { Col, Row } from 'antd'
import React from 'react'

function CurrencyRow({currencyOptions, selectedCurrency, onChangeCurrency, onChangeAmount, amount}) {
  return (
    <Row gutter={[48,36]} justify={'center'}>
      <Col>
        <select sh value={selectedCurrency} onChange={onChangeCurrency} className='currencyRowSelect'> 
          {currencyOptions.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </Col>
      <Col>
        <input type="number" className="currencyRowInput" value={amount} onChange={onChangeAmount} />
      </Col>
    </Row>
  )
}

export default CurrencyRow