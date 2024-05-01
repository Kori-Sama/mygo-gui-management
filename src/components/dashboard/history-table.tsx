import { Transaction } from "@/lib/types";
import { useMemo } from "react";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";

const HistoryTable = ({ tx }: { tx: Transaction[] }) => {
  const data = useMemo(() => {
    const d = [] as {
      date: string;
      total: number;
      passed: number;
      censor: number;
      reject: number;
    }[];

    tx.forEach((v) => {
      const date = new Date(v.date).toLocaleDateString();
      const index = d.findIndex((v) => v.date === date);
      if (index === -1) {
        d.push({
          date,
          total: 1,
          passed: v.status === "passed" ? 1 : 0,
          censor: v.status === "censor" ? 1 : 0,
          reject: v.status === "reject" ? 1 : 0,
        });
      } else {
        d[index].total += 1;
        d[index].passed += v.status === "passed" ? 1 : 0;
        d[index].censor += v.status === "censor" ? 1 : 0;
        d[index].reject += v.status === "reject" ? 1 : 0;
      }
    });

    d.reduce((acc, v) => {
      v.total += acc.total;
      v.passed += acc.passed;
      v.censor += acc.censor;
      v.reject += acc.reject;
      return v;
    });

    return d;
  }, [tx]);

  return (
    <div className="w-full h-[400px] mt-28 lg:px-64">
      <ResponsiveContainer height="100%" width="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="passed" stroke="#82ca9d" />
          <Line type="monotone" dataKey="censor" stroke="#FFD700" />
          <Line type="monotone" dataKey="reject" stroke="#FF4500" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistoryTable;
