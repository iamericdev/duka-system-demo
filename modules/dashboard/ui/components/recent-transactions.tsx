import { Eye, User } from 'lucide-react';

const transactions = [
  { id: 'INV_000117', customer: 'Walk-In Customer', amount: 'QR 36.53', items: 3, payment: 'Credit Card', date: '20/05/2025', time: '07:06 PM', status: 'Paid' },
  { id: 'INV_000116', customer: 'Walk-In Customer', amount: 'QR 36.53', items: 3, payment: 'Cash', date: '20/05/2025', time: '07:06 PM', status: 'On-Hold' },
  { id: 'INV_000115', customer: 'Walk-In Customer', amount: 'QR 36.53', items: 3, payment: 'Debit Card', date: '20/05/2025', time: '07:06 PM', status: 'Returned' },
  { id: 'INV_000114', customer: 'Walk-In Customer', amount: 'QR 36.53', items: 3, payment: 'Store Credit', date: '20/05/2025', time: '07:06 PM', status: 'Paid' },
  { id: 'INV_000113', customer: 'Walk-In Customer', amount: 'QR 36.53', items: 3, payment: 'Credit Card', date: '20/05/2025', time: '07:06 PM', status: 'Paid' },
];

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Paid': 'bg-green-50 text-green-600',
    'On-Hold': 'bg-orange-50 text-orange-600',
    'Returned': 'bg-red-50 text-red-600',
  };
  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status}
    </span>
  );
};

export const RecentTransactions = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900">Recent Transactions</h3>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600">
          +5.00 %
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-50">
              <th className="pb-4 text-xs font-medium text-slate-400">Invoice</th>
              <th className="pb-4 text-xs font-medium text-slate-400">Customer</th>
              <th className="pb-4 text-xs font-medium text-slate-400">Amount</th>
              <th className="pb-4 text-xs font-medium text-slate-400">Payment</th>
              <th className="pb-4 text-xs font-medium text-slate-400">Date</th>
              <th className="pb-4 text-xs font-medium text-slate-400">Status</th>
              <th className="pb-4 text-xs font-medium text-slate-400"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.map((tx, idx) => (
              <tr key={idx} className="group hover:bg-slate-50/50 transition-colors">
                <td className="py-4 text-sm font-medium text-slate-900">{tx.id}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                      <User size={16} />
                    </div>
                    <span className="text-sm font-bold text-slate-900">{tx.customer}</span>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{tx.amount}</span>
                    <span className="text-[10px] text-slate-400">{tx.items} Items</span>
                  </div>
                </td>
                <td className="py-4 text-sm text-slate-600">{tx.payment}</td>
                <td className="py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-900">{tx.date}</span>
                    <span className="text-[10px] text-slate-400">{tx.time}</span>
                  </div>
                </td>
                <td className="py-4">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="py-4 text-right">
                  <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
