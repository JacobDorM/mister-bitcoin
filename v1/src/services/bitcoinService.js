import axios from 'axios'
import { utilService } from './utilService'
// import { storageService } from './async-storage-service.js'

// const MARKET_PRICE_KEY = 'market-price'
// const Transactions_KEY = 'n-transactions'
const BITCOIN_KEY = 'bitcoin_db'

export const bitcoinService = {
  getRate,
  //   getMarketPrice,
  //   getConfirmedTransactions,
  getBitcoinCharts,
}

async function getRate(userCoin) {
  const { data } = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${userCoin}`)
  return data
}

async function getBitcoinCharts(type = null) {
  let bitcoinCharts = (await utilService.loadFromStorage(BITCOIN_KEY)) || {}
  if (!bitcoinCharts[type]) {
    bitcoinCharts[type] = await _getBitcoinChart(type)
    utilService.saveToStorage(BITCOIN_KEY, bitcoinCharts)
  }
  return bitcoinCharts
}

// getMarketPrice, getConfirmedTransactions
async function _getBitcoinChart(type) {
  const bitcoinChart = await axios.get(`https://api.blockchain.info/charts/${type}?timespan=5months&format=json&cors=true`)
  return bitcoinChart.data
}

// async function getMarketPrice() {
//   let marketPrice = await utilService.loadFromStorage(MARKET_PRICE_KEY)
//   if (!marketPrice) {
//     const marketPrice = await axios.get(marketPlaceUrl)
//     utilService.saveToStorage(MARKET_PRICE_KEY, marketPrice)
//   }
//   return marketPrice.data
// }

// async function getConfirmedTransactions() {
//   let confirmedTransactions = await utilService.loadFromStorage(Transactions_KEY)
//   if (!confirmedTransactions) {
//     const confirmedTransactions = await axios.get(marketPlaceUrl)
//     utilService.saveToStorage(MARKET_PRICE_KEY, confirmedTransactions)
//   }
//   return confirmedTransactions.data
// }
