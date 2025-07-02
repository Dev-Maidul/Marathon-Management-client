import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch('/blogs.json')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => item.id === parseInt(id));
        if (found) {
          setBlog(found);
        } else {
          navigate('/blog');
        }
      });
  }, [id, navigate]);

  if (!blog) return <div className="text-center py-20">Loading blog...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="w-11/12 max-w-4xl mx-auto my-16"
    >
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-[350px] object-cover rounded-xl shadow mb-6"
      />
      <div className="text-gray-600 text-sm mb-2">
        🗓️ {blog.date} · ✍️ {blog.author}
      </div>
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
        {blog.content}
      </div>
    </motion.div>
  );
};

export default BlogDetails;