"use client";

import { useState, useCallback } from "react";
import Lenis from "lenis";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

const navItems = [
  { name: "Work", link: "#work" },
  { name: "About", link: "#about" },
];

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    // Use the global Lenis instance if available, otherwise fallback
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      scrollTo(href);
    },
    [scrollTo],
  );

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} onItemClick={scrollTo} />
        <div className="flex items-center gap-4">
          <NavbarButton
            href="#work"
            variant="dark"
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleClick(e, "#work")}
          >
            Let&apos;s talk
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => (
            <a
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                scrollTo(item.link);
              }}
              className="relative text-ink"
            >
              <span className="block">{item.name}</span>
            </a>
          ))}
          <div className="flex w-full flex-col gap-4">
            <NavbarButton
              href="#work"
              variant="dark"
              className="w-full"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                scrollTo("#work");
              }}
            >
              Let&apos;s talk
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
