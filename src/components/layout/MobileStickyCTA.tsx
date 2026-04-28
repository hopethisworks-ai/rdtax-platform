"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past the hero (roughly 400px)
      setVisible(window.scrollY > 400);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
        <div className="flex gap-3 max-w-lg mx-auto">
          <Link
            href="/contact"
            className="flex-1 bg-primary text-white font-semibold text-sm py-3 rounded-lg text-center hover:bg-primary-dark transition-colors"
          >
            Schedule Call
          </Link>
          <Link
            href="/estimator"
            className="flex-1 border border-primary text-primary font-semibold text-sm py-3 rounded-lg text-center hover:bg-primary/5 transition-colors"
          >
            Estimate Credit
          </Link>
        </div>
      </div>
    </div>
  );
}
