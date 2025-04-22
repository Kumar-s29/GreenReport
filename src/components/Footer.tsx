import React from "react";
import { Recycle, Mail, Github } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12 py-10">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <div className="md:flex md:items-center md:justify-between">
          {/* Brand Section */}
          <div className="flex justify-center md:justify-start">
            <div className="flex items-center gap-3">
              <Recycle size={24} className="text-primary-600" />
              <span className="text-2xl font-semibold text-gray-900">
                GreenReport
              </span>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-4 md:mt-0 flex justify-center space-x-6">
            <a
              href="#"
              className="text-gray-500 hover:text-primary-600 transition duration-150 ease-in-out"
            >
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-primary-600 transition duration-150 ease-in-out"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-6 text-center md:text-left text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} GreenReport. All rights reserved.
          </p>
        </div>

        {/* Flexbox Layout for Contact and Contributors */}
        <div className="mt-8 md:flex md:space-x-12">
          {/* College Contact Section */}
          <div className="md:w-1/2 space-y-4 text-gray-700">
            <h3 className="text-xl font-semibold text-gray-900">
              College Contact
            </h3>
            <p className="text-sm mt-2">
              For inquiries or more information, please reach out to the college
              administration:
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:college@example.com"
                  className="text-primary-600 hover:text-primary-800"
                >
                  college@example.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong> <span>(123) 456-7890</span>
              </li>
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.collegewebsite.com"
                  className="text-primary-600 hover:text-primary-800"
                >
                  www.collegewebsite.com
                </a>
              </li>
            </ul>
          </div>

          {/* Contributors Section */}
          <div className="md:w-1/2 space-y-4 mt-8 md:mt-0 text-gray-700">
            <h3 className="text-xl font-semibold text-gray-900">
              Project Contributors
            </h3>
            <p className="text-sm mt-2">
              This project was built by the following team members:
            </p>
            <ul className="space-y-2 text-sm">
              <li>Kalaga Dimple Sai Harikha</li>
              <li>Kappiri Lahari Krishna</li>
              <li>Kona Poornima</li>
              <li>Kalaga Ashritha</li>
              <li>Gandepalli Pranavi Sai</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
