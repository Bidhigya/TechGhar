import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../common/Http";
export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);
  const [shippingCost, setShippingCost] = useState(0);
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      const initialData = JSON.parse(storedCart);
      setCartData(initialData);
      const refreshStocks = async () => {
        let updated = [...initialData];
        for (let i = 0; i < updated.length; i++) {
          const currentStock = await getCurrentStock(updated[i].product_id);
          if (currentStock !== null) {
            updated[i].stock = currentStock;
            if (updated[i].qty > currentStock) {
              updated[i].qty = currentStock;
            }
          }
        }
        setCartData(updated);
        localStorage.setItem('cart', JSON.stringify(updated));
      };
      refreshStocks();
    }
  }, []);
  const getCurrentStock = async (product_id) => {
    try {
      const res = await fetch(apiUrl + "/products/" + product_id, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
      });
      const result = await res.json();
      if (result.status === 200) {
        return result.data.qty;
      }
    } catch (e) {
      console.error(e);
    }
    return null;
  };
  const addToCart = async (product, port = null) => {
    let updatedCart = [...cartData];
    let currentStock = await getCurrentStock(product.id);
    if (currentStock === null) {
      currentStock = product.qty || 10;
    }
    if (cartData.length === 0) {
      if (1 > currentStock) {
        alert(`Cannot add. Only ${currentStock} available in stock.`);
        return;
      }
      updatedCart.push({
        id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
        product_id: product.id,
        port: port,
        title: product.title,
        price: product.price,
        qty: 1,
        image_url: product.image_url,
        stock: currentStock
      });
    } else {
      if (port != null) {
        const isProductExist = updatedCart.find(item =>
          item.product_id === product.id && item.port === port
        );
        if (isProductExist) {
          const newQty = isProductExist.qty + 1;
          const maxQty = Math.min(currentStock, 10);
          if (newQty > maxQty) {
            if (currentStock <= 10) {
              alert(`Cannot add more than available stock. Only ${currentStock} available.`);
            } else {
              alert("Maximum 10 items allowed.");
            }
            return;
          }
          updatedCart = updatedCart.map(item =>
            (item.product_id === product.id && item.port === port) ? { ...item, qty: newQty, stock: currentStock } : item
          );
        } else {
          if (1 > currentStock) {
            alert(`Cannot add. Only ${currentStock} available in stock.`);
            return;
          }
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
            product_id: product.id,
            port: port,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
            stock: currentStock
          });
        }
      } else {
        const isProductExist = updatedCart.find(item =>
          item.product_id === product.id
        );
        if (isProductExist) {
          const newQty = isProductExist.qty + 1;
          const maxQty = Math.min(currentStock, 10);
          if (newQty > maxQty) {
            if (currentStock <= 10) {
              alert(`Cannot add more than available stock. Only ${currentStock} available.`);
            } else {
              alert("Maximum 10 items allowed.");
            }
            return;
          }
          updatedCart = updatedCart.map(item =>
            (item.product_id === product.id) ? { ...item, qty: newQty, stock: currentStock } : item
          );
        } else {
          if (1 > currentStock) {
            alert(`Cannot add. Only ${currentStock} available in stock.`);
            return;
          }
          updatedCart.push({
            id: `${product.id}-${Math.floor(Math.random() * 1000000)}`,
            product_id: product.id,
            port: port,
            title: product.title,
            price: product.price,
            qty: 1,
            image_url: product.image_url,
            stock: currentStock
          });
        }
      }
    }
    setCartData(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const subTotal = () => {
    let subtotal = 0;
    cartData.map(item => {
      subtotal += item.qty * item.price;
    });
    return subtotal;
  };
  const shipping = () => {
    let shippingAmount = 0;
    cartData.map(item => {
      shippingAmount += item.qty * shippingCost;
    });
    return shippingAmount;
  };
  const grandTotal = () => {
    return subTotal() + shipping();
  };
  const updateCartItem = async (itemId, newQty) => {
    const item = cartData.find(item => item.id === itemId);
    let currentStock = item ? await getCurrentStock(item.product_id) : null;
    if (currentStock === null) {
      currentStock = item.stock || 10;
    }
    const maxQty = Math.min(currentStock, 10);
    if (newQty > maxQty) {
      newQty = maxQty;
    }
    let updatedCart = cartData.map(item =>
      item.id === itemId ? { ...item, qty: newQty, stock: currentStock } : item
    );
    setCartData(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  const deleteCartItem = (itemId) => {
    let newCartData = cartData.filter(item => item.id !== itemId);
    setCartData(newCartData);
    localStorage.setItem('cart', JSON.stringify(newCartData));
  };
  const getQty = () => {
    return cartData?.reduce((total, item) => total + (Number(item.qty) || 0), 0) || 0;
  };
  useEffect(() => {
    fetch(apiUrl + "/get-shipping-front", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setShippingCost(result.data.shipping_charge);
        } else {
          setShippingCost(0);
          console.error("Something Went Wrong");
        }
      });
  }, []);
  return (
    <CartContext.Provider value={{ addToCart, cartData, setCartData, grandTotal, subTotal, shipping, updateCartItem, deleteCartItem, getQty }}>
      {children}
    </CartContext.Provider>
  );
};