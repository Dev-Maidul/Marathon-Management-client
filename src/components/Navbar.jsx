

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const links = (
    <>
      <li><NavLink to='/' className="hover:text-green-600">Home</NavLink></li>
      <li><NavLink to='/marathons' className="hover:text-green-600">Marathons</NavLink></li>
      <li><NavLink to='/upcoming-marathons' className="hover:text-green-600">Upcoming Marathons</NavLink></li>
      <li><NavLink to='/blogs' className="hover:text-green-600">All News</NavLink></li>
    </>
  );

  const handleLogout = () => {
    logOut()
      .then(() =>
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logout Success',
          showConfirmButton: false,
          timer: 1500,
        })
      )
      .catch((error) => console.log(error));
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className='w-full sticky top-0 z-50 shadow-md bg-gradient-to-br from-purple-50 via-white to-green-50'
    >
      <div className="navbar max-w-screen-xl mx-auto px-4 py-3 text-black">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-20 p-2 shadow bg-white text-green-800 rounded-box w-52 space-y-1">
              {links}
            </ul>
          </div>
          <Link to="/">
            <img
              className="w-[50px] h-[50px] rounded-full object-cover"
              src="https://i.ibb.co/mCyBkq6n/Running-Person-Marathon-Sports-Club-Logo.jpg"
              alt="Logo"
            />
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 font-medium text-[16px]">
            {links}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          <div className="flex items-center gap-3">

            {user ? (
              <>
                <Link to="/dashboard">
                  <div className="bubble-button">
                    <span className="text-white font-semibold z-10 relative">Dashboard</span>
                    <span className="bubble" />
                    <span className="bubble delay-200" />
                    <span className="bubble delay-400" />
                  </div>
                </Link>
                <button onClick={handleLogout}>
                  <div className="bubble-button bg-[#2e2e2e]">
                    <span className="text-white font-semibold z-10 relative">Log Out</span>
                    <span className="bubble" />
                    <span className="bubble delay-200" />
                    <span className="bubble delay-400" />
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <div className="bubble-button">
                    <span className="text-white font-semibold z-10 relative">Login</span>
                    <span className="bubble" />
                    <span className="bubble delay-200" />
                    <span className="bubble delay-400" />
                  </div>
                </Link>
                <Link to="/signup">
                  <div className="bubble-button">
                    <span className="text-white font-semibold z-10 relative">Register</span>
                    <span className="bubble" />
                    <span className="bubble delay-200" />
                    <span className="bubble delay-400" />
                  </div>
                </Link>
              </>
            )}

            {user && (
              <div className="avatar w-[40px] h-[40px]">
                <Link>
                  <img
                    className="rounded-full w-full h-full object-cover border-2 border-green-400 shadow-md"
                    src={user.photoURL}
                    alt="User"
                    data-tooltip-id="user-tooltip"
                    data-tooltip-content={user?.displayName || 'User'}
                  />
                </Link>
              </div>
            )}
          </div>
        </div>

        <Tooltip id="user-tooltip" place="bottom" effect="solid" className="z-50" />
      </div>
    </motion.div>
  );
};

export default Navbar;
