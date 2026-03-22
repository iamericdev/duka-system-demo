import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "New", value: 2364 },
  { name: "Active", value: 2364 },
  { name: "Highest Credit", value: 1560 },
];

export const CustomersInsights = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm h-full">
      <h3 className="text-lg font-bold text-slate-900 mb-6">
        Customers Insights
      </h3>
      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              dy={10}
            />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={60}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 1 ? "#F43F5E" : "#94a3b8"}
                  fillOpacity={index === 1 ? 0.2 : 0.1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between mt-4 px-4">
        {data.map((item, idx) => (
          <div key={idx} className="text-center">
            <p className="text-xs font-bold text-slate-900">
              {item.value.toLocaleString()}
            </p>
            <p className="text-[10px] text-slate-400">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
