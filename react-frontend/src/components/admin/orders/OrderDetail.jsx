import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/Sidebar'
import { Link, useParams } from 'react-router-dom'
import { adminToken, apiUrl } from '../../common/Http';
import SkeletonTable from '../../common/Loader/SkeletonTable';
import Loader from '../../common/Loader/Loader';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const OrderDetail = () => {
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);
     const [loader, setLoader] = useState(false);
     const params = useParams();

     const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();

 
    const fetchOrders = async () => {
      try {
        setLoader(true);
        const res = await fetch(apiUrl + "/orders/" + params.id, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${adminToken()} `,
          },
        });
    
        const result = await res.json();
        console.log("API Response:", result); // ✅ Debugging
    
        if (res.ok && result.status === 200) {
          setOrder(result.data);
          setItems(result.data.items);
          reset({
            status: result.data.status,
            payment_status: result.data.payment_status
          });
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
    
   const updateOrder=async(data)=>{
          setLoader(true);
          const res = await fetch(apiUrl + "/update-order/"+params.id, {
            method: "POST",
            headers: {
              'Content-type': "application/json",
              'Accept': "application/json",
              'Authorization': `Bearer ${adminToken()}` ,
            },
            body: JSON.stringify(data),
          })
            .then((res) => res.json())
            .then((result) => {
             
              setLoader(false);
              if (result.status == 200) {
                console.log("Response from Backend:", result); // ✅ Debugging Line
               setOrder(result.data);
                
                reset({
                 status: result.data.status,
                 payment_status:result.data.payment_status
                })
                toast.success("status updated successfully");
               
              } else {
                console.error("Something Went Wrong-1");
              }
            });
      } 
    
    
    
         useEffect(() => {
           fetchOrders();
           updateOrder();
         }, []);
  return (
    <div className="container">
    <div className="row">
      <div className="d-flex justify-content-between mt-5 pb-3">
      <h4 className="h4 mb-0 pb-0">Orders</h4>
      <Link to='/admin/orders' className="btn btn-primary link">Back</Link>
      </div>
      <div className="col-md-3">
        <Sidebar />
      </div>
      <div className="col-md-9">
        <div className="row">
            <div className="col-md-9">
            <div className="card shadow mb-5">
        <div className="card-body p-4">
        {loader == true && <Loader/>}

        {
            loader == false &&
            <div>
<div className="row">
            <div className="col-md-4">
                <h3>Order Id: {order.id}</h3>
               <div className='mt-2'>
               {order.status === 'pending' && <span className="badge bg-warning">Pending</span>}
                  {order.status === 'shipped' && <span className="badge bg-success">Shipped</span>}
                  {order.status === 'delivered' && <span className="badge bg-success">Delivered</span>}
                  {order.status === 'cancelled' && <span className="badge bg-danger">Cancelled</span>}

               </div>

            </div>
            <div className="col-md-4">
                <div className="text-secondary fw-bold">Date</div>
                <h4 className="pt-2">{order.created_at}</h4>
            </div>
            <div className="col-md-4">
                <div className="text-secondary">Payment Status</div>
                <h4 className="pt-2">
                {
                            order.payment_status=='paid'?
                            <span className="badge bg-success">Paid</span>:
                            <span className="badge bg-danger">Not paid</span>
                            }
                </h4>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
                <div className='py-5'>
                <strong>{order.name}</strong>
                <div>{order.email}</div>
                <div>{order.mobile}</div>
                <div>{order.address}, {order.city}, {order.state} {order.zip} </div>
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
   <h3 className="pb-2"><strong>Items</strong></h3>
  
   {
    items.map((item)=>(
        <div key={item.id} className="row justify-content-end">
        <div className="col-lg-12">
           <div className="d-flex border-bottom justify-content-between mb-2 pb-2">
              <div className="d-flex">
                 {
                    item.product.image &&<img width="70" className="me-3" src={`${item.product.image_url}`} alt=""/>
                 }
                 <div className="d-flex flex-column">
                    <div className="mb-2"><span>{item.name}</span></div>
                    <div><button className="btn btn-size">{item.port}</button></div>
                 </div>
              </div>
              <div className="d-flex">
                 <div>X {item.qty}</div>
                 <div className="ps-3">Rs.{item.price}</div>
              </div>
           </div>
        </div>
     </div>
    ))
       
}
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
            <div><strong>Grand Total</strong></div>
            <div>Rs.{order.grand_total}</div>
         </div>
      </div>
   </div>
   
</div>
            </div>
        }
          
        </div>
      </div>
            </div>
            <div className="col-md-3">
            <div className="card shadow">
        <div className="card-body p-4">
        <form onSubmit={handleSubmit(updateOrder)}>
  <div className="mb-3">
    <label className="form-label" htmlFor="status">Status</label>
    <select 
      {...register('status', { required: true })}
      name="status"
      className="form-select" 
      id="status"
    >
      <option value="pending">Pending</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  </div>

  <div className="mb-3">
    <label className="form-label" htmlFor="payment_status">Payment Status</label>
    <select 
      {...register('payment_status', { required: true })}
      name="payment_status" 
      className="form-select" 
      id="payment_status"
    >
      <option value="paid">Paid</option>
      <option value="not_paid">Not Paid</option>
    </select>
  </div>

  <button className="btn btn-primary">Update</button>
</form>

        </div>
      </div>
            </div>
        </div>
      
      </div>
    </div>
  </div>
  )
}

export default OrderDetail