import { BsFacebook, BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-[#0a1f44]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-10 lg:px-16">
        <p className="text-center text-sm text-slate-300 sm:text-base">
          © {year} <span className="font-semibold text-[#d4af37]">LMS</span>{" "}
          Learning Platform. All rights reserved.
        </p>

        <div className="flex items-center gap-5 text-xl text-slate-300">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-all duration-300 hover:scale-110 hover:text-[#d4af37]"
          >
            <BsFacebook />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-all duration-300 hover:scale-110 hover:text-[#d4af37]"
          >
            <BsInstagram />
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-all duration-300 hover:scale-110 hover:text-[#d4af37]"
          >
            <BsLinkedin />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="transition-all duration-300 hover:scale-110 hover:text-[#d4af37]"
          >
            <BsTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
