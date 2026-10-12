"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/products";
import styles from "./CategoryShowcase.module.css";

export function CategoryShowcase() {
  return (
    <section className={styles.showcase}>
      {CATEGORIES.map((category, index) => (
        <CategoryItem key={category.id} category={category} index={index} />
      ))}
    </section>
  );
}

function CategoryItem({
  category,
  index,
}: {
  category: (typeof CATEGORIES)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);

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

      <Link
        href={`/collections?category=${category.slug}`}
        className={styles.exploreBtn}
      >
        Explore Collection <ArrowRight size={16} />
      </Link>

      <div className={styles.visualContainer}>
        <Image
          src={category.image}
          alt={category.title}
          fill
          style={{ objectFit: "cover" }}
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
      </div>
    </motion.div>
  );
}
