"use client";

import { Navbar } from "@/components/Navbar";

export default function About() {
  return (
    <main>
      <Navbar />
      <div style={{ paddingTop: "15vh", paddingLeft: "5%", paddingRight: "5%", minHeight: "100vh" }}>
        <h1 className="h1-display" style={{ marginBottom: "2rem" }}>About Us</h1>
        <div style={{ maxWidth: "800px" }}>
          <p className="body-large" style={{ marginBottom: "2rem" }}>
            SMOQUEE brings together carefully selected imported products, premium accessories and unexpected finds under one roof.
          </p>
          <p className="body-base">
            Located on Thanisandra Main Road, Bengaluru, we curate global flavors and rare scents to provide a truly unapologetic retail experience. 
            Our mission is to bridge the gap between everyday luxury and exclusive imported goods.
          </p>
        </div>
      </div>
    </main>
  );
}
