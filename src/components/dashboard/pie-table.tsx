import { Transaction } from "@/lib/types";
import { useLangStore } from "@/store";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieTable = ({ tx }: { tx: Transaction[] }) => {
  const lang = useLangStore((s) => s.map);
  const pieData = useMemo(() => {
    const censor = tx.filter((v) => v.status === "censor").length;
    const passed = tx.filter((v) => v.status === "passed").length;
    const reject = tx.filter((v) => v.status === "reject").length;
    const draft = tx.filter((v) => v.status === "draft").length;
    return [
      { name: lang.Censor, amount: censor, color: "#FFD700" },
      { name: lang.Passed, amount: passed, color: "#00FF7F" },
      { name: lang.Reject, amount: reject, color: "#FF4500" },
      { name: lang.Draft, amount: draft, color: "#C0C0C0" },
    ];
  }, [tx]);

  const barData = [
    ...pieData,
    {
      name: lang.All,
      amount: pieData.reduce((acc, v) => acc + v.amount, 0),
      color: "#ADD8E6",
    },
  ];

  return (
    <div className="flex h-[400px] justify-evenly lg:flex-row flex-col items-center lg:mt-20">
      <BarChart width={400} height={400} data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="amount" fill="#8884d8">
          {barData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
      <PieChart width={400} height={400}>
        <Tooltip />

        <Legend layout="vertical" align="right" verticalAlign="middle" />
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
          width="100%"
          height="100%"
        >
          {pieData.map((entry, index) => (
            <>
              <Cell key={`cell-${index}`} fill={entry.color} />
            </>
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieTable;
