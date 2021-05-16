import { useEffect, useState, useMemo } from 'react'
import { NextPage } from 'next'
import { CoinInput } from '../components/coinInput'

// interface handleSetCoinTypes {
//   name: string
//   value: number;
// }

interface coin {
  name: string
  quantity: number
}

type coinsState = coin[]

const testArray: coinsState = [
  { name: 'btc', quantity: 10 },
  { name: 'eth', quantity: 10 },
]

const InputPage: NextPage = () => {
  const [btc, setBtc] = useState<number>(0)
  const [eth, setEth] = useState<number>(0)
  const [dot, setDot] = useState<number>(0)
  const [ada, setAda] = useState<number>(0)
  const [coins, setCoins] = useState<coinsState | []>([])

  const handleSetCoins = (e) => {
    e.preventDefault()
    setCoins([
      { name: 'btc', quantity: btc },
      { name: 'eth', quantity: eth },
      { name: 'dot', quantity: dot },
      { name: 'ada', quantity: ada },
    ])

  }

  // localStorage.setItem('coins', JSON.stringify(coins))
  // console.log(JSON.parse(localStorage.getItem('coins')))

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen bg-red-100">
        <form className="flex flex-col justify-center">
          <CoinInput label='BTC' setCoin={setBtc}/>
          <CoinInput label='ETH' setCoin={setEth}/>
          <CoinInput label='DOT' setCoin={setDot}/>
          <CoinInput label='ADA' setCoin={setAda}/>
          <button
            className="mt-6 py-3 px-6 bg-red-400 border-2 border-gray-300 text-white "
            type="submit"
            onClick={handleSetCoins}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  )
}

export default InputPage
