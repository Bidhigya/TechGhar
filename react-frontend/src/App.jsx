import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./components/Root";
import Home from "./components/Home";
import Shop from "./components/Shop";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/style.scss";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/admin/Login";
import { Bounce, Flip, ToastContainer, Zoom } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/admin/Dashboard";
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth";
import ShowCategory from "./components/admin/category/ShowCategory";
import EditCategory from "./components/admin/category/EditCategory";
import CreateCategory from "./components/admin/category/CreateCategory";
import ShowBrands from "./components/admin/brands/ShowBrands";
import CreateBrands from "./components/admin/brands/CreateBrands";
import EditBrands from "./components/admin/brands/EditBrands";
import CreateProduct from "./components/admin/product/CreateProduct";
import ShowProduct from "./components/admin/product/ShowProduct";
import EditProduct from "./components/admin/product/EditProduct";
import Register from "./components/Register";
import Logins from "./components/Logins";
import Profile from "./components/front/Profile";
import { RequireAuth } from "./components/RequireAuth";
import SuccessMessage from "./components/SuccessMessage";
import ShowOrders from "./components/admin/orders/ShowOrders";
import OrderDetail from "./components/admin/orders/OrderDetail";
import MyOrders from "./components/front/MyOrders";
import {default as UserOrderDetail} from "./components/front/OrderDetail";
import Shipping from "./components/admin/shipping/Shipping";
import { useEffect } from "react";
import Aos from "aos";
import ShowPorts from "./components/admin/ports/ShowPorts";
import CreatePort from "./components/admin/ports/CreatePort";
import EditPort from "./components/admin/ports/EditPort";
import ChangePassword from "./components/admin/change-password/ChangePassword";
import EditUser from "./components/admin/users/EditUser";
import CreateUser from "./components/admin/users/CreateUser";
import ShowUsers from "./components/admin/users/ShowUsers";
import UserChangePassword from "./components/admin/change-password/UserChangePassword";

function App() {
    useEffect(() => {
    Aos.init({
      duration: 800, // Animation duration (in ms)
      easing: "ease-in-out", // Smooth animation
      once: true, // Whether animation should happen only once
      offset: 100, // Distance to start the animation (px)
    });
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { 
          // UserRoutes
          index: true,
          element: <Home />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/product/:id",
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        // {
        //   path: "/checkout",
        //   element: <Checkout />,
        // },
        {
          path: "/account/register",
          element: <Register />,
        },
        {
          path: "/account/login",
          element: <Logins />,
        },
        {
          path: "/account",
          element: (
            <RequireAuth>
              <Profile />
            </RequireAuth>
          ),
        },
        {
          path: "/account/orders",
          element: (
            <RequireAuth>
              <MyOrders />
            </RequireAuth>
          ),
        },
        {
          path: "/checkout",
          element: (
            <RequireAuth>
              <Checkout />
            </RequireAuth>
          ),
        },
        {
          path: "/success-message/:id",
          element: (
            <RequireAuth>
              <SuccessMessage/>
            </RequireAuth>
          ),
        },
        {
          path: "/account/orders/details/:id",
          element: (
            <RequireAuth>
              <UserOrderDetail/>
            </RequireAuth>
          ),
        },
        {
  path: "/account/change-password",
  element: (
    <RequireAuth>
      <UserChangePassword />
    </RequireAuth>
  ),
},
        
        // Admin Routes
        {
          path: "/admin/login",
          element: <Login />,
        },
        {
          path: "/admin/dashboard",
          element: (
            <AdminRequireAuth>
              <Dashboard />
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/categories",
          element: (
            <AdminRequireAuth>
             <ShowCategory/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/categories/edit/:id",
          element: (
            <AdminRequireAuth>
             <EditCategory/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/categories/create",
          element: (
            <AdminRequireAuth>
             <CreateCategory/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/brands",
          element: (
            <AdminRequireAuth>
             <ShowBrands/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/brands/create",
          element: (
            <AdminRequireAuth>
             <CreateBrands/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/brands/edit/:id",
          element: (
            <AdminRequireAuth>
             <EditBrands/>
            </AdminRequireAuth>
          ),
        },
        {
  path: "/admin/colors",
  element: (
    <AdminRequireAuth>
      <ShowPorts />
    </AdminRequireAuth>
  ),
},
{
  path: "/admin/colors/create",
  element: (
    <AdminRequireAuth>
      <CreatePort />
    </AdminRequireAuth>
  ),
},
{
  path: "/admin/colors/edit/:id",
  element: (
    <AdminRequireAuth>
      <EditPort />
    </AdminRequireAuth>
  ),
},
        {
          path: "/admin/products",
          element: (
            <AdminRequireAuth>
             <ShowProduct/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/products/create",
          element: (
            <AdminRequireAuth>
             <CreateProduct/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/products/edit/:id",
          element: (
            <AdminRequireAuth>
             <EditProduct/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/orders",
          element: (
            <AdminRequireAuth>
             <ShowOrders/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/orders/:id",
          element: (
            <AdminRequireAuth>
             <OrderDetail/>
            </AdminRequireAuth>
          ),
        },
        {
          path: "/admin/shipping",
          element: (
            <AdminRequireAuth>
             <Shipping/>
            </AdminRequireAuth>
          ),
        },
        {
  path: "/admin/users",
  element: (
    <AdminRequireAuth>
      <ShowUsers />
    </AdminRequireAuth>
  ),
},
{
  path: "/admin/users/create",
  element: (
    <AdminRequireAuth>
      <CreateUser />
    </AdminRequireAuth>
  ),
},
{
  path: "/admin/users/edit/:id",
  element: (
    <AdminRequireAuth>
      <EditUser />
    </AdminRequireAuth>
  ),
},
{
  path: "/admin/change-password",
  element: (
    <AdminRequireAuth>
      <ChangePassword />
    </AdminRequireAuth>
  ),
},
      ],
    },
  ]);

  return (
    <>
     
      
      <RouterProvider router={router} />
<ToastContainer autoClose='3000' transition={Bounce} />

    
   </>
  );
}

export default App;
