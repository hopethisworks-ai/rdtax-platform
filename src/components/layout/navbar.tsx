"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`bg-navy sticky top-0 z-50 transition-shadow duration-200 ${
      scrolled ? "shadow-lg" : ""
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="120" rx="24" fill="#2C7A7B"/>
              <text x="28" y="82" fontFamily="Georgia, serif" fontSize="58" fontWeight="400" fill="white" letterSpacing="-2">A</text>
              <text x="62" y="82" fontFamily="Georgia, serif" fontSize="58" fontWeight="400" fill="rgba(255,255,255,0.7)" letterSpacing="-2">B</text>
            </svg>
            <div className="hidden sm:flex flex-col">
              <span className="font-serif text-white text-base leading-tight tracking-wide">Alexander <span className="text-primary-light">&amp;</span> Blake</span>
              <span className="text-[10px] text-gray-400 tracking-[0.15em] uppercase leading-tight">R&amp;D Tax Credit Advisory</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/services" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              Services
            </Link>
            <Link href="/how-it-works" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              Process
            </Link>
            <Link href="/industries" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              Industries
            </Link>
            <Link href="/cpa-partners" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              CPA Partners
            </Link>
            <Link href="/about" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              About
            </Link>
            <Link href="/faq" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              FAQ
            </Link>
            <Link href="/contact" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              Contact
            </Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {session && (
              <Link href="/portal" className="text-gray-500 hover:text-gray-300 text-xs font-medium transition-colors">
                Client Portal
              </Link>
            )}
            <Link href="/contact" className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md">
              Schedule a Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden py-4 border-t border-white/10 flex flex-col gap-3">
            <Link href="/services" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              Services
            </Link>
            <Link href="/how-it-works" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              Process
            </Link>
            <Link href="/industries" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              Industries
            </Link>
            <Link href="/cpa-partners" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              CPA Partners
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              About
            </Link>
            <Link href="/faq" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              Contact
            </Link>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
              {session && (
                <Link href="/portal" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-500 hover:text-gray-300 text-xs font-medium">
                  Client Portal
                </Link>
              )}
              <Link href="/contact" onClick={() => setOpen(false)} className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium text-center hover:bg-primary-dark transition-colors">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
