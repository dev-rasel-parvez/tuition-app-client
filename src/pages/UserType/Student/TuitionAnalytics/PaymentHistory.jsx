import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axiosSecure.get(`/payments?page=${page}`).then(res => {
      setPayments(res.data.payments);
      setTotal(res.data.total);
    });
  }, [page]);

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Payment History</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Date</th>
            <th>Hire Tutor</th>
            <th>Amount</th>
            <th>Payment ID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p._id}>
              <td>{new Date(p.createdAt).toLocaleDateString()}</td>
              <td>{p.tutorName}</td>
              <td>{p.amount} TK</td>
              <td className="text-xs">{p.paymentIntentId}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex gap-2 mt-4">
        {[...Array(Math.ceil(total / 10)).keys()].map(i => (
          <button
            key={i}
            className={`btn btn-sm ${page === i + 1 ? "btn-primary" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
