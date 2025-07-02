import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-10 py-10 rounded-2xl bg-gradient-to-br from-purple-50 via-white to-green-50 px-4">
      <div className="max-w-screen-xl mx-auto px-4 py-10 flex flex-col lg:flex-row justify-between gap-10">
        <div className="lg:w-1/3">
          <Link to="/" className="flex space-x-4 items-center">
            <img
              className="w-20 h-20 rounded-full"
              src="https://i.ibb.co/mCyBkq6n/Running-Person-Marathon-Sports-Club-Logo.jpg"
              alt=""
            />
            <span className="text-sm">
              Marathon Management System – Register, organize, and join
              marathons easily and efficiently.
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-semibold uppercase">Quick Links</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/marathons">Marathons</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Register</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold uppercase">Company</h3>
            <ul className="mt-2 space-y-2">
              <li>
                <Link to="/blogs">All News</Link>
              </li>
              
            </ul>
          </div>

          <div>
            <h3 className="font-semibold uppercase">Social Media</h3>
            <div className="flex mt-2 space-x-4">
              <a href="https://github.com/Dev-Maidul" target="_blank" rel="noreferrer">
                <FaGithub size={24} />
              </a>
              <a href="https://www.facebook.com/mdmaidulislam.101" target="_blank" rel="noreferrer">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.linkedin.com/in/md-maidul-islam-3744b21ba/" target="_blank" rel="noreferrer">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 text-center text-sm border-t border-gray-300">
        © All rights reserved by Marathon-Manager.
      </div>
    </footer>
  );
};

export default Footer;