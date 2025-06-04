import React from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="px-4 divide-y dark:bg-gray-100 dark:text-gray-800 rounded-2xl mt-12">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <Link
            to="/"
            rel="noopener noreferrer"
            href="#"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <img
              className="flex items-center justify-center w-30 h-30 rounded-full dark:bg-violet-600"
              src="https://i.ibb.co/mCyBkq6n/Running-Person-Marathon-Sports-Club-Logo.jpg"
              alt=""
            />
            <span className="self-center text-sm">
              Marathon Management System – Register, organize, and join marathons easily and efficiently.
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              Quick Links
            </h3>
            <ul className="space-y-1">
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
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase dark:text-gray-900">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <div className="uppercase dark:text-gray-900">Social media</div>
            <div className="flex justify-start space-x-3">
              <a
                href="https://github.com/Dev-Maidul"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={30} />
              </a>
              <a
                href="https://www.facebook.com/mdmaidulislam.101"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href="https://www.linkedin.com/in/md-maidul-islam-3744b21ba/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-600">
        ©All rights reserved by Marathon-Manager.
      </div>
    </footer>
  );
};

export default Footer;
