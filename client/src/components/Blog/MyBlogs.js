import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext';

const MyBlogs = () => {
  const { user } = useContext(AuthContext); // Get user info from AuthContext
  const { getMyBlogs } = useContext(BlogContext); // Get my blogs from BlogContext
  const [myBlogs, setMyBlogs] = useState([]); // State to store user's blogs
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const blogs = await getMyBlogs(); // Fetch user's blogs
        setMyBlogs(blogs);
      } catch (error) {
        console.error("Error fetching my blogs:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    if (user) {
      fetchMyBlogs();
    }
  }, [user, getMyBlogs]);

  if (loading) return <div></div>; // Loading indicator

  return (
    <div className="container">
      <h1>My Blogs</h1>
      {myBlogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        myBlogs.map(blog => (
          <div key={blog._id} className="blog-post">
            <h2>{blog.title}</h2>
            <p>{blog.content.substring(0, 200)}...</p>
            <p><strong>Author:</strong> {blog.author.username}</p>
            <p><strong>Published on:</strong> {new Date(blog.dateCreated).toLocaleString()}</p>
            <Link to={`/posts/${blog._id}`}>Read More</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBlogs;
