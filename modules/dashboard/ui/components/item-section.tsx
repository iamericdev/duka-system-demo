import React from "react";

interface Item {
  name: string;
  sold: number;
  profit?: string;
  stock?: string;
  image: string;
}

interface ItemSectionProps {
  title: string;
  dotColor: string;
  items: Item[];
  type: "top" | "low" | "out";
}

const ItemRow: React.FC<{ item: Item; type: "top" | "low" | "out" }> = ({
  item,
  type,
}) => (
  <div className="flex items-center gap-4 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={item.image}
      alt={item.name}
      className="w-10 h-10 rounded-lg object-cover"
      referrerPolicy="no-referrer"
    />
    <div className="flex-1">
      <p className="text-sm font-bold text-slate-900">{item.name}</p>
      <div className="flex items-center gap-1 text-[10px] text-slate-400">
        <span>{item.sold} Sold</span>
        <span>•</span>
        {type === "top" && (
          <span>
            Profit{" "}
            <span className="font-bold text-slate-900">{item.profit}</span> QAR
          </span>
        )}
        {type === "low" && (
          <span>
            <span className="font-bold text-slate-900">{item.stock}</span> left
          </span>
        )}
        {type === "out" && (
          <span className="text-red-500 font-bold">{item.stock} left</span>
        )}
      </div>
    </div>
  </div>
);

export const ItemSection = ({
  title,
  dotColor,
  items,
  type,
}: ItemSectionProps) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dotColor}`}></div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        <button className="text-xs font-bold text-orange-600 hover:underline">
          View all
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <ItemRow key={idx} item={item} type={type} />
        ))}
      </div>
    </div>
  );
};
