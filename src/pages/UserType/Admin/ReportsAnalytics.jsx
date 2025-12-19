import { useEffect, useMemo, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TransactionFilterModal from "./TransactionFilterModal";
import { FaFilter } from "react-icons/fa";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PAGE_SIZE = 10;

const ReportsAnalytics = () => {
  const axiosSecure = useAxiosSecure();

  const [payments, setPayments] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);
  const [page, setPage] = useState(1);

  // =====================
  // LOAD ALL PAYMENTS
  // =====================
  useEffect(() => {
    axiosSecure.get("/admin/payments").then(res => {
      setPayments(res.data);
    });
  }, []);

  // =====================
  // APPLY FILTERS
  // =====================
  const filteredPayments = useMemo(() => {
    return payments.filter(p => {
      const date = new Date(p.createdAt);

      if (filters.fromDate && date < new Date(filters.fromDate)) return false;
      if (filters.toDate && date > new Date(filters.toDate)) return false;
      if (filters.student && !p.paidBy?.toLowerCase().includes(filters.student.toLowerCase())) return false;
      if (filters.tutor && !p.tutorName?.toLowerCase().includes(filters.tutor.toLowerCase())) return false;
      if (filters.tuitionId && !p.tuitionId?.includes(filters.tuitionId)) return false;
      if (filters.paymentId && !p.paymentIntentId?.includes(filters.paymentId)) return false;

      return true;
    });
  }, [payments, filters]);

  // =====================
  // SORT LATEST FIRST
  // =====================
  const sortedPayments = useMemo(() => {
    return [...filteredPayments].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }, [filteredPayments]);

  // =====================
  // KPI CALCULATIONS
  // =====================
  const totalEarnings = sortedPayments.reduce((sum, p) => sum + p.amount, 0);
  const totalTransactions = sortedPayments.length;
  const avgTransaction =
    totalTransactions === 0 ? 0 : Math.round(totalEarnings / totalTransactions);

  // =====================
  // MONTHLY DATA
  // =====================
  const monthlyData = useMemo(() => {
    const map = {};

    sortedPayments.forEach(p => {
      const d = new Date(p.createdAt);
      const key = `${d.toLocaleString("default", { month: "short" })} ${d.getFullYear()}`;

      if (!map[key]) {
        map[key] = { month: key, earnings: 0, transactions: 0 };
      }

      map[key].earnings += p.amount;
      map[key].transactions += 1;
    });

    return Object.values(map);
  }, [sortedPayments]);

  // =====================
  // PAGINATION
  // =====================
  const totalPages = Math.ceil(sortedPayments.length / PAGE_SIZE);

  const paginatedPayments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedPayments.slice(start, start + PAGE_SIZE);
  }, [sortedPayments, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  // =====================
  // FILTER UI HELPERS
  // =====================
  const removeFilter = key => {
    const updated = { ...filters };
    delete updated[key];
    setFilters(updated);
  };

  const clearAllFilters = () => setFilters({});

  return (
    <div className="p-8 space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold">Reports & Analytics</h2>
        <p className="text-gray-500">Platform financial performance overview</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-green-100 p-6 rounded-xl">
          <p className="text-sm">Total Earnings</p>
          <h3 className="text-3xl font-bold">{totalEarnings} TK</h3>
        </div>
        <div className="bg-blue-100 p-6 rounded-xl">
          <p className="text-sm">Total Transactions</p>
          <h3 className="text-3xl font-bold">{totalTransactions}</h3>
        </div>
        <div className="bg-purple-100 p-6 rounded-xl">
          <p className="text-sm">Avg Transaction</p>
          <h3 className="text-3xl font-bold">{avgTransaction} TK</h3>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-3">Monthly Earnings</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="earnings" fill="#16a34a" /> {/* GREEN */}
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-3">Monthly Transactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="transactions" fill="#16a34a" /> {/* GREEN */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FILTER SUMMARY */}
      {Object.keys(filters).length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {Object.entries(filters).map(([k, v]) => (
            <span
              key={k}
              className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex gap-2 items-center"
            >
              {k}: {v}
              <button onClick={() => removeFilter(k)}>✕</button>
            </span>
          ))}
          <button onClick={clearAllFilters} className="text-red-600 underline text-sm">
            Clear All
          </button>
        </div>
      )}

      {/* TABLE HEADER */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">All Successful Transactions</h3>
        <button className="btn btn-outline" onClick={() => setShowFilter(true)}>
          <FaFilter /> Filter
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white p-6 rounded-xl shadow">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Student</th>
              <th>Tutor</th>
              <th>Tuition ID</th>
              <th>Amount</th>
              <th>Payment ID</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPayments.map(p => (
              <tr key={p._id}>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td>{p.paidBy}</td>
                <td>{p.tutorName}</td>
                <td>{p.tuitionId}</td>
                <td className="font-semibold">{p.amount} TK</td>
                <td className="text-xs">{p.paymentIntentId}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(totalPages).keys()].map(i => (
              <button
                key={i}
                className={`btn btn-sm ${page === i + 1 ? "btn-primary" : "btn-outline"}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* FILTER MODAL */}
      {showFilter && (
        <TransactionFilterModal
          filters={filters}
          setFilters={setFilters}
          close={() => setShowFilter(false)}
        />
      )}
    </div>
  );
};

export default ReportsAnalytics;
