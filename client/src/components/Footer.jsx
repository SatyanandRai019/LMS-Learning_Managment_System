import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#0a1f44] text-white mt-20">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-3xl font-bold text-[#d4af37]">
            LMS
          </h2>

          <p className="mt-4 text-slate-300 leading-7">
            Learn from industry experts with high-quality courses,
            interactive lectures, and lifetime access.
          </p>

          <div className="flex gap-4 mt-6 text-xl">

            <FaFacebook className="cursor-pointer hover:text-[#d4af37] duration-300" />

            <FaInstagram className="cursor-pointer hover:text-[#d4af37] duration-300" />

            <FaLinkedin className="cursor-pointer hover:text-[#d4af37] duration-300" />

            <FaGithub className="cursor-pointer hover:text-[#d4af37] duration-300" />

            <FaTwitter className="cursor-pointer hover:text-[#d4af37] duration-300" />

          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-xl font-semibold mb-5 text-[#d4af37]">
            Quick Links
          </h3>

          <ul className="space-y-3 text-slate-300">

            <li>
              <Link to="/" className="hover:text-[#d4af37]">
                Home
              </Link>
            </li>

            <li>
              <Link to="/courses" className="hover:text-[#d4af37]">
                Courses
              </Link>
            </li>

            <li>
              <Link to="/about" className="hover:text-[#d4af37]">
                About
              </Link>
            </li>

            <li>
              <Link to="/contact" className="hover:text-[#d4af37]">
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Resources */}

        <div>
          <h3 className="text-xl font-semibold mb-5 text-[#d4af37]">
            Resources
          </h3>

          <ul className="space-y-3 text-slate-300">

            <li className="hover:text-[#d4af37] cursor-pointer">
              Blog
            </li>

            <li className="hover:text-[#d4af37] cursor-pointer">
              Help Center
            </li>

            <li className="hover:text-[#d4af37] cursor-pointer">
              Privacy Policy
            </li>

            <li className="hover:text-[#d4af37] cursor-pointer">
              Terms & Conditions
            </li>

          </ul>
        </div>

        {/* Newsletter */}

        <div>

          <h3 className="text-xl font-semibold mb-5 text-[#d4af37]">
            Newsletter
          </h3>

          <p className="text-slate-300 mb-4">
            Subscribe to get latest courses and updates.
          </p>

          <input
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full text-black"
          />

          <button className="btn bg-[#d4af37] hover:bg-yellow-500 border-none text-black w-full mt-4">
            Subscribe
          </button>

        </div>

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-400 text-sm">
            © 2026 LMS Learning Platform. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-sm text-slate-400">

            <Link to="/privacy" className="hover:text-[#d4af37]">
              Privacy
            </Link>

            <Link to="/terms" className="hover:text-[#d4af37]">
              Terms
            </Link>

            <Link to="/cookies" className="hover:text-[#d4af37]">
              Cookies
            </Link>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;