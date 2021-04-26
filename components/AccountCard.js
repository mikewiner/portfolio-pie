import { useEffect, useState } from 'react'
import { currencies } from '../const'

export default function AccountCard({ cryptoData, stockData, className }) {
  // const [gainz, setGainz] = useState([]);

  const { btc, eth, ada, dot, vgro, other } = currencies
  const { BTC, ETH, ADA, DOT } = cryptoData?.crypto?.data || {}

  console.log(BTC)

  // console.log(stockData?.stock['Global Quote']['08. previous close']);
  const VGRORate = stockData?.stock?.['Global Quote']?.['08. previous close'] || 0
  const VGROgain = stockData?.stock?.['Global Quote']?.['09. change'] * currencies.vgro.quantity || 0

  const gainCalculator = (crypto) => {
    if (cryptoData == undefined) {
      return 0
    }

    const { data } = cryptoData?.crypto || {};

    const yesterdaysPrice =
      (data[crypto].quote.CAD.price * 100) / (data[crypto].quote.CAD.percent_change_24h + 100)
    const todaysGain =
      currencies[crypto.toLowerCase()].quantity * (data[crypto].quote.CAD.price - yesterdaysPrice)

    return Number(todaysGain.toFixed(2))
  }

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

  const btcGain = gainCalculator('BTC')
  const ethGain = gainCalculator('ETH')
  const adaGain = gainCalculator('ADA')
  const dotGain = gainCalculator('DOT')
  const cryptoGain = btcGain + ethGain + adaGain + dotGain
  const totalGain = btcGain + ethGain + adaGain + dotGain + VGROgain

  return (
    <>
      <div className={className}>
        <h3 className="text-xl font-bold">Your Total Account Value:</h3>
        <p>
          BTC: ${BTC && Number(BTC.quote.CAD.price * btc.quantity).toFixed(2)}{' '}
          <span
            className={`${
              btcGain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            } px-2 py-1 rounded-xl`}
          >
            {btcGain > 0 ? `+${btcGain}` : btcGain}
          </span>
        </p>
        <p>
          ETH: ${ETH && Number(ETH.quote.CAD.price * eth.quantity).toFixed(2)}{' '}
          <span
            className={`${
              ethGain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            } px-2 py-1 rounded-xl`}
          >
            {ethGain > 0 ? `+${ethGain}` : ethGain}
          </span>
        </p>
        <p>
          ADA: ${ADA && Number(ADA.quote.CAD.price * ada.quantity).toFixed(2)}{' '}
          <span
            className={`${
              adaGain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            } px-2 py-1 rounded-xl`}
          >
            {adaGain > 0 ? `+${adaGain}` : adaGain}
          </span>
        </p>
        <p>
          DOT: ${DOT && Number(DOT.quote.CAD.price * dot.quantity).toFixed(2)}{' '}
          <span
            className={`${
              dotGain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            } px-2 py-1 rounded-xl`}
          >
            {dotGain > 0 ? `+${dotGain}` : dotGain}
          </span>
        </p>
        <p>
          VGRO: ${VGRORate && Number(VGRORate * vgro.quantity).toFixed(2)}{' '}
          <span
            className={`${
              VGROgain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            } px-2 py-1 rounded-xl`}
          >
            {VGROgain > 0 ? `+${VGROgain}` : `${VGROgain}`}
          </span>
        </p>
        <div className="bg-purple-100 py-2 px-3 rounded-xl text-purple-800 text-opacity-90">
          <p className="py-2">
            Crypto Total: ${totaler(currencies).toFixed(2)}
            <span
              className={`${
                cryptoGain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              } px-2 py-1 rounded-xl`}
            >
              {cryptoGain > 0 ? `+${cryptoGain.toFixed(2)}` : `${cryptoGain.toFixed(2)}`}
            </span>
          </p>
          <p className="py-2">
            Stock Total: ${Number(VGRORate * vgro.quantity).toFixed(2)}
            <span
              className={`${
                VGROgain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              } px-2 py-1 rounded-xl`}
            >
              {VGROgain > 0 ? `+${VGROgain.toFixed(2)}` : `${VGROgain.toFixed(2)}`}
            </span>
          </p>
          <p className="font-bold text-md py-2">
            Portfolio Total: ${(totaler(currencies) + Number(VGRORate * vgro.quantity)).toFixed(2)}{' '}
            <span
              className={`${
                totalGain >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              } px-2 py-1 rounded-xl`}
            >
              {totalGain > 0 ? `+${totalGain.toFixed(2)}` : `${totalGain.toFixed(2)}`}
            </span>
          </p>
        </div>
      </div>
    </>
  )
}
