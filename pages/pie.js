import { useEffect, useState } from "react";
import Head from 'next/head'
import AccountCard from '../components/AccountCard'
import PieChart from '../components/PieComponent'
import styles from '../styles/Home.module.css'

import { user } from "../const";

export default function Pie() {
  const [cryptoData, setCryptoData] = useState(undefined);
  const [stockData, setStockData] = useState(undefined);

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
      <PieChart cryptoData={cryptoData} stockData={stockData} />
    </div>
  )
}
