import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "./context/Cart";
import Aos from "aos";
import { toast } from "react-toastify";
import { apiUrl, userToken } from "./common/Http";

const Cart = () => {
  const {
    cartData,
    grandTotal,
    subTotal,
    shipping,
    updateCartItem,
    deleteCartItem,
  } = useContext(CartContext);
  const [qty, setQty] = useState({});
  const navigate = useNavigate();
const handleQtyChange = (e, item) => {
  let value = e.target.value;

  // allow empty while typing
  if (value === "") {
    setQty(prev => ({ ...prev, [item.id]: "" }));
    return;
  }

  value = parseInt(value, 10);
  if (isNaN(value)) return;

  const stock = item.stock ?? 0;
  const maxQty = Math.min(stock, 10);

  // lower bound
  if (value < 1) value = 1;

  // upper bound + toast
  if (value > maxQty) {
    if (stock === 0) {
      toast.error("This item is out of stock");
    } else if (stock <= 10) {
      toast.info(`Cannot set quantity greater than available stock. Only ${stock} available.`);
    } else {
      toast.warning("Maximum 10 items allowed");
    }
    value = maxQty;
  }

  setQty(prev => ({ ...prev, [item.id]: value }));
  updateCartItem(item.id, value);
};

const handleQtyKeyDown = (e, item) => {
  const stock = item.stock ?? 0;
  const maxQty = Math.min(stock, 10);
  const currentQty = qty[item.id] ?? item.qty;

  if (e.key === "ArrowUp" && currentQty >= maxQty) {
    toast.info(`Only ${stock} items left`);
    e.preventDefault();
  }

  if (e.key === "ArrowDown" && currentQty <= 1) {
    e.preventDefault();
  }
};



  const handleCheckout = () => {
    const items = cartData.map(item => ({
      product_id: item.product_id,
      qty: qty[item.id] || item.qty
    }));
    fetch(apiUrl + "/validate-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${userToken()}`,
      },
      body: JSON.stringify({ items }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.status === 200) {
          navigate('/checkout');
        } else {
          result.errors.forEach(error => {
            toast.error(error.message);
          });
        }
      })
      .catch((error) => {
        console.error("Error validating cart:", error);
        toast.error("Something went wrong. Please try again.");
      });
  };
  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);
  return (
    <div className="container ">
      <div className="row  ">
        <div className="col-md-12">
          <nav aria-label="breadcrumb mt-2" data-aos="fade-right">
            <li
              className="breadcrumb py-4 d-flex "
              style={{ listStyle: "none" }}
            >
              <li className="breadcrumb-item">
                <Link to={"/"}>Home</Link>
              </li>

              <li className="breadcrumb-item active" aria-current="page">
                Cart
              </li>
            </li>
          </nav>
        </div>
      </div>
      <div className="row d-flex ">
        <div
          className="col-md-8 mb-2 p-4 motion-preset-slide-right motion-delay-500"
          data-aos="fade-right"
        >
          <h2 className="border-bottom pb-3">Cart</h2>

          <table className="table">
            <tbody>
              {cartData.length == 0 && (
                <tr
                  align="center"
                  valign="middle"
                  style={{ height: 200 }}
                  className=" "
                >
                  <td colSpan={4}>Your Cart is Empty</td>
                </tr>
              )}
              {cartData &&
                cartData.map((item) => (
                  <tr key={`cart-${item.id}`}>
                    <td width={100}>
                      <img src={item.image_url} width={90} alt="" />
                    </td>
                    <td width={600}>
                      <h4>{item.title}</h4>
                      <div className="d-flex align-items-center pt-3">
                        <span>Rs.{item.price}</span>
                        <div className="ps-3">
                          {item.port && (
                            <button className="btn btn-size">
                              {item.port}
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                    <td valign="middle">
<input
  type="number"
  min={1}
  max={Math.min(item.stock ?? 10, 10)}
  value={qty[item.id] ?? item.qty}
  className="form-control"
  style={{ width: "100px" }}
  onChange={(e) => handleQtyChange(e, item)}
  onKeyDown={(e) => handleQtyKeyDown(e, item)}
/>


                    </td>
                    <td valign="middle">
                      <button
                        className="bg-white "
                        style={{ outline: "none", border: "none" }}
                        onClick={() => deleteCartItem(item.id)}
                      >
                        <i className="bi bi-trash text-danger "></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {/* <div className="row  justify-content-end "> */}

          {/* </div> */}
        </div>

        {cartData.length > 0 && (
          <div
            className="col-md-4 mb-2 p-4 mt-5  motion-preset-slide-left motion-delay-500"
            data-aos="fade-left"
          >
            <div className="border   p-4">
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
                <div>
                  {" "}
                  <strong>Grand Total</strong>
                </div>
                <div>Rs.{grandTotal()}</div>
              </div>

              <div className="d-flex justify-content-end py-3">
               <button onClick={handleCheckout} className="btn btn-primary">Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;