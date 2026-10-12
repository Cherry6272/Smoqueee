"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Moon, Sun, Search, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchModal } from "./SearchModal";
import { QuickViewModal } from "./QuickViewModal";
import { Product } from "@/data/products";
import styles from "./Navbar.module.css";

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
          SMOQUEE
        </Link>

        <div className={styles.navLinks}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/collections" className={styles.navLink}>Collections</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
          <Link href="/store" className={styles.navLink}>Store</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </div>

        <div className={styles.actions}>
          <button
            className={styles.iconButton}
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search catalog"
            title="Search (Ctrl+K / Cmd+K)"
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          {mounted && (
            <button
              className={styles.iconButton}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={20} strokeWidth={1.5} />
              ) : (
                <Moon size={20} strokeWidth={1.5} />
              )}
            </button>
          )}

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className={styles.iconButton}
            aria-label="Instagram profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileDrawer}
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.drawerHeader}>
              <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
                SMOQUEE
              </Link>
              <button
                className={styles.iconButton}
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <div className={styles.drawerNavLinks}>
              <Link href="/" className={styles.drawerNavLink} onClick={closeMobileMenu}>
                Home
              </Link>
              <Link href="/collections" className={styles.drawerNavLink} onClick={closeMobileMenu}>
                Collections
              </Link>
              <Link href="/about" className={styles.drawerNavLink} onClick={closeMobileMenu}>
                About
              </Link>
              <Link href="/store" className={styles.drawerNavLink} onClick={closeMobileMenu}>
                Store
              </Link>
              <Link href="/contact" className={styles.drawerNavLink} onClick={closeMobileMenu}>
                Contact
              </Link>
            </div>

            <div className={styles.drawerFooter}>
              <div className={styles.drawerThemeRow}>
                <span className="label-small">Theme</span>
                {mounted && (
                  <button
                    className={styles.drawerThemeBtn}
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun size={16} /> Light Mode
                      </>
                    ) : (
                      <>
                        <Moon size={16} /> Dark Mode
                      </>
                    )}
                  </button>
                )}
              </div>
              <p className={styles.drawerLocation}>
                Thanisandra Main Road · Bengaluru, Karnataka
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      {/* Quick View Modal if opened from search */}
      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
