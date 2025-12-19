import { useEffect, useMemo, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const RevenueHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [approvedApps, setApprovedApps] = useState([]);

  // -----------------------------
  // LOAD DATA
  // -----------------------------
  const loadRevenue = async () => {
    const res = await axiosSecure.get("/tutor/my-applications");

    const approved = res.data.filter(
      app => app.status === "approved"
    );

    setApprovedApps(approved);
  };

  useEffect(() => {
    loadRevenue();
  }, []);

  // -----------------------------
  // TOTAL REVENUE
  // -----------------------------
  const totalRevenue = useMemo(() => {
    return approvedApps.reduce(
      (sum, app) => sum + Number(app.tutor.expectedSalary || 0),
      0
    );
  }, [approvedApps]);

  // -----------------------------
  // MONTHLY GROUPING
  // -----------------------------
  const monthlyRevenue = useMemo(() => {
    const map = {};

    approvedApps.forEach(app => {
      const date = new Date(app.paidAt || app.createdAt);
      const monthKey = date.toLocaleString("default", {
        month: "short",
        year: "numeric",
      });

      const salary = Number(app.tutor.expectedSalary || 0);

      map[monthKey] = (map[monthKey] || 0) + salary;
    });

    return Object.entries(map).map(([month, revenue]) => ({
      month,
      revenue,
    }));
  }, [approvedApps]);

  return (
    <div className="p-8">
      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-2">
        Revenue History
      </h2>

      <p className="text-gray-600 mb-6">
        Overview of your earnings from approved tuitions
      </p>

      {/* TOTAL REVENUE */}
      <div className="bg-green-100 text-green-800 p-6 rounded-xl mb-8">
        <h3 className="text-lg font-semibold">
          Total Revenue
        </h3>
        <p className="text-3xl font-bold mt-2">
          {totalRevenue} TK
        </p>
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h3 className="text-xl font-semibold mb-4">
          Monthly Revenue
        </h3>

        {monthlyRevenue.length === 0 ? (
          <p className="text-gray-500">
            No revenue data available.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22c55e" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* OPTIONAL LIST */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">
          Approved Tuition Payments
        </h3>

        {approvedApps.length === 0 ? (
          <p className="text-gray-500">No records found.</p>
        ) : (
          <table className="table w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Tuition Id</th>
                <th>Subject</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {approvedApps.map(app => (
                <tr key={app._id}>
                  <td>
                    {new Date(
                      app.paidAt || app.createdAt
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {app.tuition?.tuitionId || "N/A"}
                  </td>
                  <td>
                    {app.tuition?.subjects || "N/A"}
                  </td>
                  <td className="font-semibold">
                    {app.tutor.expectedSalary} TK
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RevenueHistory;
