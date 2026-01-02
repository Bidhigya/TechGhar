import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { apiUrl, userToken } from "./common/Http";
import { CartContext } from "./context/Cart";

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { cartData, subTotal, grandTotal, shipping, setCartData } = useContext(CartContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      const res = await fetch(apiUrl + "/get-profile-details", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
      });
      const result = await res.json();
      if (result.status === 200) {
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
    },
  });

  const handlePaymentMethod = (e) => {
    setPaymentMethod(e.target.value);
  };

  const processOrder = async (data) => {
    setLoading(true);
    if (paymentMethod === "cod") {
      saveOrder(data, "not_paid");
    }
  };

  const saveOrder = async (formData, paymentStatus) => {
    const newFormData = {
      ...formData,
      grand_total: grandTotal(),
      sub_total: subTotal(),
      shipping: shipping(),
      discount: 0,
      payment_status: paymentStatus,
      payment_method: paymentMethod,
      status: "pending",
      cart: cartData,
    };

    const res = await fetch(apiUrl + "/save-order", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()} `,
      },
      body: JSON.stringify(newFormData),
    });
    const result = await res.json();

    setLoading(false);
    if (result.status === 200) {
      localStorage.removeItem("cart");
      setCartData([]);
      navigate("/success-message/" + result.id);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="container pb-5">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb mt-3">
              <li className="breadcrumb py-4 d-flex gap-1" style={{ listStyle: "none" }}>
                <li className="breadcrumb-item">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Checkout
                </li>
              </li>
            </nav>
          </div>
        </div>

        <form onSubmit={handleSubmit(processOrder)}>
          <div className="row">
            {/* Billing Section */}
            <div className="col-md-7">
              <h3 className="border-bottom pb-3">
                <strong>Billing Details</strong>
              </h3>

              <div className="card motion-preset-slide-right motion-delay-500">
                <div className="card-body">
                  <div className="row pt-3">
                    <div className="col-md-6 mb-3">
                      <input
                        {...register("name", { required: "The name field is required" })}
                        type="text"
                        className={`form-control ${errors.name && "is-invalid"}`}
                        placeholder="Enter Your Name"
                      />
                      {errors.name && <p className="invalid-feedback">{errors.name?.message}</p>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        {...register("email", {
                          required: "The email field is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        })}
                        type="text"
                        className={`form-control ${errors.email && "is-invalid"}`}
                        placeholder="Enter Your Email"
                      />
                      {errors.email && <p className="invalid-feedback">{errors.email?.message}</p>}
                    </div>

                    <div className="mb-3">
                      <textarea
                        {...register("address", { required: "The address field is required" })}
                        rows={3}
                        className={`form-control ${errors.address && "is-invalid"}`}
                        placeholder="Enter Your Address"
                      ></textarea>
                      {errors.address && <p className="invalid-feedback">{errors.address?.message}</p>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        {...register("city", { required: "The city field is required" })}
                        type="text"
                        className={`form-control ${errors.city && "is-invalid"}`}
                        placeholder="Enter Your City"
                      />
                      {errors.city && <p className="invalid-feedback">{errors.city?.message}</p>}
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        {...register("state", { required: "The state field is required" })}
                        type="text"
                        className={`form-control ${errors.state && "is-invalid"}`}
                        placeholder="Enter Your State"
                      />
                      {errors.state && <p className="invalid-feedback">{errors.state?.message}</p>}
                    </div>

                    {/* Zip code: positive integer > 0 */}
                    <div className="col-md-6 mb-3">
                      <input
                        {...register("zip", {
                          required: "The zip field is required",
                          pattern: {
                            value: /^[1-9][0-9]*$/, // positive integer > 0
                            message: "Zip code must be a number greater than 0",
                          },
                        })}
                        type="text"
                        className={`form-control ${errors.zip && "is-invalid"}`}
                        placeholder="Enter Your Zip Code"
                      />
                      {errors.zip && <p className="invalid-feedback">{errors.zip?.message}</p>}
                    </div>

                    {/* Mobile: exactly 10 digits */}
                    <div className="col-md-6 mb-3">
                      <input
                        {...register("mobile", {
                          required: "The mobile field is required",
                          pattern: {
                            value: /^\d{10}$/, // exactly 10 digits
                            message: "Mobile number must be exactly 10 digits",
                          },
                        })}
                        type="text"
                        className={`form-control ${errors.mobile && "is-invalid"}`}
                        placeholder="Enter Your Phone"
                      />
                      {errors.mobile && <p className="invalid-feedback">{errors.mobile?.message}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-md-5">
              <h3 className="border-bottom pb-3">
                <strong>Items</strong>
              </h3>

              <table className="table motion-preset-slide-down motion-delay-500">
                <tbody>
                  {cartData &&
                    cartData.map((item) => (
                      <tr key={`cart-${item.id}`}>
                        <td width={100}>
                          <img src={item.image_url} width={90} alt="product" />
                        </td>
                        <td width={600}>
                          <h4>{item.title}</h4>
                          <div className="d-flex align-items-center pt-3">
                            <span>Rs.{item.price}</span>
                            {item.port && (
                              <button className="btn btn-size ms-2">{item.port}</button>
                            )}
                            <div className="ps-5">X {item.qty}</div>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              <div className="p-4 motion-preset-slide-up motion-delay-500">
                <div className="mb-3 d-flex h3">
                  <strong>Proceed To Checkout</strong>
                </div>

                <div className="d-flex justify-content-between border-bottom pb-2">
                  <div>SubTotal</div>
                  <div>Rs.{subTotal()}</div>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <div>Shipping</div>
                  <div>Rs.{shipping()}</div>
                </div>
                <div className="d-flex justify-content-between border-bottom py-2">
                  <strong>Grand Total</strong>
                  <div>Rs.{grandTotal()}</div>
                </div>

                <h3 className="border-bottom pt-4 pb-3">
                  <strong>Payment Method</strong>
                </h3>

                <div>
                  <input
                    type="radio"
                    onClick={handlePaymentMethod}
                    checked={paymentMethod === "cod"}
                    value="cod"
                    id="cod-check"
                  />
                  <label htmlFor="cod-check" className="ps-2">
                    Cash on Delivery (COD)
                  </label>
                </div>

                <div className="d-flex py-3">
                  <button disabled={loading} className="btn btn-primary w-100">
                    {loading ? "Processing..." : "Place Order"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckoutForm;
