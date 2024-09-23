import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext';
import CommentSection from './CommentSection';
import { AuthContext } from '../../context/AuthContext';

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, deleteBlog } = useContext(BlogContext); // Use deleteBlog from BlogContext
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Find the blog by id from the blogs array
    const foundBlog = blogs.find(b => b._id === id);
    setBlog(foundBlog);
  }, [blogs, id]);

  const handleDelete = async () => {
    console.log("Deleting blog with ID:", id);
    try {
      await deleteBlog(id); // Use deleteBlog from BlogContext
      navigate('/'); // Redirect to blogs list after deletion
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  // If blog is not found or hasn't loaded, show a loading message
  if (!blog) {
    return <div></div>;
  }

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p>
        <strong>Author:</strong> {blog.author.username}
      </p>
      <p><strong>Published on:</strong> {new Date(blog.dateCreated).toLocaleString()}</p>

      {user && (user.userId === blog.author.userId || user.isAdmin) && (
        <>
          <Link to={`/blogs/edit/${id}`}>Edit</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}

      <CommentSection blogId={id} comments={blog.comments} />
    </div>
  );
};

export default BlogDetails;
