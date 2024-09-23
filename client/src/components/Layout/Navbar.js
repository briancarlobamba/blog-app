import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/posts">
          Blog App
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/posts/new">
                    New Blog
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-posts">My Blogs</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link">Hello, {user.username}</span>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
