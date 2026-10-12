"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { QuickViewModal } from "@/components/QuickViewModal";
import { PRODUCTS, CATEGORIES, Product } from "@/data/products";
import styles from "./collections.module.css";

function CollectionsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [selectedAvailability, setSelectedAvailability] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Sync when search param changes
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) {
      setActiveCategory(cat);
    }
  }, [searchParams]);

  // Unique brands
  const brands = useMemo(() => {
    const list = Array.from(new Set(PRODUCTS.map((p) => p.brand)));
    return list.sort();
  }, []);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== "all" && product.categorySlug !== activeCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== "all" && product.brand !== selectedBrand) {
        return false;
      }
      // Availability filter
      if (
        selectedAvailability !== "all" &&
        product.availability !== selectedAvailability
      ) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === "price-asc") {
        return a.priceNum - b.priceNum;
      }
      if (sortBy === "price-desc") {
        return b.priceNum - a.priceNum;
      }
      if (sortBy === "newest") {
        return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      }
      // default: featured
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [activeCategory, selectedBrand, selectedAvailability, sortBy]);

  const resetFilters = () => {
    setActiveCategory("all");
    setSelectedBrand("all");
    setSelectedAvailability("all");
    setSortBy("featured");
  };

  const currentCategoryObj = CATEGORIES.find((c) => c.slug === activeCategory);

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.heroSection}>
        <span className={styles.breadcrumb}>Curated Catalog</span>
        <h1 className={styles.title}>
          {currentCategoryObj ? currentCategoryObj.title : "All Collections"}
        </h1>
        <p className={styles.subtitle}>
          {currentCategoryObj
            ? currentCategoryObj.description
            : "Explore our complete portfolio of rare European chocolates, niche extrait fragrances, collector smoke accessories, and refined global lifestyle artifacts."}
        </p>
      </section>

      {/* Sticky Filter & Tab Bar */}
      <section className={styles.controlsBar}>
        <div className={styles.categoryTabs}>
          <button
            type="button"
            className={`${styles.tabBtn} ${activeCategory === "all" ? styles.active : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            All Items ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <button
                key={cat.id}
                type="button"
                className={`${styles.tabBtn} ${
                  activeCategory === cat.slug ? styles.active : ""
                }`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                {cat.title} ({count})
              </button>
            );
          })}
        </div>

        <div className={styles.filtersRow}>
          <div className={styles.filterGroup}>
            <select
              className={styles.selectInput}
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              aria-label="Filter by Brand"
            >
              <option value="all">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              className={styles.selectInput}
              value={selectedAvailability}
              onChange={(e) => setSelectedAvailability(e.target.value)}
              aria-label="Filter by Availability"
            >
              <option value="all">All Availability</option>
              <option value="In Stock">In Stock</option>
              <option value="Limited">Limited Edition</option>
              <option value="Exclusive">Exclusive Atelier</option>
            </select>

            <select
              className={styles.selectInput}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="newest">Sort: New Arrivals</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {(activeCategory !== "all" ||
              selectedBrand !== "all" ||
              selectedAvailability !== "all" ||
              sortBy !== "featured") && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            )}
          </div>

          <span className={styles.countLabel}>
            Showing {filteredProducts.length} curated {filteredProducts.length === 1 ? "product" : "products"}
          </span>
        </div>
      </section>

      {/* Product Grid */}
      <section className={styles.productsSection}>
        {filteredProducts.length > 0 ? (
          <div className={styles.grid}>
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onQuickView={(p) => setSelectedProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyTitle}>No matching items found</h3>
            <p className={styles.emptyText}>
              We couldn&apos;t find any products matching your specific combination of filters. Try widening your criteria.
            </p>
            <button
              type="button"
              className={styles.clearFiltersBtn}
              onClick={resetFilters}
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      <QuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Footer />
    </main>
  );
}

export default function CollectionsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)" }} />}>
      <CollectionsContent />
    </Suspense>
  );
}
