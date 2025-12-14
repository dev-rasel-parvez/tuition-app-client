import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LIMIT = 15;

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const totalPages = Math.ceil(total / LIMIT);

  const loadUsers = async (currentPage = 1) => {
    const res = await axiosSecure.get(
      `/admin/users?page=${currentPage}&limit=${LIMIT}`
    );

    setUsers(res.data.users);
    setTotal(res.data.total);
    setPage(res.data.page);
  };

  useEffect(() => {
    loadUsers(page);
  }, [page]);

  // 🔍 SEARCH (client-side on current page)
  const filteredUsers = users.filter(user =>
    `${user.name} ${user.email} ${user.role} ${user.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ACTIONS
  const handleApprove = async (id) => {
    await axiosSecure.patch(`/admin/approve/${id}`);
    loadUsers(page);
  };

  const handleDisapprove = async (id) => {
    await axiosSecure.patch(`/admin/disapprove/${id}`);
    loadUsers(page);
  };

  const statusBadge = (status) => {
    if (status === "approved") return "badge badge-success";
    if (status === "pending") return "badge badge-warning";
    return "badge badge-error";
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>

        <input
          type="text"
          placeholder="Search name, email, role, status"
          className="input input-bordered w-80"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <table className="table">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.map(user => (
            <tr key={user._id}>
              <td>
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role}</td>
              <td>
                <span className={statusBadge(user.status)}>
                  {user.status}
                </span>
              </td>
              <td className="text-right space-x-2">
                {user.status !== "approved" && (
                  <button
                    onClick={() => handleApprove(user._id)}
                    className="btn btn-xs btn-success"
                  >
                    Approve
                  </button>
                )}

                {user.status === "approved" && (
                  <button
                    onClick={() => handleDisapprove(user._id)}
                    className="btn btn-xs btn-warning"
                  >
                    Disapprove
                  </button>
                )}

                <button className="btn btn-xs">Edit</button>
                <button className="btn btn-xs btn-error">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map(p => (
          <button
            key={p}
            className={`btn btn-sm ${page === p + 1 ? "btn-active" : ""}`}
            onClick={() => setPage(p + 1)}
          >
            {p + 1}
          </button>
        ))}

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserManagement;
