"use client";
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 max(24px, calc((100vw - 1200px) / 2))",
        background: scrolled ? "rgba(2,24,16,0.95)" : "rgba(2,44,34,0.65)",
        backdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.35)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <a href="#" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none" }}>
        <div style={{
          width:36, height:36, borderRadius:10,
          background: "linear-gradient(135deg, #10B981, #047857)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow: "0 0 20px rgba(16,185,129,0.3)",
        }}>
          <Sparkles size={18} color="#fff" />
        </div>
        <span style={{
          fontFamily:"'Playfair Display',serif",
          fontWeight:700, fontSize:"1.15rem",
          color:"#fff", letterSpacing:"-0.02em",
        }}>
          IELTS Writing <span style={{ color:"#34D399" }}>Master</span>
        </span>
      </a>

      {/* Nav */}
      <nav style={{ display:"flex", gap:4 }}>
        {["How it Works","Stats","Pricing"].map((item,i) => (
          <a key={i} href={["#how-it-works","#problem","#pricing"][i]}
            style={{
              color:"rgba(255,255,255,0.6)", textDecoration:"none",
              fontSize:"0.875rem", fontWeight:500,
              padding:"8px 16px", borderRadius:9999,
              transition:"all 0.2s",
            }}
            onMouseEnter={e => {
              (e.target as HTMLElement).style.color="#fff";
              (e.target as HTMLElement).style.background="rgba(255,255,255,0.08)";
            }}
            onMouseLeave={e => {
              (e.target as HTMLElement).style.color="rgba(255,255,255,0.6)";
              (e.target as HTMLElement).style.background="transparent";
            }}
          >{item}</a>
        ))}
      </nav>

      {/* CTAs */}
      <div style={{ display:"flex", gap:10 }}>
        <Link href="/sign-in" style={{
          padding:"8px 20px", borderRadius:9999,
          border:"1px solid rgba(255,255,255,0.12)",
          background:"transparent", color:"rgba(255,255,255,0.8)",
          fontSize:"0.875rem", fontWeight:500, cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s",
          textDecoration:"none", display:"inline-block",
        }}>Sign In</Link>
        <Link href="/sign-up" style={{
          padding:"8px 22px", borderRadius:9999,
          background:"linear-gradient(135deg,#10B981,#047857)",
          border:"none", color:"#fff",
          fontSize:"0.875rem", fontWeight:600, cursor:"pointer",
          fontFamily:"'DM Sans',sans-serif",
          boxShadow:"0 4px 15px rgba(16,185,129,0.25)",
          transition:"all 0.2s",
          textDecoration:"none", display:"inline-block",
        }}>Sign Up Free</Link>
      </div>
    </header>
  );
}
