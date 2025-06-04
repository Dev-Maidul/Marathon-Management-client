import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider';
import Swal from 'sweetalert2';
import { Tooltip } from 'react-tooltip';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li>
        <NavLink to='/'>Home</NavLink>
      </li>
      <li>
        <NavLink to='/'>Marathons</NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logout Success',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2">
            {links}
          </ul>
        </div>
        <div className="hidden md:block">
          <Link to="/">
            <img
              className="w-[80px] rounded-full cursor-pointer"
              src="https://i.ibb.co/mCyBkq6n/Running-Person-Marathon-Sports-Club-Logo.jpg"
              alt=""
            />
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{links}</ul>
      </div>

      <div className="navbar-end">
        <div className="flex gap-2">
          {user ? (
            <>
            <Link><button className="btn btn-success">Dashboard</button></Link>
            <button onClick={handleLogout} className="btn btn-active btn-primary mr-2">
              Log Out
            </button>
            </>
            
          ) : (
            <>
              <Link to="/signup">
                <button className="btn btn-primary">Register</button>
              </Link>
              <Link to="/login">
                <button className="btn btn-success">Login</button>
              </Link>
            </>
          )}
        </div>
        <div className="relative">
          <div className="avatar avatar-online w-[60px]">
            {user && (
              <Link>
                <img
                  className="rounded-full w-[150px] h-[150px] cursor-pointer"
                  src={user.photoURL}
                  alt="User Photo"
                  data-tooltip-id="user-tooltip"
                  data-tooltip-content={user?.displayName || 'User'}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
      <Tooltip id="user-tooltip" place="bottom" effect="solid" className="z-50" />
    </div>
  );
};

export default Navbar;
