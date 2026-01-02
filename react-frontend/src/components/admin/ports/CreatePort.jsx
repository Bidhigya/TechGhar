import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";

const CreatePort = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const savePort = async (data) => {
    setDisable(true);
    try {
      const res = await fetch(apiUrl + "/ports", {
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
      toast.success(result.message || "Color created successfully");
      navigate("/admin/colors");
    } else {
      // Laravel validation errors come here
      const errorMsg = result.message || "Validation failed";
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
          <h4 className="h4 pb-0 mb-0">Colors / Create</h4>
          <Link to="/admin/colors" className="link btn btn-primary">
            Back
          </Link>
        </div>

        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9">
          <form onSubmit={handleSubmit(savePort)}>
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    {...register("name", {
                      required: "The name field is required",
                    })}
                    type="text"
                    className={`form-control ${errors.name && "is-invalid"}`}
                    placeholder="Color Name"
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
                  )}
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

export default CreatePort;