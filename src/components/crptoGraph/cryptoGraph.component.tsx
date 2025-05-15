import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import "./cryptoGraph.style.css";

interface IDataGraph {
  arr: number[][];
}

export const CryptoGraph = ({ arr }: IDataGraph) => {
  const data = arr.map((item: number[]) => ({
    date: new Date(item[0]).toLocaleDateString("ru-RU"),
    price: Number((item[1] / 1000).toFixed(1)),
  }));
  console.log(data[0].date);

  return (
    <>
      <BarChart width={1490} height={200} data={data}>
        <XAxis dataKey="date" stroke="#8884d8" />
        <YAxis tickFormatter={(value) => `${value} тыс.`} fill="#fff" />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="price" fill="#8884d8" barSize={30} />
      </BarChart>
    </>
  );
};
