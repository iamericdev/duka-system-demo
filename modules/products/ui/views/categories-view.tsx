"use client";

import { Filter, Plus, Search, X } from "lucide-react";
import { useState } from "react";
import { Category, categories as initialCategories } from "../../data";

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


export const CategoriesView = () => {
  const [cats, setCats] = useState<Category[]>(initialCategories);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | "Active" | "Inactive">("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");

  const filtered = cats.filter((c) => {
    const matchesSearch = c.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const matchesFilter =
      filter === "All" ? true : filter === "Active" ? c.active : !c.active;
    return matchesSearch && matchesFilter;
  });

  const toggleActive = (idx: number) => {
    setCats((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, active: !c.active } : c)),
    );
  };

  const addCategory = () => {
    const name = newName.trim();
    if (!name) return;
    setCats((prev) => [
      ...prev,
      {
        name,
        count: 0,
        active: true,
        image: "/products/eggs/eggs.png",
      },
    ]);
    setNewName("");
    setShowAddModal(false);
  };

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
          className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
        >
          <Plus size={18} />
          Add Category
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Categories</h3>
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
                {filter}
                <span className="text-[10px] text-slate-400">▼</span>
              </button>
              <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-100 rounded-xl shadow-lg z-10 hidden group-focus-within:block group-hover:block">
                {(["All", "Active", "Inactive"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setFilter(opt)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl ${filter === opt ? "font-bold text-orange-600" : "text-slate-700"}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            No categories found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((cat) => {
              const realIdx = cats.indexOf(cat);
              return (
                <div
                  key={realIdx}
                  className="bg-white border border-slate-100 rounded-2xl p-6 flex flex-col items-center text-center group hover:shadow-md transition-all"
                >
                  <div className="w-full flex justify-end mb-2">
                    <Toggle
                      active={cat.active}
                      onToggle={() => toggleActive(realIdx)}
                    />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-32 h-32 object-contain mb-4 group-hover:scale-110 transition-transform"
                  />
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {cat.name}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {cat.count} Products
                  </p>
                  {!cat.active && (
                    <span className="mt-2 px-2 py-0.5 bg-slate-100 text-slate-400 rounded-full text-[10px] font-bold">
                      Inactive
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">
                Add New Category
              </h2>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewName("");
                }}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                Category Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCategory()}
                placeholder="e.g. Snacks"
                autoFocus
                className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none border border-slate-100"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewName("");
                }}
                className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={addCategory}
                disabled={!newName.trim()}
                className="flex-1 py-3 bg-orange-600 text-white rounded-xl text-sm font-bold hover:bg-orange-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
