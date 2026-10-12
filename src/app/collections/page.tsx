"use client";

import { Navbar } from "@/components/Navbar";

export default function Collections() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "15vh", paddingLeft: "5%", paddingRight: "5%", minHeight: "100vh" }}>
        <h1 className="h1-display" style={{ marginBottom: "2rem" }}>Collections</h1>
        <p className="body-large">Browse our curated selection of imported chocolates, perfumes, and premium smoke accessories.</p>
        
        {/* Placeholder for actual collections grid */}
        <div style={{ marginTop: "4rem", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "2rem" }}>
           <div style={{ height: "400px", backgroundColor: "var(--bg-secondary)", borderRadius: "4px" }}></div>
           <div style={{ height: "400px", backgroundColor: "var(--bg-secondary)", borderRadius: "4px" }}></div>
           <div style={{ height: "400px", backgroundColor: "var(--bg-secondary)", borderRadius: "4px" }}></div>
           <div style={{ height: "400px", backgroundColor: "var(--bg-secondary)", borderRadius: "4px" }}></div>
        </div>
      </div>
    </main>
  );
}
