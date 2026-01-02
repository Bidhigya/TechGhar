import React, { useEffect, useState, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiUrl } from "./common/Http";
import { Pagination } from "react-bootstrap";
import Loader from "./common/Loader/Loader";
import Aos from "aos";

const Shop = () => {
  const [loading, setLoading] = useState(true);
  const [fetchingProducts, setFetchingProducts] = useState(false); 
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const debounceTimeout = useRef(null); 

  // Initialize category and brand selections from URL
  const [catChecked, setCatChecked] = useState(() => {
    const category = searchParams.get("category");
    return category ? category.split(",") : [];
  });

  const [brandChecked, setBrandChecked] = useState(() => {
    const brand = searchParams.get("brand");
    return brand ? brand.split(",") : [];
  });


  const fetchCategories = async () => {
    try {
      const res = await fetch(apiUrl + "/get-categories");
      const result = await res.json();
      if (result.status === 200) setCategories(result.data);
    } catch (error) {
      console.error("Fetch categories error:", error);
    } finally {
      setLoading(false);
    }
  };


  const fetchBrands = async () => {
    try {
      const res = await fetch(apiUrl + "/get-brands");
      const result = await res.json();
      if (result.status === 200) setBrands(result.data);
    } catch (error) {
      console.error("Fetch brands error:", error);
    }
  };


  const fetchProducts = async () => {
    setFetchingProducts(true);

    const params = new URLSearchParams();
    if (catChecked.length > 0) params.append("category", catChecked.join(","));
    if (brandChecked.length > 0) params.append("brand", brandChecked.join(","));
    setSearchParams(params);

    try {
      const res = await fetch(apiUrl + `/get-products?${params.toString()}`);
      const result = await res.json();
      if (result.status === 200) {
       
        setTimeout(() => {
          setProducts(result.data);
          setFetchingProducts(false);
        }, 200);
      } else {
        setProducts([]);
        setFetchingProducts(false);
      }
    } catch (error) {
      console.error("Fetch products error:", error);
      setFetchingProducts(false);
    }
  };


  const handleCategory = (e) => {
    const { checked, value } = e.target;
    setCatChecked((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };


  const handleBrand = (e) => {
    const { checked, value } = e.target;
    setBrandChecked((prev) =>
      checked ? [...prev, value] : prev.filter((id) => id !== value)
    );
  };


  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      fetchProducts();
    }, 400); 
  }, [catChecked, brandChecked]);


  useEffect(() => {
    fetchCategories();
    fetchBrands();
    fetchProducts();
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div>
      <div className="container">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb mt-3" data-aos="fade-right">
          <li style={{ listStyle: "none" }} className="py-4 d-flex breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Shop
            </li>
          </li>
        </nav>

        <div className="row">
          {/* Sidebar Filters */}
          <div className="col-md-3">
            {/* Categories */}
            <div className="card shadow border-0 mb-3" data-aos="fade-right">
              <div className="card-body">
                <h3 className="mb-3">Categories</h3>
                {loading && <Loader />}
                {!loading && (
                  <ul>
                    {categories.map((category) => (
                      <li key={`cat-${category.id}`} className="mb-2">
                        <input
                          id={`check-category-${category.id}`}
                          type="checkbox"
                          checked={catChecked.includes(category.id.toString())}
                          value={category.id}
                          onChange={handleCategory}
                        />
                        <label
                          htmlFor={`check-category-${category.id}`}
                          className="ps-2"
                        >
                          {category.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Brands */}
            <div className="card shadow border-0 mb-3" data-aos="fade-right">
              <div className="card-body">
                <h3 className="mb-3">Brands</h3>
                {loading && <Loader />}
                {!loading && (
                  <ul>
                    {brands.map((brand) => (
                      <li key={`brand-${brand.id}`} className="mb-2">
                        <input
                          id={`check-brand-${brand.id}`}
                          type="checkbox"
                          checked={brandChecked.includes(brand.id.toString())}
                          value={brand.id}
                          onChange={handleBrand}
                        />
                        <label
                          htmlFor={`check-brand-${brand.id}`}
                          className="ps-2"
                        >
                          {brand.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Products */}
          <div
            className="col-md-9 position-relative motion-preset-slide-up motion-delay-500"
            data-aos="fade-up"
          >
            {/* Overlay shimmer loader */}
            {fetchingProducts && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(3px)",
                  zIndex: 5,
                  transition: "opacity 0.3s ease",
                }}
              >
                <Loader />
              </div>
            )}

            {!loading && (
              <div className="row pb-4">
                {products.length > 0 ? (
                  products.map((product) => (
                    <div
                      key={`product-${product.id}`}
                      className="col-md-4 col-6 hover:scale-[1.02] duration-500 hover:cursor-pointer"
                    >
                      <div className="product card border-0">
                        <div className="card-img">
                          <Link to={`/product/${product.id}`} className="link">
                            <img
                              src={product.image_url}
                              alt={product.title}
                              className="w-100"
                            />
                          </Link>
                        </div>
                        <div className="card-body pt-3">
                          <Link
                            to={`/product/${product.id}`}
                            className="link line-clamp-1"
                          >
                            {product.title}
                          </Link>
                          <div className="price">
                            Rs. {product.price} &nbsp;
                            {product.compare_price && (
                              <span className="text-decoration-line-through">
                                Rs {product.compare_price}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No products found.</p>
                )}
              </div>
            )}

            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
