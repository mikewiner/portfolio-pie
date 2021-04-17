// Next.js API route support: https://nextjs.org/docs/api-routes/introduction


const mockQueryParams = {
  "symbol": ["btc", "eth", "dot", "ada"]
}

const makeRequest = async (queryParams) => {
  const reqOptions = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    headers: {
      "X-CMC_PRO_API_KEY": "7825afcf-8404-4c91-984c-3246667430e9",
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
  res.status(200).json({ name: cryptoRes });
};
