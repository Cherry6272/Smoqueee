"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import styles from "./FeaturedEdit.module.css";
import { ProductCard, Product } from "./ProductCard";

const sampleProducts: Product[] = [
  {
    id: "p1",
    name: "Limited Edition Cohiba",
    category: "Smoke Accessories",
    description: "Premium handcrafted accessory for the connoisseur.",
    price: "₹12,499",
    tags: ["Premium", "Limited"],
    availability: "Limited",
    mainImage: "https://images.unsplash.com/photo-1629813350106-cf732fa1d596?q=80&w=1000",
  },
  {
    id: "p2",
    name: "Tom Ford Oud Wood",
    category: "Imported Perfumes",
    description: "Rare. Exotic. Distinctive. One of the most rare, precious, and expensive ingredients in a perfumer's arsenal.",
    price: "₹24,500",
    tags: ["Luxury", "Bestseller"],
    availability: "In Stock",
    mainImage: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000",
  },
  {
    id: "p3",
    name: "Amedei Porcelana",
    category: "Imported Chocolates",
    description: "Often called the world's most expensive chocolate, made from a translucent, white cocoa bean.",
    price: "₹1,850",
    tags: ["Rare", "Award Winning"],
    availability: "In Stock",
    mainImage: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000",
  }
];

export function FeaturedEdit() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.subtitle}>Curated Selection</span>
          <h2 className={styles.title}>The Smoquee Edit</h2>
        </div>
        
        <a href="/collections" className={styles.exploreAll}>
          Explore The Edit <ArrowRight size={16} />
        </a>
      </div>

      <div className={styles.grid}>
        <motion.div 
          className={styles.featuredItem}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Image 
            src="https://images.unsplash.com/photo-1512413916960-466d03a3d242?q=80&w=1000" 
            alt="The Obsidian Collection" 
            fill 
            style={{ objectFit: 'cover', zIndex: 0 }}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', zIndex: 1 }} />
          <div className={styles.featuredItemInner}>
            <span className={styles.featuredCategory}>Featured</span>
            <h3 className={styles.featuredTitle}>The Obsidian Collection</h3>
            <p className={styles.featuredDesc}>
              Discover our newest arrival of matte black premium smoke accessories and dark chocolate pairings.
            </p>
            <button className={styles.featuredBtn}>
              Shop Collection <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        <div className={styles.subGrid}>
          {sampleProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
