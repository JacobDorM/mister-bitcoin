import { Component } from 'react'
import { bitcoinService } from '../services/bitcoinService'
import { Chart } from '../cmps/Chart'

export class Statistics extends Component {
  state = {
    bitcoinCharts: null,
    type: 'n-transactions',
    // market-price
    // n-transactions
  }

  componentDidMount() {
    this.loadBitcoinCharts()
  }

  async loadBitcoinCharts() {
    try {
      const { type } = this.state
      const bitcoinCharts = await bitcoinService.getBitcoinCharts(type)
      this.setState({ bitcoinCharts })
    } catch (err) {
      console.log('err:', err)
    }
  }

  render() {
    const { bitcoinCharts, type } = this.state
    if (!bitcoinCharts) return <div>Loading...</div>
    return (
      <section className="statistic">
        <Chart bitcoinCharts={bitcoinCharts} type={type} />
      </section>
    )
  }
}
