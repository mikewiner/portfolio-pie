import { useEffect, useState } from "react";
import styles from "../styles/AccountCard.module.css";
import { currencies } from "../const"

export default function AccountCard({ cryptoData, stockData }) {

  const { btc, eth, ada, dot } = currencies;
  const { BTC, ETH, ADA, DOT } = cryptoData?.crypto?.data || {};
  
  // console.log(stockData?.stock['Global Quote']['08. previous close']);
  const VGRORate = stockData?.stock['Global Quote']['08. previous close'];
  console.log("VGRO RATE:",VGRORate);

  const totaler = (currencies) => {
    if (cryptoData == undefined || BTC == undefined) {
      return "calculating";
    }
    return Number(
      BTC.quote.CAD.price * btc.quantity +
      ETH.quote.CAD.price * eth.quantity +
      ADA.quote.CAD.price * ada.quantity +
      DOT.quote.CAD.price * dot.quantity
    ).toFixed(2);
  };

  return (
    <>
      <div className={styles.card}>
        <h3>Your Total Account Value:</h3>
        <p>
          BTC:{BTC && Number(BTC.quote.CAD.price * btc.quantity).toFixed(2)}
        </p>
        <p>
          ETH:{ETH && Number(ETH.quote.CAD.price * eth.quantity).toFixed(2)}
        </p>
        <p>
          ADA:{ADA && Number(ADA.quote.CAD.price * ada.quantity).toFixed(2)}
        </p>
        <p>
          DOT:{DOT && Number(DOT.quote.CAD.price * dot.quantity).toFixed(2)}
        </p>
        <p>
          VGRO:{DOT && Number(DOT.quote.CAD.price * dot.quantity).toFixed(2)}
        </p>
        <p className={styles.total}>TOTAL: ${totaler(currencies)}</p>
      </div>
    </>
  );
}
