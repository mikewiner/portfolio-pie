import { useEffect, useState } from 'react'
import Head from 'next/head'
import AccountCard from '../components/AccountCard'
import PieChart from '../components/PieComponent'
import Pie2 from '../components/PieComponentRefactor'
import styles from '../styles/Home.module.css'

import { user, newPieData, currencies } from '../const'

export default function Pie() {
  const [cryptoData, setCryptoData] = useState(undefined)
  const [stockData, setStockData] = useState(undefined)
  const [cryptoTotal, setCryptoTotal] = useState(0)
  const [stockTotal, setStockTotal] = useState(0)

  const { btc, eth, ada, dot, vgro, other } = currencies
  const { BTC, ETH, ADA, DOT } = cryptoData?.crypto?.data || {}

  // console.log(stockData?.stock['Global Quote']['08. previous close']);
  const VGRORate = stockData?.stock['Global Quote']['08. previous close'] || 0
  // console.log("VGRO RATE:",VGRORate);

  const totaler = (currencies) => {
    if (cryptoData == undefined || BTC == undefined) {
      return 0
    }
    return Number(
      BTC.quote.CAD.price * btc.quantity +
        ETH.quote.CAD.price * eth.quantity +
        ADA.quote.CAD.price * ada.quantity +
        DOT.quote.CAD.price * dot.quantity
    )
  }

  const getApiData = async () => {
    let cryptoResults = await fetch('/api/crypto')
    let cryptoData = await cryptoResults.json()
    let stockResults = await fetch('/api/alphavantage')
    let stockData = await stockResults.json()
    setCryptoData(cryptoData)
    setStockData(stockData)
  }

  useEffect(async () => {
    await getApiData()
    // console.log("stock:",stockData);
    // console.log("crypto:",cryptoData);
  }, [])

  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio Pie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-row min-h-screen p-8 bg-gray-100">
        <div className="flex flex-col w-96 justify-between">
          <h1 className="space-y-2 py-8 px-8 bg-white rounded-xl shadow-md text-4xl font-bold text-purple-600">
            Portfolio Tracker
          </h1>
          <div className="space-y-2 py-8 px-8 bg-white rounded-xl shadow-md">
            <p className="text-lg text-gray-500">Welcome Back,</p>
            <h2 className="text-xl font-bold">{user.name}</h2>
          </div>
          <AccountCard
            className="space-y-2 max-w-lg py-8 px-8 bg-white rounded-xl shadow-md"
            cryptoData={cryptoData}
            stockData={stockData}
          />
        </div>

        <div className="relative w-full flex flex-row justify-around bg-white shadow-md ml-8 rounded-xl">
          <p className="text-6xl font-bold absolute p-10 left-0 top-0 ">
            ${(totaler(currencies) + Number(VGRORate * vgro.quantity)).toFixed(2)}
          </p>
          <Pie2
            type={`CRYPTO`}
            cryptoData={cryptoData}
            stockData={stockData}
            newPieData={newPieData}
          />
          <Pie2
            type={`FULL`}
            cryptoData={cryptoData}
            stockData={stockData}
            newPieData={newPieData}
          />
          {/* <PieChart cryptoData={cryptoData} stockData={stockData} /> */}
        </div>
      </div>
    </div>
  )
}
