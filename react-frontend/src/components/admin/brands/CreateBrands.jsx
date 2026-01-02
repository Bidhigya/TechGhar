import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";

const CreateBrands = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const saveBrand = async (data) => {
    setDisable(true);
    try {
      const res = await fetch(apiUrl + "/brands", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()} `,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setDisable(false);

      if (result.status === 200) {
        toast.success("Brand created successfully"); // ✅ global toast will show
        navigate("/admin/brands");
      } else {
        toast.error(result.message || "Something went wrong");
        console.error(result);
      }
    } catch (err) {
      setDisable(false);
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Header */}
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Brands / Create</h4>
          <Link to="/admin/brands" className="link btn btn-primary">
            Back
          </Link>
        </div>

        {/* Sidebar */}
        <div className="col-md-3">
          <Sidebar />
        </div>

        {/* Form */}
        <div className="col-md-9">
          <form onSubmit={handleSubmit(saveBrand)}>
            <div className="card shadow">
              <div className="card-body p-4">
                {/* Brand Name */}
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Name
                  </label>
                  <input
                    {...register("name", {
                      required: "The name field is required",
                    })}
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Brand Name"
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
                  )}
                </div>

                {/* Status */}
                <div className="mb-3">
                  <label htmlFor="" className="form-label">
                    Status
                  </label>
                  <select
                    {...register("status", {
                      required: "Please select a status",
                    })}
                    className={`form-control ${errors.status ? "is-invalid" : ""}`}
                  >
                    <option value="">Select status</option>
                    <option value="1">Active</option>
                    <option value="0">Unactive</option>
                  </select>
                  {errors.status && (
                    <p className="invalid-feedback">{errors.status?.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button disabled={disable} className="btn btn-primary mt-3">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBrands;
