import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isHomePage = location.pathname === '/';
  const isNewPostPage = location.pathname === '/posts/new';
  const isMyPostsPage = location.pathname === '/my-posts';

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Blog App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {!isHomePage && (
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
            )}
            {user && !isMyPostsPage && (
              <li className="nav-item">
                <Link className="nav-link" to="/my-posts">
                  My Posts
                </Link>
              </li>
            )}
          </ul>
          <div className="d-flex">
            {user && !isHomePage && !isNewPostPage && (
              <Link className="nav-link text-success me-3" to="/posts/new">
                + New Post
              </Link>
            )}
            {user && (
              <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
