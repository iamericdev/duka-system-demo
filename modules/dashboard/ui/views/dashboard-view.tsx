"use client";

import {
  Calendar,
  ClipboardList,
  FileText,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { CustomersInsights } from "../components/customer-insights";
import { ItemSection } from "../components/item-section";
import { RecentTransactions } from "../components/recent-transactions";
import { SalesPerformance } from "../components/sales-performance";
import { StatCard } from "../components/stat-card";

const topSellingItems = [
  {
    name: "Grapes",
    sold: 214,
    profit: "32,100",
    image: "/products/fresh_produce/grape.png",
  },
  {
    name: "Eggs (Tray)",
    sold: 198,
    profit: "83,160",
    image: "/products/eggs/eggs.png",
  },
  {
    name: "Buns",
    sold: 175,
    profit: "8,750",
    image: "/products/bakery/buns.png",
  },
  {
    name: "Beef Roast",
    sold: 132,
    profit: "112,200",
    image: "/products/ready_to_cook/beef_roast.png",
  },
];

const lowStockItems = [
  {
    name: "Avocado",
    sold: 47,
    stock: "3 kg",
    image: "/products/fresh_produce/avocado.jpg",
  },
  {
    name: "Lemon",
    sold: 63,
    stock: "4 kg",
    image: "/products/fresh_produce/lemon.jpg",
  },
  {
    name: "Green Bell Pepper",
    sold: 38,
    stock: "5 kg",
    image: "/products/fresh_produce/green_bell_pepper.jpg",
  },
  {
    name: "Lemon Thyme Salmon",
    sold: 29,
    stock: "6 pcs",
    image: "/products/ready_to_cook/lemon_thyme_salmon.png",
  },
];

const outOfStockItems = [
  {
    name: "Cilantro",
    sold: 52,
    stock: "0 bunches",
    image: "/products/fresh_produce/cilantro.jpg",
  },
  {
    name: "Lettuce",
    sold: 44,
    stock: "0 heads",
    image: "/products/fresh_produce/lettuce.jpg",
  },
  {
    name: "Tea Leaves",
    sold: 37,
    stock: "0 g",
    image: "/products/deli/tea.jpg",
  },
  {
    name: "Pepper Jack Cheese",
    sold: 21,
    stock: "0 pcs",
    image: "/products/ready_to_cook/pepper_jack_cheese.png",
  },
];

export const DashboardView = () => {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-400">Welcome Back, Ricky!</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
          <Calendar size={18} className="text-slate-400" />
          Today
          <span className="ml-2 text-slate-400">▼</span>
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Sales"
          value="KES 15,585"
          change="0.5"
          isPositive={true}
          icon={FileText}
        />
        <StatCard
          title="Total Transactions"
          value="25,596"
          change="0.3"
          isPositive={false}
          icon={ClipboardList}
        />
        <StatCard
          title="Outstanding"
          value="KES 2,695"
          change="0.6"
          isPositive={false}
          icon={Wallet}
        />
        <StatCard
          title="Revenue"
          value="KES 615,955"
          change="0.5"
          isPositive={true}
          icon={TrendingUp}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesPerformance />
        </div>
        <div className="lg:col-span-1">
          <CustomersInsights />
        </div>
      </div>

      {/* Transactions Table */}
      <RecentTransactions />

      {/* Bottom Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ItemSection
          title="Top-Selling Items"
          dotColor="bg-green-500"
          items={topSellingItems}
          type="top"
        />
        <ItemSection
          title="Low-Stock Items"
          dotColor="bg-primary"
          items={lowStockItems}
          type="low"
        />
        <ItemSection
          title="Out-of-Stock Items"
          dotColor="bg-red-500"
          items={outOfStockItems}
          type="out"
        />
      </div>
    </div>
  );
};
