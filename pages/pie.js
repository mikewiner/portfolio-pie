import { useEffect, useState } from "react";
import Head from 'next/head'
import AccountCard from '../components/AccountCard'
import PieChart from '../components/PieComponent'
import Pie2 from "../components/PieComponentRefactor";
import styles from '../styles/Home.module.css'

import { user, newPieData, currencies } from "../const";

export default function Pie() {
  const [cryptoData, setCryptoData] = useState(undefined);
  const [stockData, setStockData] = useState(undefined);
  const [cryptoTotal, setCryptoTotal] = useState(0);
  const [stockTotal, setStockTotal] = useState(0);

  const { btc, eth, ada, dot, vgro, other } = currencies;
  const { BTC, ETH, ADA, DOT } = cryptoData?.crypto?.data || {};
  
  // console.log(stockData?.stock['Global Quote']['08. previous close']);
  const VGRORate = stockData?.stock['Global Quote']['08. previous close'] || 0;
  // console.log("VGRO RATE:",VGRORate);

  const totaler = (currencies) => {
    if (cryptoData == undefined || BTC == undefined) {
      return 0;
    }
    return Number(
      BTC.quote.CAD.price * btc.quantity +
      ETH.quote.CAD.price * eth.quantity +
      ADA.quote.CAD.price * ada.quantity +
      DOT.quote.CAD.price * dot.quantity
    );
  };

  const getApiData = async () => {
    let cryptoResults = await fetch("/api/crypto");
    let cryptoData = await cryptoResults.json();
    let stockResults = await fetch("/api/alphavantage")
    let stockData =  await stockResults.json();
    setCryptoData(cryptoData);
    setStockData(stockData);
  }

  useEffect(async () => {
    await getApiData();
    // console.log("stock:",stockData);
    // console.log("crypto:",cryptoData);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio Pie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello {user.name}</h1>
      <AccountCard cryptoData={cryptoData} stockData={stockData} />
      <Pie2 type={`CRYPTO`} cryptoData={cryptoData} stockData={stockData} pieData={newPieData} />
      <Pie2 type={`FULL`} cryptoData={cryptoData} stockData={stockData} pieData={newPieData} />
      <PieChart cryptoData={cryptoData} stockData={stockData} />
    </div>
  )
}
