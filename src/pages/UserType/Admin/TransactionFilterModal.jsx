import { FaTimes } from "react-icons/fa";

const TransactionFilterModal = ({ filters, setFilters, close }) => {
  const handleChange = e => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 relative">
        <button onClick={close} className="absolute top-4 right-4">
          <FaTimes />
        </button>

        <h3 className="text-xl font-bold mb-4">
          Filter Transactions
        </h3>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="fromDate"
            className="input input-bordered"
            onChange={handleChange}
            placeholder="From date"
          />
          <input
            type="date"
            name="toDate"
            className="input input-bordered"
            onChange={handleChange}
            placeholder="To date"
          />

          <input
            name="student"
            placeholder="Student email"
            className="input input-bordered col-span-2"
            onChange={handleChange}
          />

          <input
            name="tutor"
            placeholder="Tutor name"
            className="input input-bordered"
            onChange={handleChange}
          />

          <input
            name="tuitionId"
            placeholder="Tuition ID"
            className="input input-bordered"
            onChange={handleChange}
          />

          <input
            name="paymentId"
            placeholder="Payment ID"
            className="input input-bordered col-span-2"
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionFilterModal;
