// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const mockQueryParams = {
  "symbol": ["btc", "eth", "dot", "ada"],
  "convert": "cad"
}

const makeRequest = async (queryParams) => {
  // console.log(process.env.CRYPTO_API_KEY)
  const reqOptions = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "X-CMC_PRO_API_KEY": process.env.CRYPTO_API_KEY,
    },
  };

  let result =  await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?${new URLSearchParams(queryParams)}`,
    reqOptions
  )
  let data  = await result.json();
  return data;
};

export default async (req, res) => {
  let cryptoRes = await makeRequest(mockQueryParams);
  res.status(200).json({ crypto: cryptoRes });
};
