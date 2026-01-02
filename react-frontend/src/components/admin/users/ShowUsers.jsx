import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { adminToken, apiUrl } from "../../common/Http";
import NoState from "../../common/NoState";
import ModalUser from "./ModalUser";
import { toast } from "react-toastify";
import SkeletonTable from "../../common/Loader/SkeletonTable";

const ShowUsers = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    setLoader(true);
    try {
      const res = await fetch(apiUrl + "/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const text = await res.text();  // Read as text first

      let result;
      try {
        result = JSON.parse(text);  // Try to parse JSON
      } catch (jsonError) {
        console.log("Non-JSON response:", text);  // Debug full response
        toast.error("Invalid JSON response: " + (jsonError.message || "Unknown parse error"));
        return;
      }

      if (res.ok) {
        setUsers(result.data || []);
      } else {
        toast.error(result.message || "Failed to load users");
      }
    } catch (error) {
      console.log(error);  // Debug full error
      toast.error("Network error: " + (error.message || "Unknown issue"));
    } finally {
      setLoader(false);
    }
  };

  const deleteUser = async () => {
    try {
      const res = await fetch(`${apiUrl}/users/${selectedUserId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
      });

      const text = await res.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch (jsonError) {
        console.log("Non-JSON response:", text);
        toast.error("Invalid JSON response: " + (jsonError.message || "Unknown parse error"));
        return;
      }

      if (res.ok) {
        setUsers(users.filter((user) => user.id !== selectedUserId));
        toast.success(result.message || "User deleted");
      } else {
        toast.error(result.message || "Delete failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Network error: " + (error.message || "Unknown issue"));
    } finally {
      setShowModal(false);
      setSelectedUserId(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Users</h4>
          <Link to="/admin/users/create" className="link btn btn-primary">
            Create
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <div className="card shadow">
            <div className="card-body p-4">
              {loader && <SkeletonTable />}
              {!loader && users.length === 0 && <NoState text="No users found" />}
              {!loader && users.length > 0 && (
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th width="50">#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th width="100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr key={user.id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {user.role === "admin" ? (
                            <span className="badge text-bg-success">Admin</span>
                          ) : (
                            <span className="badge text-bg-danger">Customer</span>
                          )}
                        </td>
                        <td>
                          <Link
                            to={`/admin/users/edit/${user.id}`}
                            className="link primary-text me-2"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button
                            onClick={() => {
                              setSelectedUserId(user.id);
                              setShowModal(true);
                            }}
                            className="btn btn-link text-danger p-0"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <ModalUser
          button="Delete"
          color="btn-danger"
          onConfirm={deleteUser}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default ShowUsers;