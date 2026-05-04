"use client";
import { Sparkles, Send, Instagram, Youtube, Twitter } from "lucide-react";

const footerLinks = {
  Product: ["How It Works", "AI Grading Demo", "Pricing", "21-Day Bootcamp"],
  Resources: ["IELTS Writing Tips", "Band 9 Templates", "Sample Essays", "Blog"],
  Company: ["About Us", "Privacy Policy", "Terms of Service", "Contact"],
};

const socials = [
  { icon: Send, label: "Telegram", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Youtube, label: "YouTube", href: "#" },
  { icon: Twitter, label: "Twitter / X", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{
      position: "relative", zIndex: 1,
      borderTop: "1px solid rgba(255,255,255,0.07)",
    }}>
      {/* Top glow line */}
      <div style={{
        height: 1,
        background: "linear-gradient(90deg,transparent,rgba(16,185,129,0.4),transparent)",
        marginBottom: 0,
      }} />

      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "72px 24px 40px",
      }}>
        {/* Main grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr repeat(3, 1fr)",
          gap: 48, marginBottom: 64,
        }}>
          {/* Brand col */}
          <div>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11,
                background: "linear-gradient(135deg,#10B981,#047857)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(16,185,129,0.25)",
              }}>
                <Sparkles size={18} color="#fff" />
              </div>
              <span style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "1.15rem", fontWeight: 700, color: "#fff",
              }}>
                IELTS Writing <span style={{ color: "#34D399" }}>Master</span>
              </span>
            </div>

            <p style={{
              fontSize: "0.9rem", color: "rgba(255,255,255,0.42)",
              lineHeight: 1.8, maxWidth: 280, marginBottom: 24,
            }}>
              Empowering Uzbekistan&apos;s future leaders — one band point at a time. AI-powered IELTS writing coaching built for real results.
            </p>

            {/* Socials */}
            <div style={{ display: "flex", gap: 10 }}>
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} title={label} style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "rgba(255,255,255,0.45)",
                  textDecoration: "none",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(16,185,129,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(16,185,129,0.3)";
                  (e.currentTarget as HTMLElement).style.color = "#34D399";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <div style={{
                fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.3)", marginBottom: 18,
              }}>{category}</div>
              <ul style={{ listStyle: "none" }}>
                {links.map(link => (
                  <li key={link} style={{ marginBottom: 10 }}>
                    <a href="#" style={{
                      color: "rgba(255,255,255,0.48)",
                      textDecoration: "none", fontSize: "0.875rem",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={e => (e.target as HTMLElement).style.color = "#e2f5ee"}
                    onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.48)"}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter strip */}
        <div style={{
          background: "linear-gradient(135deg,rgba(6,78,59,0.4),rgba(16,185,129,0.08))",
          border: "1px solid rgba(16,185,129,0.2)",
          borderRadius: 18, padding: "28px 32px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 20,
          marginBottom: 48,
        }}>
          <div>
            <div style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 4 }}>
              Get free IELTS writing tips every week
            </div>
            <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)" }}>
              Join 8,000+ Uzbek students already improving their band score.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                padding: "10px 18px", borderRadius: 10,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "#e2f5ee", fontSize: "0.875rem",
                fontFamily: "'DM Sans',sans-serif",
                outline: "none", minWidth: 220,
              }}
            />
            <button style={{
              padding: "10px 22px", borderRadius: 10,
              background: "linear-gradient(135deg,#10B981,#047857)",
              border: "none", color: "#fff",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.875rem", fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.opacity = "0.88";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.transform = "";
            }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          flexWrap: "wrap", gap: 12,
        }}>
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.2)" }}>
            © 2025 IELTS Writing Master. All rights reserved.
          </div>
          <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.2)", textAlign: "center" }}>
            Not affiliated with the British Council, IDP, or Cambridge Assessment English.
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Cookies"].map(l => (
              <a key={l} href="#" style={{
                fontSize: "0.78rem", color: "rgba(255,255,255,0.28)",
                textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)"}
              onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.28)"}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
