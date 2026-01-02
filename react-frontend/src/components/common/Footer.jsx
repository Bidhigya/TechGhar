import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "./Http";
import { AuthContext } from "../context/Auth";
import Aos from "aos";

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(apiUrl + "/get-categories");
      const result = await res.json();

      if (result.status === 200) {
        setCategories(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <footer className="text-white footer-static" data-aos="fade-up">
      <div className="container py-5">
        <div className="row mb-5">

          <div className="col-md-3 mb-4">
            <h3 className="ps-2">TechGhar</h3>
          </div>

          <div className="col-md-3 mb-4">
            <h2 className="mb-3">Categories</h2>
            <ul>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <span className="footer-text">{cat.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h2 className="mb-3">Quick Links</h2>
            <ul>
              {isLoggedIn() ? (
                <li>
                  <span className="footer-text">Dashboard</span>
                </li>
              ) : (
                <>
                  <li>
                    <span className="footer-text">Login</span>
                  </li>
                  <li>
                    <span className="footer-text">Register</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div className="col-md-3 mb-4">
            <h2 className="mb-3">Get in touch</h2>
            <ul>
              <li>
                <span className="footer-text">9876543210 , 9840087179</span>
              </li>
              <li>
                <span className="footer-text">bkmk@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="row py-5">
          <div className="col-md-4 text-center">
            <h3>Quick Delivery</h3>
          </div>
          <div className="col-md-4 text-center">
            <h3>Money-Back Guarantee</h3>
          </div>
          <div className="col-md-4 text-center">
            <h3>Secure Payment</h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 text-center pt-5">
            <p>&copy; 2025 All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
