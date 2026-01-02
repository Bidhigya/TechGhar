import React, { useEffect, useState } from "react";
import UserSidebar from "../common/UserSidebar";
import { useParams } from "react-router-dom";
import { apiUrl, userToken } from "../common/Http";
import Loader from "../common/Loader/Loader";

const OrderDetail = () => {
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
     const [loader, setLoader] = useState(false);
     const params = useParams();

  

 
    const fetchOrders = async () => {
      try {
        setLoader(true);
        const res = await fetch(apiUrl + "/get-order-details/" + params.id, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${userToken()} `,
          },
        });
    
        const result = await res.json();
        console.log("API Response:", result); // ✅ Debugging
    
        if (res.ok && result.status === 200) {
          setOrder(result.data);
          setItems(result.data.items);
        
        } else {
          console.error("API Error:", result);
          toast.error(result.message || "Something went wrong");
        }
      } catch (error) {
        console.error("Fetch Orders Error:", error);
        toast.error("Something went wrong while fetching the order.");
      } finally {
        setLoader(false);
      }
    };
    

    
    
         useEffect(() => {
           fetchOrders();
          
         }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-between mt-5 pb-3">
          <h4 className="h4 pb-0 mb-0">Order Detail</h4>
          {/* <Link to='/admin/categories' className="link btn btn-primary">Back</Link> */}
        </div>
        <div className="col-md-3">
          <UserSidebar />
        </div>
        <div className="col-md-9">
          <div className="card shadow mb-5">
            <div className="card-body p-4">
              {loader == true && <Loader />}

              {loader == false && (
                <div>
                  <div className="row">
                    <div className="col-md-4">
                      <h3>Order Id: {order.id}</h3>
                      <div className="mt-2">
                        {order.status === "pending" && (
                          <span className="badge bg-warning">Pending</span>
                        )}
                        {order.status === "shipped" && (
                          <span className="badge bg-success">Shipped</span>
                        )}
                        {order.status === "delivered" && (
                          <span className="badge bg-success">Delivered</span>
                        )}
                        {order.status === "cancelled" && (
                          <span className="badge bg-danger">Cancelled</span>
                        )}
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-secondary fw-bold">Date</div>
                      <h4 className="pt-2">{order.created_at}</h4>
                    </div>
                    <div className="col-md-4">
                      <div className="text-secondary">Payment Status</div>
                      <h4 className="pt-2">
                        {order.payment_status == "paid" ? (
                          <span className="badge bg-success">Paid</span>
                        ) : (
                          <span className="badge bg-danger">Not paid</span>
                        )}
                      </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="py-5">
                        <strong>{order.name}</strong>
                        <div>{order.email}</div>
                        <div>{order.mobile}</div>
                        <div>
                          {order.address}, {order.city}, {order.state}{" "}
                          {order.zip}{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="text-secondary pt-5">Payment Method</div>
                      <p>
                        {order.payment_method=='stripe'? <span className="badge bg-dark">Stripe</span> : <span className="badge bg-warning">COD</span>  }
                      </p>
                    </div>
                  </div>
                  <div className="row pt-5">
                    <h3 className="pb-2">
                      <strong>Items</strong>
                    </h3>

                    {items.map((item) => (
                      <div key={item.id} className="row justify-content-end">
                        <div className="col-lg-12">
                          <div className="d-flex border-bottom justify-content-between mb-2 pb-2">
                            <div className="d-flex">
                              {item.product.image && (
                                <img
                                  width="70"
                                  className="me-3"
                                  src={`${item.product.image_url}`}
                                  alt=""
                                />
                              )}
                              <div className="d-flex flex-column">
                                <div className="mb-2">
                                  <span>{item.name}</span>
                                </div>
                                <div>
                                  <button className="btn btn-size">
                                    {item.port}
                                  </button>
                                </div>
                              </div>
                            </div>
                            <div className="d-flex">
                              <div>X {item.qty}</div>
                              <div className="ps-3">Rs.{item.price}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="row justify-content-end">
                      <div className="col-lg-12">
                        <div className="d-flex border-bottom justify-content-between mb-2 pb-2">
                          <div>Subtotal</div>
                          <div>{order.sub_total}</div>
                        </div>
                        <div className="d-flex border-bottom justify-content-between mb-2 pb-2">
                          <div>Shipping</div>
                          <div>Rs.{order.shipping}</div>
                        </div>
                        <div className="d-flex border-bottom justify-content-between mb-2 pb-2">
                          <div>
                            <strong>Grand Total</strong>
                          </div>
                          <div>Rs.{order.grand_total}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
