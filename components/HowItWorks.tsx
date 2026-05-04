"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    num: "01",
    title: "Paste Your Essay",
    text: "Paste your IELTS Task 1 or Task 2 essay into our intelligent editor. No sign-up required for your first check.",
  },
  {
    num: "02",
    title: "AI Analyses & Scores",
    text: "Our AI examiner evaluates Grammar, Coherence, Lexical Resource, and Task Achievement—the four official IELTS criteria.",
  },
  {
    num: "03",
    title: "Learn & Improve",
    text: "Receive a personalized 21-day drill plan with upgraded sentences and Band 9.0 vocabulary replacements tailored to your weak points.",
  },
];

export default function HowItWorks() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="how-it-works" ref={ref} style={{ padding:"100px 24px", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition:"all 0.65s ease",
          marginBottom:60,
        }}>
          <div style={{
            display:"flex", alignItems:"center", gap:8,
            color:"#34D399", fontSize:"0.75rem", fontWeight:700,
            letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16,
          }}>
            <span style={{ display:"block", width:24, height:1, background:"#34D399" }} />
            Process
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700,
            letterSpacing:"-0.025em", lineHeight:1.15,
          }}>
            Three Steps to a{" "}
            <span style={{ color:"#34D399" }}>Higher Band Score</span>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:32 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              textAlign:"center",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: `all 0.65s ${i * 120}ms ease`,
            }}>
              <div style={{
                width:60, height:60, borderRadius:"50%",
                background:"linear-gradient(135deg,rgba(16,185,129,0.15),rgba(6,78,59,0.3))",
                border:"1px solid rgba(16,185,129,0.25)",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Playfair Display',serif",
                fontSize:"1.4rem", fontWeight:700, color:"#34D399",
                margin:"0 auto 20px",
              }}>{s.num}</div>
              <div style={{ fontSize:"1.05rem", fontWeight:600, marginBottom:10 }}>{s.title}</div>
              <p style={{ fontSize:"0.875rem", color:"rgba(255,255,255,0.45)", lineHeight:1.75 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
