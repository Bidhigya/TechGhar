import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { toast } from "react-toastify";

const EditPort = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch existing port
  useEffect(() => {
    const fetchPort = async () => {
      try {
        const res = await fetch(`${apiUrl}/ports/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });
        const result = await res.json();

        if (result.status === 200) {
          reset({
            name: result.data.name,
            status: result.data.status?.toString(),
          });
        } else {
          toast.error("Failed to load color");
        }
      } catch (error) {
        toast.error("Network error");
      }
    };

    fetchPort();
  }, [id, reset]);

  const updatePort = async (data) => {
    setDisable(true);
    try {
      const res = await fetch(`${apiUrl}/ports/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.status === 200) {
        toast.success(result.message || "Color updated successfully");
        navigate("/admin/colors");
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
          <h4 className="h4 pb-0 mb-0">Colors / Edit</h4>
          <Link to="/admin/colors" className="link btn btn-primary">
            Back
          </Link>
        </div>

        <div className="col-md-3">
          <Sidebar />
        </div>

        <div className="col-md-9">
          <form onSubmit={handleSubmit(updatePort)}>
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
                    placeholder="Port Name"
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
                  )}
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

export default EditPort;