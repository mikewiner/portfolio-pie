import Head from 'next/head'
import { useReducer } from 'react'
import PieChart from '../components/PieComponent'
import styles from '../styles/Home.module.css'

const user = {
  name: "Michael",
}

export default function Pie() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio Pie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello {user.name}</h1>
      <PieChart />
    </div>
  )
}
