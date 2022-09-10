import { Component } from 'react'
import { Sparklines, SparklinesBars } from 'react-sparklines'

export class Chart extends Component {
  render() {
    const { bitcoinCharts } = this.props
    let charts = JSON.parse(JSON.stringify(bitcoinCharts))
    Object.entries(bitcoinCharts).map(([key, value]) => (charts[key].values = value.values.map((value) => value.y)))
    return (
      <section className="statistic">
        {Object.entries(charts).map(([key, value]) => (
          <div key={key}>
            <div>{value.name}</div>
            <div>
              <Sparklines data={value.values} margin={1} height={500} width={2500}>
                <SparklinesBars />
              </Sparklines>
            </div>
            <div>{value.description}</div>
          </div>
        ))}
      </section>
    )
  }
}
