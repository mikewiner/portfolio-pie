import { useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import styles from '../styles/PieComponent.module.css'
import { currencies } from '../const'

export default function PieComponent({ cryptoData, newPieData, stockData, type, className }) {
  const { btc, eth, ada, dot, vgro } = currencies
  const { BTC, ETH, ADA, DOT } = cryptoData?.crypto?.data || {}

  const VGRORate = stockData?.stock?.['Global Quote']?.['08. previous close'] || 0

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

  if (!cryptoData)
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="font-bold h-auto">Waiting for data ...</h2>
      </div>
    )

  if (type == 'FULL') {
    const dataFull = [
      {
        title: 'Crypto',
        value: totaler(currencies) || 1,
        color: 'green',
      },
      {
        title: 'Stocks',
        value: VGRORate * vgro.quantity || 1,
        color: 'slategray',
      },
    ]
    // console.log("PIE DATA:",pieData);

    return (
      <>
        <div className={className}>
          <PieChart
            style={{
              fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
              fontSize: '10px',
            }}
            data={dataFull}
            radius={PieChart.defaultProps.radius - 12}
            lineWidth={18}
            segmentsStyle={{ transition: 'stroke .3s' }}
            animate
            label={({ dataEntry }) =>
              dataEntry.title + ' ' + Math.round(dataEntry.percentage) + '%'
            }
            labelPosition={106}
            labelStyle={{
              fill: 'black',
              fontSize: '3px',
              opacity: 0.75,
              pointerEvents: 'none',
            }}
            paddingAngle={18}
            rounded
          />
        </div>
      </>
    )
  }

  if (type == 'CRYPTO') {
    const dataCrypto = newPieData.crypto

    //JESUS
    dataCrypto.forEach((pieSlice) => {
      pieSlice.value =
        cryptoData.crypto.data[pieSlice.title].quote.CAD.price *
        currencies[pieSlice.title.toLowerCase()].quantity
    })

    // console.log('piepie', dataCrypto)
    return (
      <>
        <div className={className}>
          <PieChart
            style={{
              fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
              fontSize: '10px',
            }}
            data={dataCrypto}
            radius={PieChart.defaultProps.radius - 12}
            lineWidth={18}
            segmentsStyle={{ transition: 'stroke .3s' }}
            animate
            label={({ dataEntry }) =>
              dataEntry.title + ' ' + Math.round(dataEntry.percentage) + '%'
            }
            labelPosition={106}
            labelStyle={{
              fill: 'black',
              fontSize: '3px',
              opacity: 0.75,
              pointerEvents: 'none',
            }}
            paddingAngle={18}
            rounded
          />
        </div>
      </>
    )
  }
}
