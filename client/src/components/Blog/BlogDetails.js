import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { BlogContext } from '../../context/BlogContext';
import CommentSection from './CommentSection';
import { AuthContext } from '../../context/AuthContext';
import { deleteBlog } from '../../utils/API'; // Import the deleteBlog method

const BlogDetails = () => {
  const { id } = useParams();
  const { blogs, setBlogs } = useContext(BlogContext); // Add setBlogs to context
  const { user } = useContext(AuthContext);
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const foundBlog = blogs.find(b => b._id === id);
    setBlog(foundBlog);
  }, [id, blogs]);

const handleDelete = async () => {
  console.log("Deleting blog with ID:", id);
  try {
    await deleteBlog(id);
    setBlogs(blogs.filter(b => b._id !== id)); // Update the blog context
    navigate('/blogs'); // Redirect after deletion
  } catch (error) {
    console.error("Error deleting blog:", error);
  }
};


  return (
    blog && (
      <div className="container">
        <h1>{blog.title}</h1>
        <p>{blog.content}</p>
        {user && (user.userId === blog.author.userId || user.isAdmin) && (
          <>
            <Link to={`/blogs/edit/${id}`}>Edit</Link>
            <button onClick={handleDelete}>Delete</button>
          </>
        )}
        <CommentSection blogId={id} comments={blog.comments} />
      </div>
    )
  );
};

export default BlogDetails;
