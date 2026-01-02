import React, { useState } from "react";

import { Link } from "react-router-dom";
import UserSidebar from "../common/UserSidebar";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "../common/Http";
import { toast } from "react-toastify";
import Loader from "../common/Loader/Loader";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      fetch(apiUrl + "/get-profile-details", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.status === 200) {
            setLoading(false);
            reset({
              name: result.data.name,
              email: result.data.email,
              phone: result.data.phone,
              address: result.data.address,
              city: result.data.city,
              state: result.data.state,
              zip: result.data.zip,
              mobile: result.data.mobile,
            });
          }
        });
    },
  });
  const updateAccount = async (data) => {
    fetch(apiUrl + "/update-profile", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
          const formErrors = result.message;
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: formErrors[field][0] });
          });
        }
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Profile</h4>
          {/* <Link to='/admin/categories' className="link btn btn-primary">Back</Link> */}
        </div>
        <div className="col-md-3">
          <UserSidebar />
        </div>
        <div className="col-md-9">
          {loading == true && <Loader />}
          {loading == false && (
            <form onSubmit={handleSubmit(updateAccount)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Name</label>
                      <input
                        {...register("name", {
                          required: "Name field is required",
                        })}
                        type="text"
                        name="name"
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
                        placeholder="Enter Name"
                      />
                      {errors.name && (
                        <p className="text-danger">{errors.name?.message}</p>
                      )}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Email</label>
                      <input
                        {...register("email", {
                          required: "Email field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        type="text"
                        name="email"
                        className={`form-control ${
                          errors.email && "is-invalid"
                        }`}
                        placeholder="Enter email"
                      />
                      {errors.email && (
                        <p className="text-danger">{errors.email?.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="mb-3 ">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <textarea
                        {...register("address", {
                          required: "Address field is required",
                        })}
                        name="address"
                        id="address"
                        className={`form-control ${
                          errors.address && "is-invalid"
                        }`}
                        placeholder="Enter Address"
                      ></textarea>
                      {errors.address && (
                        <p className="text-danger">{errors.address?.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Mobile</label>
                      <input
                        {...register("mobile", {
                          required: "Mobile field is required",
                          minLength: {
                            value: 10,
                            message: "Mobile number must be at least 10 digits",
                          },
                          maxLength: {
                            value: 10,
                            message: "Mobile number cannot exceed 10 digits",
                          },
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "Only numbers are allowed",
                          },
                        })}
                        type="text"
                        name="mobile"
                        className={`form-control ${
                          errors.mobile ? "is-invalid" : ""
                        }`}
                        placeholder="Enter Mobile"
                      />
                      {errors.mobile && (
                        <p className="text-danger">{errors.mobile.message}</p>
                      )}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">City</label>
                      <input
                        {...register("city", {
                          required: "City field is required",
                        })}
                        type="text"
                        name="city"
                        className={`form-control ${
                          errors.city && "is-invalid"
                        }`}
                        placeholder="Enter City"
                      />
                      {errors.city && (
                        <p className="text-danger">{errors.city?.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label className="form-label">State</label>
                      <input
                        {...register("state", {
                          required: "State field is required",
                        })}
                        type="text"
                        name="state"
                        className={`form-control ${
                          errors.state && "is-invalid"
                        } `}
                        placeholder="Enter State"
                      />
                      {errors.state && (
                        <p className="text-danger">{errors.state?.message}</p>
                      )}
                    </div>
                    <div className="mb-3 col-md-6">
                      <label className="form-label">Zip</label>
                      <input
                        {...register("zip", {
                          required: "Zip field is required",
                        })}
                        type="text"
                        name="zip"
                        className={`form-control ${errors.zip && "is-invalid"}`}
                        placeholder="Enter Zip"
                      />
                      {errors.zip && (
                        <p className="text-danger">{errors.zip?.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-4 mb-5">Update</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
