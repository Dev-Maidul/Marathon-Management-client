import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('blogs.json')
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Failed to fetch blogs", err));
  }, []);

  return (
    <div className="w-full mx-auto my-16 py-10 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-green-50 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">📰 Latest From Our Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-6 flex flex-col justify-between h-full">
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  🗓️ {blog.date} · ✍️ {blog.author}
                </p>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 text-sm">{blog.excerpt}</p>
              </div>

              {/* Gradient Animated Button */}
              <div className="mt-6 text-left">
                <Link to={`/blog/${blog.id}`} className="inline-block group relative">
                  <div className="bubble-button">
                    <span className="text-white font-semibold z-10 relative">Read More</span>
                    <span className="bubble" />
                    <span className="bubble delay-200" />
                    <span className="bubble delay-400" />
                  </div>
                </Link>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;