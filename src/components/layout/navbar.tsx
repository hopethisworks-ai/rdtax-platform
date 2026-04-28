"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
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
            <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Alexander &amp; Blake logo">
              <rect width="120" height="120" rx="24" fill="#2C7A7B"/>
              {/* A letter - path instead of text for cross-browser reliability */}
              <path d="M28 82L44 30h8l16 52h-8l-4-14H40l-4 14h-8zm14-22h12l-6-22-6 22z" fill="white"/>
              {/* B letter */}
              <path d="M68 30h16c4 0 7 1 9 3s3 5 3 8c0 4-2 7-5 9 4 2 6 5 6 10 0 4-1 7-4 9s-6 3-10 3H68V30zm8 18h8c2 0 3-0.5 4-2s2-3 2-5-1-3-2-4-2-2-4-2h-8v13zm0 20h10c2 0 4-1 5-2s2-3 2-5-1-4-2-5-3-2-5-2H76v14z" fill="rgba(255,255,255,0.7)"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-serif text-white text-sm sm:text-base leading-tight tracking-wide">Alexander <span className="text-primary-light">&amp;</span> Blake</span>
              <span className="hidden sm:block text-[10px] text-gray-400 tracking-[0.15em] uppercase leading-tight">R&amp;D Tax Credit Advisory</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/services", label: "Services" },
              { href: "/methodology", label: "Methodology" },
              { href: "/cpa-partners", label: "CPA Partners" },
              { href: "/industries", label: "Industries" },
              { href: "/south-carolina", label: "SC Credits" },
              { href: "/contact", label: "Contact" },
            ].map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                    isActive
                      ? "text-white bg-white/15"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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
            <Link href="/methodology" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              Methodology
            </Link>
            <Link href="/cpa-partners" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              CPA Partners
            </Link>
            <Link href="/industries" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              Industries
            </Link>
            <Link href="/south-carolina" onClick={() => setOpen(false)} className="px-3 py-2 text-gray-300 hover:text-white text-sm font-medium rounded-md hover:bg-white/10 transition-colors">
              SC Credits
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
