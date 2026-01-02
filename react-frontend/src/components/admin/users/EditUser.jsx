import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";

const EditUser = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });
        const result = await res.json();
        if (res.ok) {
          reset(result.data);
        } else {
          toast.error("Failed to load user");
        }
      } catch (error) {
        toast.error("Network error");
      }
    };
    fetchUser();
  }, [id, reset]);

  const updateUser = async (data) => {
    setDisable(true);
    try {
      const res = await fetch(`${apiUrl}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success(result.message || "User updated successfully");
        navigate("/admin/users");
      } else {
        toast.error(result.message || "Update failed");
      }
    } catch (error) {
      toast.error("Network error");
    } finally {
      setDisable(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Users / Edit</h4>
          <Link to="/admin/users" className="link btn btn-primary">
            Back
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <form onSubmit={handleSubmit(updateUser)}>
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        {...register("name", {
                          required: "The name field is required",
                        })}
                        type="text"
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
                        placeholder="User Name"
                      />
                      {errors.name && (
                        <p className="invalid-feedback">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        {...register("email", {
                          required: "The email field is required",
                        })}
                        type="email"
                        className={`form-control ${
                          errors.email && "is-invalid"
                        }`}
                        placeholder="User Email"
                      />
                      {errors.email && (
                        <p className="invalid-feedback">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Role</label>
                      <select
                        {...register("role", {
                          required: "Please select a role",
                        })}
                        className={`form-control ${
                          errors.role && "is-invalid"
                        }`}
                      >
                        <option value="">Select role</option>
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                      {errors.role && (
                        <p className="invalid-feedback">
                          {errors.role.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input
                        {...register("address")}
                        type="text"
                        className="form-control"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Mobile</label>
                      <input
                        {...register("mobile")}
                        type="text"
                        className="form-control"
                        placeholder="Mobile"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input
                        {...register("city")}
                        type="text"
                        className="form-control"
                        placeholder="City"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">Zip</label>
                      <input
                        {...register("zip")}
                        type="text"
                        className="form-control"
                        placeholder="Zip"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="form-label">State</label>
                      <input
                        {...register("state")}
                        type="text"
                        className="form-control"
                        placeholder="State"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button disabled={disable} className="btn btn-primary mt-3">
              {disable ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
