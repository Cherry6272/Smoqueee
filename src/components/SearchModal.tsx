"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon, X, ArrowRight } from "lucide-react";
import { PRODUCTS, Product } from "@/data/products";
import styles from "./SearchModal.module.css";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export function SearchModal({
  isOpen,
  onClose,
  onSelectProduct,
}: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalStyle;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const filteredProducts = query.trim()
    ? PRODUCTS.filter((p) => {
        return (
          p.name.toLowerCase().includes(normalizedQuery) ||
          p.brand.toLowerCase().includes(normalizedQuery) ||
          p.category.toLowerCase().includes(normalizedQuery) ||
          p.description.toLowerCase().includes(normalizedQuery) ||
          p.tags.some((t) => t.toLowerCase().includes(normalizedQuery))
        );
      })
    : PRODUCTS.slice(0, 6); // show top 6 recommendations initially

  return (
    <AnimatePresence>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Search curated products"
        >
          <div className={styles.searchHeader}>
            <SearchIcon size={20} className={styles.searchIcon} />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search chocolates, perfumes, humidors, brands..."
              className={styles.searchInput}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => setQuery("")}
              >
                Clear
              </button>
            )}
            <button
              type="button"
              className={styles.closeBtn}
              onClick={onClose}
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>

          <div className={styles.quickTags}>
            <span className={styles.quickTagLabel}>Discover:</span>
            {["Chocolates", "Oud", "Cohiba", "Perfumes", "Apothecary", "Venchi"].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  className={styles.quickTagBtn}
                  onClick={() => setQuery(tag)}
                >
                  {tag}
                </button>
              )
            )}
          </div>

          <div className={styles.resultsList}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  className={styles.resultItem}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                >
                  <div className={styles.resultThumb}>
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      sizes="56px"
                    />
                  </div>
                  <div className={styles.resultInfo}>
                    <span className={styles.resultCategory}>
                      {product.brand} · {product.category}
                    </span>
                    <span className={styles.resultTitle}>{product.name}</span>
                    <span className={styles.resultBrand}>{product.origin}</span>
                  </div>
                  <span className={styles.resultPrice}>{product.price}</span>
                  <ArrowRight size={16} color="var(--text-secondary)" />
                </button>
              ))
            ) : (
              <div className={styles.emptyState}>
                <p className={styles.emptyStateTitle}>
                  No items found matching &quot;{query}&quot;
                </p>
                <p className="body-base">
                  Try searching by category (e.g. Perfumes, Chocolates) or brand (e.g. Tom Ford, Amedei, Cohiba).
                </p>
                <button
                  type="button"
                  className={styles.quickTagBtn}
                  onClick={() => setQuery("")}
                  style={{ marginTop: "0.5rem" }}
                >
                  Reset Search
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
