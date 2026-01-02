import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { apiUrl, userToken } from "./common/Http";
import { CartContext } from "./context/Cart";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import ReactStars from "react-rating-stars-component";
import Aos from "aos";
const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [rating, setRating] = useState(4);
  const [product, setProduct] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productPorts, setProductPorts] = useState([]);
  const [portSelected, setPortSelected] = useState(null);
  const params=useParams();
  const {addToCart}=useContext(CartContext);
    const navigate = useNavigate();
    const fetchProducts=async()=>{
      await fetch(apiUrl+'/get-product/'+params.id,{
            method:'GET',
            headers:{
              'Content-type':'application/json',
              'Accept':'application/json',
            }
          }).then(res=>res.json())
          .then(result=>{
            if(result.status==200){
              setProduct(result.data);
              setProductImages(result.data.product_images)
              setProductPorts(result.data.product_ports)
              console.log(result.data);
              
            }
            else{
              console.log('Something went wrong');
              
            }
            
          })
    }
  

const handleAddToCart = async () => {
  if (!userToken()) {
    toast.warning("Please login to continue");
    return;
  }

  // Determine quantity (always 1 from product page)
  const qty = 1;

  const items = [
    {
      product_id: product.id,
      qty: qty,
    },
  ];

  try {
    const response = await fetch(apiUrl + "/validate-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${userToken()}`,
      },
      body: JSON.stringify({ items }),
    });

    const result = await response.json();

    // ❌ Validation failed (stock = 0 or exceeded)
    if (result.status !== 200) {
      result.errors.forEach((error) => {
        toast.error(error.message);
      });
      return;
    }

    // ✅ Validation passed
    if (productPorts.length > 0) {
      if (!portSelected) {
        toast.warning("Please select a size");
        return;
      }
      addToCart(product, portSelected);
    } else {
      addToCart(product, null);
    }

    toast.success("Product added to cart");
    navigate("/cart");

  } catch (error) {
    console.error("Cart validation error:", error);
    toast.error("Something went wrong. Please try again.");
  }
};
    useEffect(() => {
      fetchProducts();
    
    }, [])


      useEffect(() => {
         
          Aos.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
          });
        }, []);
    

  return (

      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb mt-3" data-aos="fade-right">
              <li
               
                style={{ listStyle: "none" }}
                className="py-4 d-flex breadcrumb"
              >
                <li className="breadcrumb-item">
                  <Link to={"/"}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={"/shop"}>Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Products
                </li>
              </li>
            </nav>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-5" data-aos="fade-right">
            <div className="row">
              <div className="col-2">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction={`vertical`}
                  spaceBetween={10}
                  slidesPerView={6}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                >
                  {
                    productImages && productImages.map(product_image=>{
                      return(
<SwiperSlide key={`image-sm-${product_image.id}`}>
                    <div className="content">
                      <img
                        src={product_image.image_url}
                        alt=""
                        height={100}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                      )
                    })
                  }
                  
                
                </Swiper>
              </div>
              <div className="col-10">
                <Swiper
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                  loop={true}
                  spaceBetween={0}
                  navigation={true}
                  thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                   {
                    productImages && productImages.map(product_image=>{
                      return(
<SwiperSlide key={`image-${product_image.id}`}>
                    <div className="content">
                      <img
                        src={product_image.image_url}
                        alt=""
                        height={450}
                        className="w-100"
                      />
                    </div>
                  </SwiperSlide>
                      )
                    })
                  }
                
                </Swiper>
              </div>
            </div>
          </div>
          <div className="col-md-7" data-aos="fade-up">
            <h2>{product.title}</h2>

            <div className="d-flex align-items-center">
      <ReactStars
        count={5}
        value={rating}
        size={30}
        isHalf={true}
        edit={false}
        activeColor="#ffd700"
      />
      <span className="ms-2">10 Reviews</span>
    </div>



            <div className="price h3 py-3">
            Rs. {product.price} &nbsp; 
                        {
                          product.compare_price && <span className='text-decoration-line-through'>Rs.{ product.compare_price }</span>
                        }
                {/* $20 <span className="text-decoration-line-through">$18</span> */}
            </div>


<div>
{product.short_description}
</div>

    <div className="pt-3">
    <strong className="">Select the size</strong>
   
<div className="sizes pt-2">

  {productPorts && productPorts.map(product_port=>{
    return(
<button key={`p-port-${product_port.id}`} onClick={()=>setPortSelected(product_port.port.name)}
 className={`btn btn-size me-2 ${portSelected==product_port.port.name?'active scale-[1.05]':''}`}>{product_port.port.name}</button>
    )
  })}


</div>
</div>

<div className="add-to-cart my-4">
    <button onClick={()=>handleAddToCart()} className="btn btn-primary text-uppercase">Add To Cart</button>
</div>

{/* <hr />
<div>
  <strong>SKU:</strong>
  {product.sku}
</div> */}
            
          </div>
        </div>
        <div className="row  py-5">
            <div className="col-md-12">
            <Tabs
      defaultActiveKey="description"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="description" title="Description">
      <div dangerouslySetInnerHTML={{ __html: product.description }}></div>

      </Tab>
      <Tab eventKey="reviews" title="Reviews (10)">
        Reviews Area
      </Tab>
    
    </Tabs>
            </div>
        </div>
        
      </div>
   
  );
};

export default Product;
