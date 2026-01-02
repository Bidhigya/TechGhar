import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { adminToken, apiUrl } from '../../common/Http';
import SkeletonTable3 from '../../common/Loader/SkeletonTable3';
import NoState from '../../common/NoState';

const ShowOrders = () => {
    const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);
    const fetchOrders = async () => {
      setLoader(true);
      const res = await fetch(apiUrl + "/orders", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()} `,
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.status == 200) {
            setOrders(result.data);
            setLoader(false);
          } else {
            console.error("Something Went Wrong");
          }
        });
    };
    useEffect(() => {
      fetchOrders();
    }, []);
  return (
    <div className="container">
    <div className="row">
      <div className="d-flex justify-content-between mt-5 pb-3">
      <h4 className="h4 mb-0 pb-0">Categories / Edit</h4>
      {/* <Link to='/admin/categories' className="btn btn-primary link">Back</Link> */}
      </div>
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
      <div className="card shadow">
        <div className="card-body p-4">
        {loader == true && <SkeletonTable3/>}
        {loader == false && orders.length == 0 && (
                <NoState text="Orders not found" />
              )}
              {orders && orders.length > 0 && (
               <table className="table table-striped table-hover">
            <thead>
                <tr>
                    <th>#Id</th>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Payment</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((order,i)=>(
                    <tr key={i}>
                        <td>
                           <Link className="link primary-text" to={`/admin/orders/${order.id}`}> {order.id}</Link>
                            </td>
                        <td>{order.name}</td>
                        <td>{order.email}</td>
                        <td>{order.grand_total}</td>
                        <td>{order.created_at}</td>
                        <td>{
                            order.payment_status=='paid'?
                            <span className="badge bg-success">Paid</span>:
                            <span className="badge bg-danger">Not paid</span>
                            }</td>
                        <td>
                        {order.status === 'pending' && <span className="badge bg-warning">Pending</span>}
                  {order.status === 'shipped' && <span className="badge bg-success">Shipped</span>}
                  {order.status === 'delivered' && <span className="badge bg-success">Delivered</span>}
                  {order.status === 'cancelled' && <span className="badge bg-danger">Cancelled</span>}
                        </td>
                    </tr>
                    ))
                }
               
            </tbody>
        </table>
              )}
        
        </div>
      </div>
      </div>
    </div>
  </div>
  )
}

export default ShowOrders