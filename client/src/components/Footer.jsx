import React from "react";
import logo from "../assets/logo.svg";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral-100 container px-4 2xl:px-20 mx-auto py-6 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      {/* Logo */}
      <img width={160} src={logo} alt="AIPalette logo" />

      {/* Copyright */}
      <p className="text-sm text-gray-500 sm:border-l sm:border-gray-400 sm:pl-4">
        © {new Date().getFullYear()} @Muhurt Kumar | All rights reserved.
      </p>

      {/* Social Links */}
      <div className="flex gap-3">
        <a
          href="https://github.com/muhurtkumar"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <FaGithub className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
        </a>
        <a
          href="https://www.linkedin.com/in/muhurt-kumar-975824227/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-5 h-5 text-gray-500 hover:text-gray-700 transition-colors duration-200" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
