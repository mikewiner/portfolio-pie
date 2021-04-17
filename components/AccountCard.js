import { useEffect } from "react";
import styles from "../styles/AccountCard.module.css";

const currencies = {
  btc: {
    rate: 77957.10,
    quantity:0.11,
  },
  eth: {
    rate: 1,
    quantity:1,
  }
} 


export default function AccountCard({ data }) {
  // const reqOptions = {
  //   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //   headers: {
  //     'X-CMC_PRO_API_KEY': '7825afcf-8404-4c91-984c-3246667430e9'
  //   },
  // };
  
  // useEffect( async ()=> {
  //   const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',reqOptions)
  //   const data = await res.json();
  //   console.log(data);
  // },[])

  const { btc, eth } = currencies; 
  return (
    <>
      <div className={styles.card}>
        <h3>Your Account Value in Bitcoin:</h3>
        <p>BTC:{btc.quantity}</p>
        <p>CAD:{btc.rate * btc.quantity}</p>
      </div>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest')
//   const data = await res.json()

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       data,
//     },
//   }
// }
