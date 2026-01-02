
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { X, Home, Store, Phone, User, ShoppingCart, Tag } from "lucide-react";
import { apiUrl } from "./Http";
import { CartContext } from "../context/Cart";
import Aos from "aos";
import "aos/dist/aos.css";

const Navbars = () => {
  const [categories, setCategories] = useState([]);
  const [showTopbar, setShowTopbar] = useState(true);
  const { getQty } = useContext(CartContext);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(apiUrl + "/get-categories", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      const result = await res.json();
      if (result.status === 200) {
        setCategories(result.data || []);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    Aos.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 100,
    });
  }, []);

  // Refresh AOS when categories load
  useEffect(() => {
    Aos.refresh();
  }, [categories]);

  return (
    <header style={{ background: "#5F15C7" }} className="shadow-sm sticky-top">
      <div className="container py-3">
        <Navbar expand="lg" className="p-0">
          <Container fluid>
            {/* Logo */}
            <Link to="/" className="navbar-brand text-decoration-none">
              <h2
  style={{
    fontSize: "36px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    margin: 0,
    background: "linear-gradient(90deg, #ffffff, #ffd6ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 2px 8px rgba(0,0,0,0.25)",
  }}
>
  Tech<span style={{ fontWeight: "900" }}>Ghar</span>
</h2>
             
            </Link>

            <Navbar.Toggle
              aria-controls="navbarScroll"
              style={{ filter: "invert(1)" }} // makes toggle white
            />

            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0 gap-3 align-items-center"
                navbarScroll
              >
                {/* Links */}
                {[
                  { to: "/", label: "Home", Icon: Home },
                  { to: "/shop", label: "Shop", Icon: Store },
                ].map(({ to, label, Icon }) => (
                  <Link
                    key={label}
                    to={to}
                    className="nav-link d-flex align-items-center"
                    style={{
                      color: "#ffffff",
                      fontWeight: 500,
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#e0e0e0")}
                    onMouseLeave={(e) => (e.target.style.color = "#ffffff")}
                  >
                    <Icon size={18} className="me-1" />
                    {label}
                  </Link>
                ))}

                {/* Right Icons */}
                <div className="d-flex align-items-center gap-3 ms-3">
                  <Link to="/account/" style={{ color: "#ffffff" }}>
                    <User size={22} />
                  </Link>

                  <Link
                    to="/cart"
                    className="position-relative"
                    style={{ color: "#ffffff" }}
                  >
                    <ShoppingCart size={22} />
                    {getQty() > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "0.65rem" }}
                      >
                        {getQty()}
                      </span>
                    )}
                  </Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </header>
  );
};

export default Navbars;
