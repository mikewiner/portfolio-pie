import { useEffect, useState } from 'react'
import styles from '../styles/AccountCard.module.css'
import { currencies } from '../const'

export default function AccountCard({ cryptoData, stockData, className }) {
  const { btc, eth, ada, dot, vgro, other } = currencies
  const { BTC, ETH, ADA, DOT } = cryptoData?.crypto?.data || {}

  // console.log(stockData?.stock['Global Quote']['08. previous close']);
  const VGRORate = stockData?.stock['Global Quote']['08. previous close'] || 0;
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

  return (
    <>
      <div className={className}>
        <h3 className="text-xl font-bold">Your Total Account Value:</h3>
        <p>BTC: ${BTC && Number(BTC.quote.CAD.price * btc.quantity).toFixed(2)}</p>
        <p>ETH: ${ETH && Number(ETH.quote.CAD.price * eth.quantity).toFixed(2)}</p>
        <p>ADA: ${ADA && Number(ADA.quote.CAD.price * ada.quantity).toFixed(2)}</p>
        <p>DOT: ${DOT && Number(DOT.quote.CAD.price * dot.quantity).toFixed(2)}</p>
        <p>VGRO: ${VGRORate && Number(VGRORate * vgro.quantity).toFixed(2)}</p>
        <div className="bg-purple-100 py-2 px-3 rounded-xl text-purple-800 text-opacity-90">
          <p className={styles.total}>Crypto Total: ${totaler(currencies).toFixed(2)}</p>
          <p className={styles.total}>
            Stock Total: ${Number(VGRORate * vgro.quantity).toFixed(2)}
          </p>
          <p className="font-bold text-md">
            Portfolio Total: ${(totaler(currencies) + Number(VGRORate * vgro.quantity)).toFixed(2)}
          </p>
        </div>
      </div>
    </>
  )
}
