export interface currencyType {
  [key: string]: {
    quantity: number
  }
}

export const currencies: currencyType = {
  btc: {
    quantity: 0.0939726 + 0.000903,
  },
  eth: {
    quantity: 0.555517 + 0.03812381,
  },
  dot: {
    quantity: 7.76006,
  },
  ada: {
    quantity: 93.5173,
  },
  vgro: {
    quantity: 1359,
  },
  other: {
    quantity: 0,
  },
}

export interface currencyObject {
  name: string
  quantity: number
}

export const currenciesArray: currencyObject[] = [
  {
    name: 'btc',
    quantity: 0.0939726 + 0.000903,
  },
  {
    name: 'eth',
    quantity: 0.555517 + 0.03812381,
  },
  {
    name: 'dot',
    quantity: 7.76006,
  },
  {
    name: 'ada',
    quantity: 93.5173,
  },
  {
    name: 'vgro',
    quantity: 1030,
  },
]

export const pieData = [
  {
    title: 'BTC',
    value: 1,
    color: 'red',
  },
  {
    title: 'ETH',
    value: 1,
    color: 'blue',
  },
  {
    title: 'DOT',
    value: 1,
    color: 'green',
  },
  {
    title: 'ADA',
    value: 1,
    color: 'orange',
  },
  {
    title: 'VGRO',
    value: 1,
    color: 'purple',
  },
]

export const newPieData = {
  crypto: [
    {
      title: 'BTC',
      value: 1,
      color: 'red',
    },
    {
      title: 'ETH',
      value: 1,
      color: 'blue',
    },
    {
      title: 'DOT',
      value: 1,
      color: 'green',
    },
    {
      title: 'ADA',
      value: 1,
      color: 'orange',
    },
  ],
  stock: [
    {
      title: 'VGRO',
      value: 1,
      color: 'purple',
    },
  ],
  other: {},
}

export const user = {
  name: 'Michael',
}
