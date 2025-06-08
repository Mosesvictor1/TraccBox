import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <a
            href="#"
            className="text-traccbox-500 text-2xl font-outfit font-bold"
          >
            TraccBox<span className="text-traccbox-300">.</span>
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-700 hover:text-traccbox-500 transition-colors"
          >
            Features
          </a>
          <a
            href="#pricing"
            className="text-gray-700 hover:text-traccbox-500 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-traccbox-500 transition-colors"
          >
            About
          </a>
          <a
            href="#blog"
            className="text-gray-700 hover:text-traccbox-500 transition-colors"
          >
            Resources
          </a>
          <a
            href="#contact"
            className="text-gray-700 hover:text-traccbox-500 transition-colors"
          >
            Contact
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <Button
              variant="ghost"
              className="hover:text-traccbox-500 hover:bg-transparent"
            >
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="bg-traccbox-500 hover:bg-traccbox-600 text-white">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-700 hover:text-traccbox-500 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white shadow-lg absolute w-full`}
      >
        <div className="container mx-auto py-4 space-y-3">
          <a
            href="#features"
            className="block text-gray-700 hover:text-traccbox-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </a>
          <a
            href="#pricing"
            className="block text-gray-700 hover:text-traccbox-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </a>
          <a
            href="#about"
            className="block text-gray-700 hover:text-traccbox-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#blog"
            className="block text-gray-700 hover:text-traccbox-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </a>
          <a
            href="#contact"
            className="block text-gray-700 hover:text-traccbox-500 transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          <div className="flex flex-col space-y-2 pt-2">
            <Link to="/login">
              <Button variant="ghost" className="justify-center border border-traccbox-500 w-full">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-traccbox-500 hover:bg-traccbox-600 text-white justify-center w-full">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
