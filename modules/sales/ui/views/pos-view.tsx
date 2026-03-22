"use client";

import { products as allProducts } from "@/modules/products/data";
import {
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

type CartItem = {
  sku: string;
  name: string;
  price: number;
  image: string;
  qty: number;
  unit: string;
};

type PaymentMethod = "Cash" | "Card" | "M-Pesa";

const VAT_RATE = 0.16;
const PAGE_SIZE = 12;

const categoryNames = [
  "All",
  ...Array.from(new Set(allProducts.map((p) => p.category))),
];

export const PosView = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [page, setPage] = useState(1);

  // Payment modal state
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Cash");
  const [cashTendered, setCashTendered] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const inCategory =
        activeCategory === "All" || p.category === activeCategory;
      const inSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase().trim());
      return inCategory && inSearch;
    });
  }, [activeCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedProducts = filteredProducts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );

  // Cart helpers
  const addToCart = (product: (typeof allProducts)[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.sku === product.sku);
      if (existing) {
        return prev.map((i) =>
          i.sku === product.sku ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [
        ...prev,
        {
          sku: product.sku,
          name: product.name,
          price: product.price,
          image: product.image,
          qty: 1,
          unit: product.unit,
        },
      ];
    });
  };

  const changeQty = (sku: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.sku === sku ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );
  };

  const clearCart = () => setCart([]);

  const itemCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;
  const cashAmount = parseFloat(cashTendered) || 0;
  const change = cashAmount - total;

  const completeSale = () => {
    setShowPayment(false);
    setShowSuccess(true);
    setCart([]);
    setCashTendered("");
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 flex gap-8 h-[calc(100vh-120px)]">
      {/* Products Section */}
      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
            <p className="text-sm text-slate-400">
              Add items &amp; finalize payment
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Products</h3>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
              />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categoryNames.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-orange-600 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto pr-2">
            {pagedProducts.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-sm">
                No products found.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {pagedProducts.map((product) => (
                  <div
                    key={product.sku}
                    className="bg-white border border-slate-100 rounded-2xl p-4 flex flex-col items-center text-center relative group hover:shadow-md transition-all"
                  >
                    <button
                      onClick={() => addToCart(product)}
                      className="absolute top-2 right-2 w-8 h-8 bg-orange-600 text-white rounded-lg flex items-center justify-center shadow-lg shadow-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Plus size={18} />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 object-contain mb-3"
                    />
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-green-600">
                      KES {product.price.toLocaleString()}
                      <span className="text-[10px] text-slate-400 font-normal">
                        /{product.unit}
                      </span>
                    </p>
                    {/* In-cart indicator */}
                    {cart.find((c) => c.sku === product.sku) && (
                      <span className="mt-1.5 px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full text-[10px] font-bold">
                        In cart ×{cart.find((c) => c.sku === product.sku)?.qty}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-bold text-slate-900">
                {safePage} of {totalPages}
              </span>{" "}
              pages
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold ${
                    safePage === n
                      ? "bg-slate-900 text-white"
                      : "text-slate-400 hover:bg-slate-100"
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Sidebar */}
      <div className="w-96 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1 flex flex-col gap-6 overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Current Order
              </h3>
              <p className="text-xs text-slate-400">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            </div>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="flex items-center gap-2 px-3 py-1.5 border border-orange-200 text-orange-600 rounded-lg text-xs font-bold hover:bg-orange-50 transition-colors"
              >
                <Trash2 size={14} />
                Clear
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {cart.length === 0 ? (
              <div className="py-16 flex flex-col items-center text-slate-300 gap-3">
                <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center">
                  <Plus size={28} />
                </div>
                <p className="text-sm font-medium">No items yet</p>
                <p className="text-xs text-center">
                  Click + on a product to add it to the order
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.sku}
                  className="flex items-center gap-4 p-3 border border-slate-50 rounded-xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-[10px] font-bold text-green-600">
                      KES {item.price.toLocaleString()}
                      <span className="text-slate-400 font-normal">
                        /{item.unit}
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-50 rounded-lg p-1">
                    <button
                      onClick={() => changeQty(item.sku, -1)}
                      className="w-6 h-6 flex items-center justify-center text-orange-600 hover:bg-white rounded-md transition-all"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs font-bold w-5 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => changeQty(item.sku, 1)}
                      className="w-6 h-6 flex items-center justify-center text-orange-600 hover:bg-white rounded-md transition-all"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="space-y-3 pt-6 border-t border-slate-50">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Subtotal</span>
              <span className="font-bold text-slate-900">
                KES {subtotal.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">VAT 16%</span>
              <span className="font-bold text-slate-900">
                KES {vat.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-lg pt-3 border-t border-slate-50">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-bold text-slate-900">
                KES {total.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => cart.length > 0 && setShowPayment(true)}
              disabled={cart.length === 0}
              className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Payment
            </button>
            <button className="w-full py-4 bg-white border border-orange-200 text-orange-600 rounded-xl font-bold hover:bg-orange-50 transition-all">
              Hold
            </button>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Payment</h2>
              <button
                onClick={() => setShowPayment(false)}
                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Amount due */}
            <div className="bg-orange-50 rounded-xl p-4 text-center">
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
                Amount Due
              </p>
              <p className="text-3xl font-bold text-slate-900">
                KES {total.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
              </p>
            </div>

            {/* Payment Method Tabs */}
            <div className="flex bg-slate-50 rounded-xl p-1 gap-1">
              {(["Cash", "Card", "M-Pesa"] as PaymentMethod[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setPaymentMethod(m)}
                  className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                    paymentMethod === m
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Cash tendered */}
            {paymentMethod === "Cash" && (
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Cash Tendered (KES)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={cashTendered}
                    onChange={(e) => setCashTendered(e.target.value)}
                    placeholder="0.00"
                    autoFocus
                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none border border-slate-100 text-right font-bold"
                  />
                </div>
                {cashAmount >= total && (
                  <div className="flex justify-between text-sm bg-green-50 rounded-xl p-3">
                    <span className="text-green-700 font-medium">Change</span>
                    <span className="font-bold text-green-700">
                      KES {change.toLocaleString("en-KE", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
                {cashTendered && cashAmount < total && (
                  <div className="flex justify-between text-sm bg-red-50 rounded-xl p-3">
                    <span className="text-red-600 font-medium">Remaining</span>
                    <span className="font-bold text-red-600">
                      KES {(total - cashAmount).toLocaleString("en-KE", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
              </div>
            )}

            {paymentMethod === "Card" && (
              <div className="py-4 text-center text-sm text-slate-500">
                <p>Please swipe or tap the customer&apos;s card on the reader.</p>
              </div>
            )}

            {paymentMethod === "M-Pesa" && (
              <div className="space-y-2 text-center py-2">
                <p className="text-sm text-slate-600">
                  Send <span className="font-bold text-slate-900">KES {total.toLocaleString("en-KE", { minimumFractionDigits: 2 })}</span> to:
                </p>
                <p className="text-2xl font-bold text-green-600 tracking-widest">
                  0700 000 001
                </p>
                <p className="text-xs text-slate-400">Duka Store – Business Number</p>
              </div>
            )}

            <button
              onClick={completeSale}
              disabled={paymentMethod === "Cash" && cashAmount < total}
              className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Complete Sale
            </button>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-white border border-green-100 rounded-2xl shadow-2xl p-5 animate-in slide-in-from-bottom-4">
          <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
            <CheckCircle size={22} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">Sale Complete!</p>
            <p className="text-xs text-slate-400">Payment received successfully.</p>
          </div>
        </div>
      )}
    </div>
  );
};
