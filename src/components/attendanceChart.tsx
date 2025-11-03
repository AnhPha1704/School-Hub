"use client";
import Image from "next/image";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "T2",
    "Có mặt": 60,
    Vắng: 40,
  },
  {
    name: "T3",
    "Có mặt": 70,
    Vắng: 60,
  },
  {
    name: "T4",
    "Có mặt": 90,
    Vắng: 75,
  },
  {
    name: "T5",
    "Có mặt": 90,
    Vắng: 75,
  },
  {
    name: "T6",
    "Có mặt": 65,
    Vắng: 55,
  },
  {
    name: "T7",
    "Có mặt": 60,
    Vắng: 46,
  },
];

const AttendanceChart = () => {
  return (
    <div className="bg-white rounded-2xl p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Điểm danh</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#d1d5db" }}
            tickLine={false}
          />
          <YAxis axisLine={false} tick={{ fill: "#d1d5db" }} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
          />
          <Bar
            dataKey="Có mặt"
            fill="var(--color-yellowLight)"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
          <Bar
            dataKey="Vắng"
            fill="var(--color-greenLight)"
            legendType="circle"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
