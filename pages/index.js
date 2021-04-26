import { useEffect, useState } from 'react'
import Head from 'next/head'
import AccountCard from '../components/AccountCard'
import PieChart from '../components/PieComponent'
import Pie2 from '../components/PieComponentRefactor'

import { user, newPieData, currencies } from '../const'

export default function Pie() {
  const [cryptoData, setCryptoData] = useState(undefined)
  const [stockData, setStockData] = useState(undefined)
  const [cryptoTotal, setCryptoTotal] = useState(0)
  const [stockTotal, setStockTotal] = useState(0)
  const [todaysTotalGain, setTodaysTotalGain] = useState(0)

  const { btc, eth, ada, dot, vgro, other } = currencies
  const { BTC, ETH, ADA, DOT } = cryptoData?.crypto?.data || {}

  // console.log(stockData?.stock['Global Quote']['08. previous close']);
  const vgroRate = stockData?.stock?.['Global Quote']?.['08. previous close'] || 0
  const vgroGain = stockData?.stock?.['Global Quote']?.['09. change'] * currencies.vgro.quantity || 0

  // console.log("VGRO RATE:",vgroRate);

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

  const totalGainCalculator = (cryptos) => {
    if (cryptoData == undefined) {
      return 0
    }

    const { data } = cryptoData?.crypto || {}
    let total = 0

    cryptos.forEach((crypto) => {
      const yesterdaysPrice =
        (data[crypto].quote.CAD.price * 100) / (data[crypto].quote.CAD.percent_change_24h + 100)
      const todaysGain =
        currencies[crypto.toLowerCase()].quantity * (data[crypto].quote.CAD.price - yesterdaysPrice)
      total = total + todaysGain
    })

    return total + vgroGain
  }

  const getApiData = async () => {
    let cryptoResults = await fetch('/api/crypto')
    let cryptoData = await cryptoResults.json()
    let stockResults = await fetch('/api/alphavantage')
    let stockData = await stockResults.json()
    setCryptoData(cryptoData)
    setStockData(stockData)
    setTodaysTotalGain(totalGainCalculator(['BTC', 'ETH', 'ADA', 'DOT']))
  }

  useEffect(async () => {
    await getApiData()
    
    // console.log("stock:",stockData);
    // console.log("crypto:",cryptoData);
  }, [])

  return (
    <div className="">
      <Head>
        <title>Portfolio Pie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col lg:flex-row min-h-screen p-4 lg:p-8 bg-gray-100">
        <div className="flex flex-col w-full lg:w-1/3 justify-between mb-4 lg:mb-0">
          <div className="space-y-1 py-8 px-8 bg-white rounded-xl shadow-md mb-4 lg:mb-0">
            <h1 className="text-4xl text-purple-600 font-bold">Portfolio Tracker</h1>
            <p className="text-lg text-gray-500 pt-3">Welcome Back,</p>
            <h2 className="text-xl font-bold">{user.name}</h2>
          </div>

          <AccountCard
            className="space-y-2 py-8 px-8 bg-white rounded-xl shadow-md"
            cryptoData={cryptoData}
            stockData={stockData}
          />
        </div>

        <div className="relative w-full flex flex-col lg:flex-row justify-around bg-white shadow-md lg:ml-8 rounded-xl ">
          <p className="text-3xl text-center font-bold p-5 lg:text-4xl lg:absolute lg:p-10 lg:left-0 lg:top-0 ">
            ${(totaler(currencies) + Number(vgroRate * vgro.quantity)).toFixed(2)}{' '}
            <span
              className={`${
                todaysTotalGain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              } px-2 py-1 rounded-xl`}
            >
              {todaysTotalGain >= 0 ? `+${todaysTotalGain.toFixed(2)}` : todaysTotalGain.toFixed(2)}
            </span>
          </p>
          <Pie2
            className="w-full lg:w-1/2"
            type={`CRYPTO`}
            cryptoData={cryptoData}
            stockData={stockData}
            newPieData={newPieData}
          />
          <Pie2
            className="w-full lg:w-1/2"
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
