import { useEffect, useState } from 'react'
import Head from 'next/head'
import AccountCard from '../components/AccountCard'
import PieChart from '../components/PieComponent'
import Pie2 from '../components/PieComponentRefactor'

import { user, newPieData, currencies } from '../const'

export default function Testing({ data }) {
  return (
    <div className="">
      <Head>
        <title>Portfolio Pie</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>{ }</div>
    </div>
  )
}

export async function getServerSideProps(context) {

  const res = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=VGRO.TRT&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
  const data = await res.json()

  console.log(data['Global Quote']['09. change'] * currencies.vgro.quantity);

  // const diff = 
  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data }, // will be passed to the page component as props
  }
}
