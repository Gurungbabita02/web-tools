"use client";

import Link from "next/link";
import { useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { SiConvertio } from "react-icons/si";

const Header = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "#tools" },
    { name: "Blog", href: "#blog" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur  shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
         <SiConvertio  size={20} className="text-blue1"/>
          <span className="font-extrabold text-xl tracking-tight text-blue1">
            FileToolsPro
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative group"
            >
              <span className="group-hover:text-blue-600 transition">
                {item.name}
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></span>
            </Link>
          ))}
        </nav>

        {/* CTA + Mobile Menu Button */}
        <div className="flex items-center gap-3">
          <Link
            href="#tools"
            className="hidden sm:inline-block bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-5 py-2 rounded-xl font-medium  transition"
          >
            Start Using
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          >
            {open ? <IoMdClose size={22} /> : <IoMdMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t bg-white px-6 py-6 space-y-4 shadow">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block text-gray-700 font-medium hover:text-indigo-600"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="#tools"
            className="block hover:-translate-y-1 hover:scale-105 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-center py-2 rounded-xl font-semibold  transition"
          >
            Start Using
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
