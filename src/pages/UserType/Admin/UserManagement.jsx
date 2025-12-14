import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const LIMIT = 15;

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  // EDIT MODAL STATE
  const [editingUser, setEditingUser] = useState(null);

  const totalPages = Math.ceil(total / LIMIT);

  // =========================
  // LOAD USERS
  // =========================
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

  // =========================
  // SEARCH (CLIENT SIDE)
  // =========================
  const filteredUsers = users.filter(user =>
    `${user.name} ${user.email} ${user.role} ${user.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // =========================
  // CONFIRM HELPERS
  // =========================
  const confirmAction = async (title, text) => {
    const res = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    return res.isConfirmed;
  };

  // =========================
  // ACTIONS
  // =========================
  const handleApprove = async (id) => {
    if (!(await confirmAction("Approve user?", "This user will be approved")))
      return;

    await axiosSecure.patch(`/admin/approve/${id}`);
    loadUsers(page);
  };

  const handleDisapprove = async (id) => {
    if (
      !(await confirmAction(
        "Disapprove user?",
        "This user will lose access"
      ))
    )
      return;

    await axiosSecure.patch(`/admin/user/${id}`, {
      status: "pending",
    });
    loadUsers(page);
  };

  const handleDelete = async (id) => {
    if (
      !(await confirmAction(
        "Delete user?",
        "This action cannot be undone"
      ))
    )
      return;

    await axiosSecure.delete(`/admin/user/${id}`);
    loadUsers(page);
  };

  // =========================
  // EDIT SAVE
  // =========================
  const handleEditSave = async () => {
    await axiosSecure.patch(`/admin/user/${editingUser._id}`, {
      name: editingUser.name,
      email: editingUser.email,
      role: editingUser.role,
      status: editingUser.status,
    });

    Swal.fire("Updated!", "User updated successfully", "success");
    setEditingUser(null);
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
  <div className="flex items-center gap-3">
    <h2 className="text-2xl font-bold">User Management</h2>

    <span className="badge badge-neutral badge-lg">
      Total: {total}
    </span>
  </div>

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

                <button
                  onClick={() => setEditingUser({ ...user })}
                  className="btn btn-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(user._id)}
                  className="btn btn-xs btn-error"
                >
                  Delete
                </button>
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

      {/* EDIT MODAL */}
      {editingUser && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Edit User</h3>

            <input
              className="input input-bordered w-full mb-2"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            <input
              className="input input-bordered w-full mb-2"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />

            <select
              className="select select-bordered w-full mb-2"
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
            >
              <option value="admin">Admin</option>
              <option value="tutor">Tutor</option>
              <option value="student">Student</option>
            </select>

            <select
              className="select select-bordered w-full"
              value={editingUser.status}
              onChange={(e) =>
                setEditingUser({ ...editingUser, status: e.target.value })
              }
            >
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => setEditingUser(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-success"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
