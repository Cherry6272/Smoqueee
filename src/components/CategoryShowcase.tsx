"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./CategoryShowcase.module.css";

const categories = [
  {
    id: "01",
    title: "Imported Chocolates",
    description: "Global flavours. Curated locally.",
    count: 24,
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000",
  },
  {
    id: "02",
    title: "Imported Perfumes",
    description: "Scents that stand apart.",
    count: 18,
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000",
  },
  {
    id: "03",
    title: "Smoke Accessories",
    description: "Premium accessories for your setup.",
    count: 36,
    image: "https://images.unsplash.com/photo-1599427210986-e9c522198083?q=80&w=1000",
  },
  {
    id: "04",
    title: "Curated Finds",
    description: "Unexpected products worth discovering.",
    count: 12,
    image: "https://images.unsplash.com/photo-1618220179428-2b79f180ce5d?q=80&w=1000", // Using a nice lifestyle/curated object image
  },
];

export function CategoryShowcase() {
  return (
    <section className={styles.showcase}>
      {categories.map((category, index) => (
        <CategoryItem key={category.id} category={category} index={index} />
      ))}
    </section>
  );
}

function CategoryItem({ category, index }: { category: any; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div 
      ref={ref} 
      className={styles.category}
      style={{ opacity, y }}
    >
      <div className={styles.categoryHeader}>
        <span className={styles.number}>{category.id}</span>
        <h2 className={styles.title}>{category.title}</h2>
      </div>
      
      <p className={styles.description}>{category.description}</p>
      
      <a href={`/collections/${category.title.toLowerCase().replace(" ", "-")}`} className={styles.exploreBtn}>
        Explore Collection <ArrowRight size={16} />
      </a>

      <div className={styles.visualContainer}>
        <Image 
          src={category.image} 
          alt={category.title} 
          fill 
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </div>
    </motion.div>
  );
}
