import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";

const CreateUser = () => {
 const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveUser = async (data) => {
    console.log("Form Data:", data);
    setDisable(true);
    try {
      const res = await fetch(apiUrl + "/users", {  // FIXED: Changed to "/users" (matches your Laravel routes)
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
        toast.success(result.message || "User created successfully");
        navigate("/admin/users");
      } else {
        // Laravel validation errors come here
        const errorMsg = result.message || "Validation failed";
        toast.error(errorMsg);
      }
    } catch (error) {
      toast.error("Network error: " + error.message);  // FIXED: Show detailed error
    } finally {
      setDisable(false);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Users / Create</h4>
          <Link to="/admin/users" className="link btn btn-primary">
            Back
          </Link>
        </div>
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          <form onSubmit={handleSubmit(saveUser)}>
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
                    className={`form-control ${errors.name && "is-invalid"}`}
                    placeholder="User Name"
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
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
                    className={`form-control ${errors.email && "is-invalid"}`}
                    placeholder="User Email"
                  />
                  {errors.email && (
                    <p className="invalid-feedback">{errors.email.message}</p>
                  )}
                </div>
                </div>
             </div>
                <div className="row">
                    <div className="col-md-6">
                    <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    {...register("password", {
                      required: "The password field is required",
                    })}
                    type="password"
                    className={`form-control ${errors.password && "is-invalid"}`}
                    placeholder="Password"
                  />
                  {errors.password && (
                    <p className="invalid-feedback">{errors.password.message}</p>
                  )}
                </div>
                </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                  <label className="form-label">Confirm Password</label>
                  <input
                    {...register("password_confirmation", {
                      required: "The confirm password field is required",
                    })}
                    type="password"
                    className={`form-control ${errors.password_confirmation && "is-invalid"}`}
                    placeholder="Confirm Password"
                  />
                  {errors.password_confirmation && (
                    <p className="invalid-feedback">{errors.password_confirmation.message}</p>
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
                    className={`form-control ${errors.role && "is-invalid"}`}
                  >
                    <option value="">Select role</option>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                  {errors.role && (
                    <p className="invalid-feedback">{errors.role.message}</p>
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
              {disable ? "Creating..." : "Create"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;