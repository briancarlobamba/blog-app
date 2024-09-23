import React, { useEffect, useContext, useState } from 'react';
import { BlogContext } from '../../context/BlogContext';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const { blogs, getBlogs } = useContext(BlogContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      await getBlogs();
      setLoading(false);
    };
    fetchBlogs();
  }, [getBlogs]);

  if (loading) return <div></div>;

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      {blogs.map(blog => (
        <div key={blog._id} className="blog-post">
          <h2>{blog.title}</h2>
          <p>{blog.content.substring(0, 200)}...</p>
          <p><strong>Author:</strong> {blog.author.username}</p>
          <p><strong>Published on:</strong> {blog.dateCreated}</p>
          <Link to={`/blogs/${blog._id}`}>Read More</Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
