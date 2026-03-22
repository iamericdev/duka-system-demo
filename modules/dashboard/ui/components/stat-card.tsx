import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: LucideIcon;
}

export const StatCard = ({
  title,
  value,
  change,
  isPositive,
  icon: Icon,
}: StatCardProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-slate-50 rounded-lg">
          <Icon size={20} className="text-slate-700" />
        </div>
        <div
          className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
        >
          {isPositive ? "+" : ""}
          {change}%
        </div>
      </div>
      <div>
        <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
};
