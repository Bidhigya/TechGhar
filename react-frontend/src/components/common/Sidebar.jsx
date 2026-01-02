import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminAuthContext } from '../context/AdminAuth';
import {
  Home,
  Tag,
  Package,
  MapPin,
  Receipt,
  Users,
  Truck,
  Key,
  LogOut,
  LayoutDashboard,
  GlobeLock,
  Palette,
} from 'lucide-react';

const Sidebar = () => {
  const { logout } = useContext(AdminAuthContext);

  return (
    <div className="card shadow mb-5 sidebar">
      <div className="card-body p-4">
        <ul className="list-unstyled">
          {/* Dashboard */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/admin/dashboard"
            >
              <LayoutDashboard className="me-2" size={18} />
              Dashboard
            </Link>
          </li>

          {/* Categories */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/admin/categories"
            >
              <Tag className="me-2" size={18} />
              Categories
            </Link>
          </li>

          {/* Brands */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/admin/brands"
            >
             <GlobeLock size={18} className='me-2' />
              Brands
            </Link>
          </li>

          {/* Products */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/admin/products"
            >
              <Package className="me-2" size={18} />
              Products
            </Link>
          </li>

          {/* Ports */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/admin/colors"
            >
              <Palette className="me-2" size={18} />
              {/* <MapPin className="me-2" size={18} /> */}
              Colors
            </Link>
          </li>

          {/* Orders */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/admin/orders"
            >
              <Receipt className="me-2" size={18} />
              Orders
            </Link>
          </li>

          {/* Users */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/admin/users"
            >
              <Users className="me-2" size={18} />
              Users
            </Link>
          </li>

          {/* Shipping */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/admin/shipping"
            >
              <Truck className="me-2" size={18} />
              Shipping
            </Link>
          </li>

          {/* Change Password */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-decoration-none"
             to="/admin/change-password"
            >
              <Key className="me-2" size={18}  />
              Change Password
            </Link>
          </li>

          {/* Logout */}
          <li className="mb-2">
            <Link
              className="link d-flex align-items-center text-danger text-decoration-none"
              to="#"
              onClick={logout}
            >
              <LogOut className="me-2" size={18} />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;