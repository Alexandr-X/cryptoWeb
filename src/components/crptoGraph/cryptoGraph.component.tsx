import { useEffect, useState } from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";

interface IDataGraph {
  arr: number[][];
}

export const CryptoGraph = ({ arr }: IDataGraph) => {
  const [isBigNum, setisBigNum] = useState<boolean>(false);

  useEffect(() => {
    setisBigNum(arr[0][5] / 1000 >= 1 ? true : false);
  }, []);

  const data = arr.map((item: number[]) => {
    if (item[1] / 1000 > 1) {
      return {
        date: new Date(item[0]).toLocaleDateString("ru-RU"),
        price: Number((item[1] / 1000).toFixed(2)),
      };
    }
    return {
      date: new Date(item[0]).toLocaleDateString("ru-RU"),
      price: Number(item[1].toFixed(2)),
    };
  });

  return (
    <>
      <BarChart width={1490} height={230} data={data}>
        <XAxis dataKey="date" stroke="#ffffff" />
        <YAxis
          stroke="#ffffff"
          tickFormatter={(value) => (isBigNum ? `${value} T.$` : value + "$")}
          fill="#fff"
        />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <Bar dataKey="price" fill="#000000" barSize={30} />
      </BarChart>
    </>
  );
};
