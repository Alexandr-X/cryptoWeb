import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

interface IDataGraph {
  arr: number[][];
}

export const CryptoGraph = ({ arr }: IDataGraph) => {
  const data = arr.map((item: number[]) => ({
    date: new Date(item[0]).toLocaleDateString("ru-RU"),
    price: Number((item[1] / 100).toFixed(3)),
  }));

  return (
    <>
      <BarChart width={1490} height={230} data={data}>
        <XAxis dataKey="date" stroke="#ffffff" />
        <YAxis
          stroke="#ffffff"
          tickFormatter={(value) => `${value} сот.`}
          fill="#fff"
        />
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar dataKey="price" fill="#000000" barSize={30} />
      </BarChart>
    </>
  );
};
