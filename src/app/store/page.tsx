"use client";

import { Navbar } from "@/components/Navbar";
import { StoreLocation } from "@/components/StoreLocation";
import { Footer } from "@/components/Footer";

export default function StorePage() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "10vh" }}>
      <Navbar />
      <StoreLocation />
      <Footer />
    </main>
  );
}
