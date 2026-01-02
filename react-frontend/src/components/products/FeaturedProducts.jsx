import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiUrl } from '../common/Http';
import Loader from '../common/Loader/Loader';
const FeaturedProducts = () => {
   const [products,setProducts]=useState([]);
    const [loading,setLoading]=useState(true);
    const featuredProducts=async()=>{
     await fetch(apiUrl+'/get-featured-products',{
        method:'GET',
        headers:{
          'Content-type':'application/json',
          'Accept':'application/json',
        }
      }).then(res=>res.json())
      .then(result=>{
       
        setProducts(result.data);
        setLoading(false);
      })
  
    }
    useEffect(()=>{
     featuredProducts();
    },[])
  return (
    <section className="section-2  py-5">
    <div className="container">
      <h2>New products</h2>
   {
    loading==true && <Loader/>
   }
   {
    loading==false &&    <div className="row mt-4">
    {
           products && products.map(product=>{
             return(
              <div className="col-md-3 col-6" key={product.id}>
             <div className="product card border-0">
               <div className="card-img ">
               <Link to={`/product/${product.id}`} className='link'><img src={product.image_url} alt="" className='w-100' /></Link>
               </div>
               <div className="card-body pt-3">
                 <Link to={`/product/${product.id}`} className='link line-clamp-1'>{product.title}</Link>
                 <div className="price">
                   Rs. {product.price} &nbsp; 
                   {
                     product.compare_price && <span className='text-decoration-line-through'>Rs.{ product.compare_price }</span>
                   }
                   
                 </div>
               </div>
     
             </div>
           </div>
             )
             
           })
         }
 </div>
   }
    </div>
   </section>
  )
}

export default FeaturedProducts