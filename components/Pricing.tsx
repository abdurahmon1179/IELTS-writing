"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Check, X, ArrowRight, Zap } from "lucide-react";

const freeFeatures = [
  { text: "1 Free AI Essay Grading", included: true },
  { text: "Basic Error Highlighting", included: true },
  { text: "3-Day Basic Writing Roadmap", included: true },
  { text: "Band Score Estimate", included: true },
  { text: "21-Day Intensive Bootcamp", included: false },
  { text: "Band 9.0 Vocabulary Upgrade", included: false },
  { text: "Unlimited AI Feedback", included: false },
];

const paidFeatures = [
  { text: "Unlimited AI Essay Grading", included: true },
  { text: "21-Day Intensive Writing Bootcamp", included: true },
  { text: "Task 1 & Task 2 Band 9 Templates", included: true },
  { text: "Band 9.0 Vocabulary Upgrade Engine", included: true },
  { text: "Coherence & Cohesion Deep Analysis", included: true },
  { text: "Grammar Error Pattern Tracking", included: true },
  { text: "Personalized Weekly Progress Report", included: true },
];

export default function Pricing() {
  const { ref, visible } = useScrollReveal();

  return (
    <section
      id="pricing"
      ref={ref}
      style={{ padding: "100px 24px", position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", textAlign: "center" }}>

        {/* Header */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.65s ease",
        }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            color: "#34D399", fontSize: "0.75rem", fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16,
          }}>
            <span style={{ width: 24, height: 1, background: "#34D399", display: "block" }} />
            Simple Pricing
            <span style={{ width: 24, height: 1, background: "#34D399", display: "block" }} />
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display',serif",
            fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 700,
            letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 14,
          }}>
            Start Free. Master with{" "}
            <span style={{ color: "#34D399" }}>Mastery Plan.</span>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: "1.05rem",
            maxWidth: 500, margin: "0 auto",
          }}>
            No hidden fees. Cancel anytime. One month of focused effort, one band score higher.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 24, maxWidth: 820,
          margin: "60px auto 0",
        }}>
          {/* Free Card */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.10)",
            borderRadius: 24, padding: 40,
            backdropFilter: "blur(16px)",
            textAlign: "left",
            transition: "all 0.3s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 40px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "none";
          }}>
            <div style={{
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12,
            }}>Starter</div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
              <span style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "3rem", fontWeight: 700, lineHeight: 1,
              }}>Free</span>
            </div>

            <p style={{
              fontSize: "0.875rem", color: "rgba(255,255,255,0.4)",
              marginBottom: 32, lineHeight: 1.65,
            }}>
              Test the AI before you commit. See exactly what&apos;s holding back your score.
            </p>

            <ul style={{ listStyle: "none", marginBottom: 36 }}>
              {freeFeatures.map((f, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "9px 0",
                  borderBottom: i < freeFeatures.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  fontSize: "0.9rem",
                  color: f.included ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.22)",
                  lineHeight: 1.5,
                }}>
                  {f.included
                    ? <Check size={16} color="#34D399" style={{ flexShrink: 0, marginTop: 2 }} />
                    : <X size={16} color="rgba(255,255,255,0.18)" style={{ flexShrink: 0, marginTop: 2 }} />
                  }
                  {f.text}
                </li>
              ))}
            </ul>

            <button style={{
              width: "100%", padding: 14, borderRadius: 12,
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.75)",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.95rem", fontWeight: 600, cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.11)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
              (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)";
            }}>
              Start for Free
            </button>
          </div>

          {/* Mastery Card */}
          <div style={{
            position: "relative",
            background: "linear-gradient(135deg,rgba(6,78,59,0.65),rgba(4,120,87,0.3))",
            border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 24, padding: 40,
            backdropFilter: "blur(16px)",
            textAlign: "left",
            boxShadow: "0 0 0 1px rgba(16,185,129,0.08), 0 30px 60px rgba(0,0,0,0.35), 0 0 80px rgba(16,185,129,0.08)",
            transition: "all 0.3s ease",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-6px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(16,185,129,0.2), 0 40px 80px rgba(0,0,0,0.4), 0 0 120px rgba(16,185,129,0.14)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(16,185,129,0.08), 0 30px 60px rgba(0,0,0,0.35), 0 0 80px rgba(16,185,129,0.08)";
          }}>

            {/* Most Popular badge */}
            <div style={{
              position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
              background: "linear-gradient(135deg,#10B981,#047857)",
              color: "#fff", fontSize: "0.7rem", fontWeight: 700,
              letterSpacing: "0.08em", textTransform: "uppercase",
              padding: "5px 18px", borderRadius: 9999,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 15px rgba(16,185,129,0.35)",
            }}>✦ Most Popular</div>

            <div style={{
              fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 12,
            }}>Mastery Plan</div>

            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 10 }}>
              <span style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)" }}>UZS</span>
              <span style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "3rem", fontWeight: 700, lineHeight: 1,
                color: "#34D399",
              }}>89,000</span>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.38)" }}>/month</span>
            </div>

            {/* Value callout */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "rgba(16,185,129,0.1)",
              border: "1px solid rgba(16,185,129,0.2)",
              borderRadius: 9999, padding: "4px 12px",
              fontSize: "0.72rem", fontWeight: 600, color: "#34D399",
              marginBottom: 18,
            }}>
              <Zap size={12} /> ≈ $7 USD · Less than a coffee per week
            </div>

            <p style={{
              fontSize: "0.875rem", color: "rgba(255,255,255,0.45)",
              marginBottom: 32, lineHeight: 1.65,
            }}>
              Everything you need for a Band 7+ score. The complete 21-day transformation system.
            </p>

            <ul style={{ listStyle: "none", marginBottom: 36 }}>
              {paidFeatures.map((f, i) => (
                <li key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "9px 0",
                  borderBottom: i < paidFeatures.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  fontSize: "0.9rem",
                  color: "rgba(255,255,255,0.82)",
                  lineHeight: 1.5,
                }}>
                  <Check size={16} color="#34D399" style={{ flexShrink: 0, marginTop: 2 }} />
                  {f.text}
                </li>
              ))}
            </ul>

            <button style={{
              width: "100%", padding: 14, borderRadius: 12,
              background: "linear-gradient(135deg,#10B981,#047857)",
              border: "none", color: "#fff",
              fontFamily: "'DM Sans',sans-serif",
              fontSize: "0.95rem", fontWeight: 700, cursor: "pointer",
              boxShadow: "0 8px 24px rgba(16,185,129,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              transition: "all 0.25s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 32px rgba(16,185,129,0.5)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(16,185,129,0.3)";
            }}>
              <ArrowRight size={18} />
              Start 21-Day Mastery
            </button>
          </div>
        </div>

        {/* Fine print */}
        <p style={{
          marginTop: 28,
          fontSize: "0.78rem", color: "rgba(255,255,255,0.22)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.65s 0.3s ease",
        }}>
          89,000 UZS ≈ $7 USD · Secure payment via Payme & Click · Cancel anytime · No contracts
        </p>
      </div>
    </section>
  );
}
