import { useState, useEffect } from "react";
import { PieChart } from "react-minimal-pie-chart";
import styles from "../styles/PieComponent.module.css";
import { currencies } from "../const";

const lineWidth = 20;

export default function PieComponent({ cryptoData }) {
  const { btc, eth, ada, dot } = currencies;
  const { BTC, ETH, ADA, DOT } = cryptoData ? cryptoData.crypto.data : "";
  const dataMock = [
    {
      title: "BTC",
      value: BTC ? BTC.quote.CAD.price * btc.quantity : 1,
      color: "red",
    },
    {
      title: "ETH",
      value: ETH ? ETH.quote.CAD.price * eth.quantity : 1,
      color: "blue",
    },
    {
      title: "DOT",
      value: DOT ? DOT.quote.CAD.price * dot.quantity : 1,
      color: "green",
    },
    {
      title: "ADA",
      value: ADA ? ADA.quote.CAD.price * ada.quantity : 1,
      color: "orange",
    },
  ];
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(undefined);

  const data = dataMock.map((entry, i) => {
    if (hovered === i) {
      return {
        ...entry,
        color: "dodgerblue",
      };
    }
    return entry;
  });

  if (!cryptoData) return <h2>Waiting for data</h2>;

  return (
    <>
      <div className={styles.pie}>
        <PieChart
          style={{
            fontFamily:
              '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
            fontSize: "8px",
          }}
          data={data}
          radius={PieChart.defaultProps.radius - 12}
          lineWidth={18}
          segmentsStyle={{ transition: "stroke .3s", cursor: "pointer" }}
          // segmentsShift={(index) => (index === selected ? 6 : 1)}
          animate
          label={({ dataEntry }) => dataEntry.title+" "+ Math.round(dataEntry.percentage) + "%"}
          labelPosition={106}
          labelStyle={{
            fill: "black",
            fontSize: "3px",
            opacity: 0.75,
            pointerEvents: "none",
          }}
          // onClick={(_, index) => {
          //   setSelected(index === selected ? undefined : index);
          // }}
          onMouseOver={(_, index) => {
            setHovered(index);
          }}
          onMouseOut={() => {
            setHovered(undefined);
          }}
          paddingAngle={18}
          rounded
        />
      </div>
    </>
  );
}
