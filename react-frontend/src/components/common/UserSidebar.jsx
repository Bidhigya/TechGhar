import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth'
import { Link } from 'react-router-dom'
import { Key, LayoutDashboard, LogOut, Receipt } from 'lucide-react'

const UserSidebar = () => {
    const {logout}=useContext(AuthContext)
  return (
    <div className="card shadow mb-5 sidebar">
    <div className="card-body p-4">
  <ul>
    <li>
      <Link className='link' to={'/account'}>
       <LayoutDashboard className="me-2" size={18} />
      My Account</Link>
    </li>
   
    <li>
      <Link
              className="link d-flex align-items-center text-decoration-none"
              to="/account/orders"
            >
              <Receipt className="me-2" size={18} /> Orders
      </Link>
    </li>
    
   <li>
        <Link
              className="link d-flex align-items-center text-decoration-none"
             to="/account/change-password"
            >
              <Key className="me-2" size={18}  /> Change Password
      </Link>
    </li>
    <li>
      <Link className='link' onClick={logout} to={'#'}>
       <LogOut className="me-2" size={18} />
      Logout</Link>
    </li>
  </ul>
    </div>
  </div>
  )
}

export default UserSidebar