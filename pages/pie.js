import { useEffect, useState } from "react";
import Head from 'next/head'
import AccountCard from '../components/AccountCard'
import PieChart from '../components/PieComponent'
import styles from '../styles/Home.module.css'

import { user } from "../const";

export default function Pie() {
  const [cryptoData, setCryptoData] = useState(undefined);
  useEffect(async () => {
    let results = await fetch("/api/crypto");
    let data = await results.json();
    console.log(data);
    setCryptoData(data);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio Pie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello {user.name}</h1>
      <AccountCard cryptoData={cryptoData} />
      <PieChart cryptoData={cryptoData} />
    </div>
  )
}
