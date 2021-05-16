import { useState } from 'react'

interface Props {
  label: string
  setCoin: any;
}

export const CoinInput:React.FC<Props> = ({label, setCoin}) => {

  return (
    <>
      <label className=" text-red-900 text-2xl">Enter Your {label}</label>
      <input
        className="py-3 px-6 rounded-lg border-gray-100 border-2"
        type="number"
        name="amount"
        id="bitcoin"
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          setCoin(parseInt(e.target.value))
        }
      />
    </>
  )
}
