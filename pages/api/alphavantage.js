// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const mockQueryParams = {
  symbol: ["btc", "eth", "dot", "ada"],
  convert: "cad",
};

const makeRequest = async (queryParams) => {
  // console.log(process.env.CRYPTO_API_KEY)
  let result = await fetch(
    `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=VGRO.TRT&apikey=${process.env.ALPHAVANTAGE_API_KEY}`
  );
  let data = await result.json();
  // console.log(data);
  return data;
};

export default async (req, res) => {
  let stockRes = await makeRequest(mockQueryParams);
  res.status(200).json({ stock: stockRes });
};
