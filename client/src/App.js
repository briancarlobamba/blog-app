import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import BlogList from './components/Blog/BlogList';
import BlogDetails from './components/Blog/BlogDetails';
import BlogForm from './components/Blog/BlogForm';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { BlogProvider } from './context/BlogContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <BlogProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<BlogDetails />} />
            <Route path="/blogs/new" element={<PrivateRoute><BlogForm /></PrivateRoute>} />
            <Route path="/blogs/edit/:id" element={<PrivateRoute><BlogForm /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BlogProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
