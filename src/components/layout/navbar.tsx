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
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">AB</span>
            </div>
            <span className="font-semibold text-white text-base hidden sm:inline">Alexander &amp; Blake</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/services" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              Services
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
            <Link href="/#faq" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              FAQ
            </Link>
            <Link href="/contact" className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors rounded-md hover:bg-white/10">
              Contact
            </Link>
          </div>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <Link href="/portal" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                Portal
              </Link>
            ) : (
              <Link href="/login" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                Sign In
              </Link>
            )}
            <Link href="/contact" className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md">
              Schedule Consultation
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
            <Link href="/services" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Services
            </Link>
            <Link href="/industries" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Industries
            </Link>
            <Link href="/cpa-partners" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              CPA Partners
            </Link>
            <Link href="/about" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              About
            </Link>
            <Link href="/#faq" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
              Contact
            </Link>
            <div className="pt-2 border-t border-white/10 flex flex-col gap-3">
              {session ? (
                <Link href="/portal" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Portal
                </Link>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
                  Sign In
                </Link>
              )}
              <Link href="/contact" onClick={() => setOpen(false)} className="px-4 py-2 bg-primary text-white rounded-full text-sm font-medium text-center hover:bg-primary-dark transition-colors">
                Schedule Consultation
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
