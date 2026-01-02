import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const [disable, setDisable] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const changePassword = async (data) => {
    setDisable(true);
    try {
      const res = await fetch(`${apiUrl}/change-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success(result.message || "Password changed successfully");
        reset();
      } else {
        const errorMsg = result.message || result.errors?.current_password?.[0] || "Change failed";
        toast.error(errorMsg);
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
          <h4 className="h4 pb-0 mb-0">Change Password</h4>
          <Link to="/admin/dashboard" className="link btn btn-primary">
            Back
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <form onSubmit={handleSubmit(changePassword)}>
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label">Current Password</label>
                  <input
                    {...register("current_password", {
                      required: "The current password field is required",
                    })}
                    type="password"
                    className={`form-control ${errors.current_password && "is-invalid"}`}
                    placeholder="Current Password"
                  />
                  {errors.current_password && (
                    <p className="invalid-feedback">{errors.current_password.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">New Password</label>
                  <input
                    {...register("password", {
                      required: "The new password field is required",
                    })}
                    type="password"
                    className={`form-control ${errors.password && "is-invalid"}`}
                    placeholder="New Password"
                  />
                  {errors.password && (
                    <p className="invalid-feedback">{errors.password.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    {...register("password_confirmation", {
                      required: "The confirm new password field is required",
                    })}
                    type="password"
                    className={`form-control ${errors.password_confirmation && "is-invalid"}`}
                    placeholder="Confirm New Password"
                  />
                  {errors.password_confirmation && (
                    <p className="invalid-feedback">{errors.password_confirmation.message}</p>
                  )}
                </div>
              </div>
            </div>
            <button disabled={disable} className="btn btn-primary mt-3 mb-3">
              {disable ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;