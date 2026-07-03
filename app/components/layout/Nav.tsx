"use client";

import { useState, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
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

const homeNavItems = [
  { name: "Work", link: "#work" },
  { name: "About", link: "#about" },
  { name: "Process", link: "#process" },
];

const workNavItems = [
  { name: "Home", link: "/" },
  { name: "All Work", link: "/#work" },
];

export function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const navItems = isHome ? homeNavItems : workNavItems;

  const scrollTo = useCallback((href: string) => {
    // Full path navigation (e.g. "/" or "/#work")
    if (href.startsWith("/")) {
      router.push(href);
      return;
    }
    // Hash scroll on current page
    if (pathname !== "/") {
      router.push("/" + href);
      return;
    }
    const target = document.querySelector(href);
    if (!target) return;
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(target as HTMLElement, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname, router]);

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} onItemClick={scrollTo} />
        <div className="flex items-center gap-4">
          <NavbarButton href="mailto:hagerragab94@gmail.com" variant="dark">
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
              href="mailto:hagerragab94@gmail.com"
              variant="dark"
              className="w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Let&apos;s talk
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
