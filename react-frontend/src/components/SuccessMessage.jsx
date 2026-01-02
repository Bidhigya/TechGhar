import React, { useEffect, useState } from 'react'
import { apiUrl, userToken } from './common/Http';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SuccessMessage = () => {
  const [order,setOrder]=useState(null);
  const[loading,setLoading]=useState(true);
  const[items,setItems]=useState([]);
const params=useParams();
const fetchOrder = async () => {
  try {
    const response = await fetch(`${apiUrl}/get-order-details/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userToken()}`,
      },
    });

    const result = await response.json();
    console.log('API Response:', result);

    if (result.status === 200) {
      setOrder(result.data);
      setItems(result.data.items);
    } else {
      toast.error(result.message || 'Failed to fetch order details.');
      setOrder(null);
    }
  } catch (error) {
    console.error('Fetch error:', error);
    toast.error('Something went wrong while fetching order details.');
    setOrder(null);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchOrder();
}, []);

   
  return (
    <div className="container py-5">
    {/* Show loading spinner while fetching order */}
    {loading && (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )}

    {/* Show order details if available */}
    {!loading && order && (
      <div>
        <div className="row">
          <h1 className="text-center fw-bold text-success">Thank You</h1>
          <p className="text-muted text-center">Your order has been successfully placed.</p>
        </div>
        <div className="card shadow">
          <div className="card-body">
            <h3 className="fw-bold">Order Summary</h3>
            <hr />
            <div className="row">
              <div className="col-6">
                <p><strong>Order ID:</strong> #{order.id}</p>
                <p><strong>Date:</strong> {order.created_at}</p>
                <p><strong>Status:</strong>
                  {order.status === 'pending' && <span className="badge bg-warning">Pending</span>}
                  {order.status === 'shipped' && <span className="badge bg-info">Shipped</span>}
                  {order.status === 'delivered' && <span className="badge bg-success">Delivered</span>}
                  {order.status === 'cancelled' && <span className="badge bg-danger">Cancelled</span>}
                </p>
                <p><strong>Payment Method:</strong> {order.payment_method=='stripe'? <span className="badge bg-dark">Stripe</span> : <span className="badge bg-warning">COD</span>  }</p>
              </div>
              <div className="col-6">
                <p><strong>Customer:</strong> {order.name || 'N/A'}</p>
                <p><strong>Address:</strong> {order.address || 'N/A'},{order.city || 'N/A'},{order.state || 'N/A'},{order.zip || 'N/A'}</p>
                <p><strong>Contact:</strong> {order.mobile || 'N/A'}</p>
              </div>
            </div>
            <div className="row">
              <h3>Items</h3>
              <div className="col-12">
                <table className="table table-striped table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th width="150">Price</th>
                      <th width="150">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {

                    }
                    {items && items.length > 0 ? (
                      items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.qty}</td>
                          <td>Rs.{item.unit_price}</td>
                          <td>Rs.{item.price}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">No items found.</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>Sub Total</td>
                      <td>Rs.{order.sub_total|| 0.00}</td>
                    </tr>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>Shipping Amount</td>
                      <td>Rs.{order.shipping || '0.00'}</td>
                    </tr>
                    <tr>
                      <td className="text-end fw-bold" colSpan={3}>Grand Total</td>
                      <td>Rs.{order.grand_total || '0.00'}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="text-center">
                <Link to={`/account/orders/details/${order.id}`} className="btn btn-primary">View Order Details</Link>
                <Link to={'/shop'} className="btn btn-outline-secondary ms-2">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Show error message if order not found */}
    {!loading && !order && (
      <div className="row">
        <h1 className="text-center fw-bold text-muted">Order Not Found</h1>
      </div>
    )}
  </div>
  )
}

export default SuccessMessage