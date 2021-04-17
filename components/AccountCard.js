import { useEffect, useState } from "react";
import styles from "../styles/AccountCard.module.css";
import { currencies } from "../const"

export default function AccountCard({ data, cryptoData }) {
  // const [cryptoData, setCryptoData] = useState(undefined);
  // useEffect(async () => {
  //   let results = await fetch("/api/crypto");
  //   let data = await results.json();
  //   console.log(data);
  //   setCryptoData(data);
  // }, []);

  const { btc, eth, ada, dot } = currencies;
  const { BTC, ETH, ADA, DOT } = cryptoData ? cryptoData.crypto.data : "";

  const totaler = (currencies) => {
    if (cryptoData == undefined) {
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
        <p className={styles.total}>TOTAL CAD:{totaler(currencies)}</p>
      </div>
    </>
  );
}
