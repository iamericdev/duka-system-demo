"use client";

import { StatCard } from "@/modules/dashboard/ui/components/stat-card";
import {
  AlertTriangle,
  Box,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Product, categories, products as initialProducts } from "../../data";

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    "In-Stock": "bg-green-50 text-green-600",
    "Low-Stock": "bg-orange-50 text-orange-600",
    "Out-of-Stock": "bg-red-50 text-red-600",
  };
  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const Toggle = ({
  active,
  onToggle,
}: {
  active: boolean;
  onToggle: () => void;
}) => (
  <div
    onClick={onToggle}
    className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${active ? "bg-slate-900" : "bg-slate-200"}`}
  >
    <div
      className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${active ? "left-6" : "left-1"}`}
    />
  </div>
);

let skuCounter = 100;
function generateSKU(category: string) {
  const prefix = category.replace(/[^A-Za-z]/g, "").slice(0, 3).toUpperCase();
  return `${prefix}-${++skuCounter}`;
}

export const ProductsView = () => {
  const [prods, setProds] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: categories[0].name,
    price: "",
    qty: "",
    unit: "pcs",
  });

  const filtered = useMemo(() => {
    return prods.filter((p) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q);
      const matchStatus =
        statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [prods, search, statusFilter]);

  const toggleActive = (idx: number) => {
    setProds((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, active: !p.active } : p))
    );
  };

  const addProduct = () => {
    const name = form.name.trim();
    if (!name || !form.price || !form.qty) return;
    const qty = parseInt(form.qty, 10);
    const price = parseFloat(form.price);
    const status: Product["status"] =
      qty === 0 ? "Out-of-Stock" : qty <= 5 ? "Low-Stock" : "In-Stock";
    const sku = generateSKU(form.category);
    const catObj = categories.find((c) => c.name === form.category);
    const image = catObj?.image ?? "/products/eggs/eggs.png";

    setProds((prev) => [
      ...prev,
      {
        sku,
        name,
        category: form.category,
        qty,
        unit: form.unit,
        price,
        status,
        active: true,
        image,
      },
    ]);
    setForm({ name: "", category: categories[0].name, price: "", qty: "", unit: "pcs" });
    setShowAddModal(false);
  };

  const totalProducts = prods.length;
  const topSelling = prods.filter((p) => p.status === "In-Stock").length;
  const lowStock = prods.filter((p) => p.status === "Low-Stock").length;
  const outOfStock = prods.filter((p) => p.status === "Out-of-Stock").length;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-400">
            Manage &amp; track inventory products
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={totalProducts.toLocaleString()}
          change="0.5"
          isPositive={true}
          icon={Box}
        />
        <StatCard
          title="In-Stock Products"
          value={topSelling.toLocaleString()}
          change="0.5"
          isPositive={true}
          icon={TrendingUp}
        />
        <StatCard
          title="Low-Stock Products"
          value={lowStock.toLocaleString()}
          change="0.6"
          isPositive={false}
          icon={AlertTriangle}
        />
        <StatCard
          title="Out-of-Stock Products"
          value={outOfStock.toLocaleString()}
          change="0.5"
          isPositive={false}
          icon={XCircle}
        />
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Products</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
            </div>
            <div className="relative group">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
                <Filter size={16} />
                {statusFilter}
                <span className="text-[10px] text-slate-400">▼</span>
              </button>
              <div className="absolute right-0 mt-1 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-10 hidden group-focus-within:block group-hover:block">
                {["All", "In-Stock", "Low-Stock", "Out-of-Stock"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl ${statusFilter === s ? "font-bold text-orange-600" : "text-slate-700"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-50">
                <th className="pb-4 text-xs font-medium text-slate-400 uppercase tracking-wider">SKU</th>
                <th className="pb-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Item Name</th>
                <th className="pb-4 text-xs font-medium text-slate-400 uppercase tracking-wider">QTY</th>
                <th className="pb-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Price</th>
                <th className="pb-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="pb-4 text-xs font-medium text-slate-400 uppercase tracking-wider">Activation</th>
                <th className="pb-4 text-xs font-medium text-slate-400 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-sm text-slate-400">
                    No products found.
                  </td>
                </tr>
              ) : (
                filtered.map((product, idx) => {
                  const realIdx = prods.indexOf(product);
                  return (
                    <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 text-sm font-medium text-slate-900">{product.sku}</td>
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">{product.name}</span>
                            <span className="text-[10px] text-slate-400">{product.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`text-sm font-bold ${product.qty === 0 ? "text-red-500" : "text-slate-900"}`}>
                          {product.qty} {product.unit}
                        </span>
                      </td>
                      <td className="py-4 text-sm font-bold text-slate-900">
                        KES {product.price.toLocaleString()}
                        <span className="text-[10px] text-slate-400 font-normal">/{product.unit}</span>
                      </td>
                      <td className="py-4">
                        <StatusBadge status={product.status} />
                      </td>
                      <td className="py-4">
                        <Toggle active={product.active} onToggle={() => toggleActive(realIdx)} />
                      </td>
                      <td className="py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
                          <MoreHorizontal size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Add New Product</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="e.g. Mango"
                  autoFocus
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none border border-slate-100"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none border border-slate-100"
                >
                  {categories.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Price (KES)</label>
                  <input
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none border border-slate-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Quantity</label>
                  <input
                    type="number"
                    min="0"
                    value={form.qty}
                    onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))}
                    placeholder="0"
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none border border-slate-100"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">Unit</label>
                <select
                  value={form.unit}
                  onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none border border-slate-100"
                >
                  {["pcs", "kg", "g", "litre", "bunch", "tray", "pack", "bottle"].map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={addProduct}
                disabled={!form.name.trim() || !form.price || !form.qty}
                className="flex-1 py-3 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
