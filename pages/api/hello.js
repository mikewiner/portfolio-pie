// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const reqOptions = {
  method: "GET", // *GET, POST, PUT, DELETE, etc.
  headers: {
    "X-CMC_PRO_API_KEY": "7825afcf-8404-4c91-984c-3246667430e9",
    "symbol": "BTC", 
  },
};


export default (req, res) => {
  fetch(
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=btc",
    reqOptions
  )
  .then(res => res.json())
  .then(res => console.log(res));

  res.status(200).json({ name: res });
};
