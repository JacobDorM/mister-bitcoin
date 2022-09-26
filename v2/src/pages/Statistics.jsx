import { useState, useEffect } from 'react'
import { bitcoinService } from '../services/bitcoinService'
import { Chart } from '../cmps/Chart'

// Todo: make a dropdown to select marketNames

export const Statistics = () => {
  const [bitcoinCharts, setBitcoinCharts] = useState(null)
  const marketName = 'market-price'
  // const [marketName, setMarketName] = useState('market-price')
  // market-price
  // n-transactions

  useEffect(() => {
    const loadBitcoinCharts = async () => {
      try {
        const bitcoinCharts = await bitcoinService.getBitcoinCharts(marketName)
        setBitcoinCharts(bitcoinCharts)
      } catch (err) {
        console.log('err:', err)
      }
    }

    loadBitcoinCharts()
  }, [])

  if (!bitcoinCharts) return <div>Loading...</div>
  return (
    <section className="statistic">
      <Chart bitcoinCharts={bitcoinCharts} type={marketName} />
    </section>
  )
}
