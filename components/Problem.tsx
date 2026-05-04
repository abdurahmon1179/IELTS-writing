"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const cards = [
  {
    emoji: "⚠️",
    iconBg: "rgba(239,68,68,0.12)", iconColor: "#F87171",
    title: "Grammar Traps",
    text: "Article errors (a/the), subject-verb disagreement, and incorrect conditionals cost test-takers 0.5–1.0 band points they never see coming.",
  },
  {
    emoji: "🔗",
    iconBg: "rgba(245,158,11,0.12)", iconColor: "#F59E0B",
    title: "Coherence Issues",
    text: "Repeating 'However, Furthermore, In conclusion' signals low coherence to examiners. Your ideas exist—your linking doesn't flow.",
  },
  {
    emoji: "📖",
    iconBg: "rgba(99,102,241,0.12)", iconColor: "#818CF8",
    title: "Vocabulary Weakness",
    text: "Overusing basic words like 'big,' 'good,' and 'important' instead of 'substantial,' 'advantageous,' and 'pivotal' directly lowers your Lexical Resource score.",
  },
];

export default function Problem() {
  const { ref, visible } = useScrollReveal();
  return (
    <section id="problem" ref={ref} style={{
      padding:"100px 24px", position:"relative", zIndex:1,
      background:"linear-gradient(180deg,transparent,rgba(6,78,59,0.12),transparent)",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition:"all 0.65s ease",
        }}>
          <div style={{
            display:"flex", alignItems:"center", gap:8,
            color:"#34D399", fontSize:"0.75rem", fontWeight:700,
            letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16,
          }}>
            <span style={{ width:24, height:1, background:"#34D399", display:"block" }} />
            The Reality
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700,
            letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:12,
          }}>
            Uzbekistan&apos;s Silent{" "}
            <span style={{ color:"#F87171" }}>IELTS Writing Crisis</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"1.05rem", maxWidth:520 }}>
            Writing consistently scores the lowest of all four IELTS skills among Uzbek test-takers. Here&apos;s why.
          </p>
        </div>

        {/* Score banner */}
        <div style={{
          marginTop:48, marginBottom:48,
          background:"linear-gradient(135deg,rgba(239,68,68,0.07),rgba(245,158,11,0.07))",
          border:"1px solid rgba(239,68,68,0.2)",
          borderRadius:16, padding:"24px 32px",
          display:"flex", alignItems:"center", gap:24, flexWrap:"wrap",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition:"all 0.65s 0.1s ease",
        }}>
          <div style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"4rem", fontWeight:900, color:"#F87171", lineHeight:1,
          }}>5.7</div>
          <div>
            <div style={{ fontSize:"1rem", fontWeight:600, color:"rgba(255,255,255,0.85)" }}>
              Average IELTS Writing Band — Uzbekistan
            </div>
            <div style={{ fontSize:"0.85rem", color:"rgba(255,255,255,0.4)", marginTop:4 }}>
              vs. 6.4 national average for Reading · Source: IDP & British Council 2024 regional data
            </div>
            <div style={{ marginTop:10, display:"flex", gap:8, flexWrap:"wrap" }}>
              {["0.7 below Reading","Most Retested Skill"].map(t => (
                <span key={t} style={{
                  background:"rgba(248,113,113,0.1)",
                  border:"1px solid rgba(248,113,113,0.25)",
                  color:"#F87171", fontSize:"0.72rem", fontWeight:700,
                  padding:"3px 12px", borderRadius:9999,
                }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:20 }}>
          {cards.map((c, i) => (
            <div key={i} className="problem-card" style={{
              background:"rgba(255,255,255,0.06)",
              border:"1px solid rgba(255,255,255,0.10)",
              borderRadius:20, padding:32,
              backdropFilter:"blur(16px)",
              transition:"all 0.3s ease",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition2: `all 0.65s ${(i + 1) * 120}ms ease`,
            } as React.CSSProperties}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform="translateY(-6px)";
              (e.currentTarget as HTMLElement).style.borderColor="rgba(16,185,129,0.25)";
              (e.currentTarget as HTMLElement).style.boxShadow="0 20px 40px rgba(0,0,0,0.3)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform="";
              (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.10)";
              (e.currentTarget as HTMLElement).style.boxShadow="";
            }}>
              <div style={{
                width:48, height:48, borderRadius:14,
                background:c.iconBg, color:c.iconColor,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:22, marginBottom:20,
              }}>{c.emoji}</div>
              <div style={{ fontSize:"1.1rem", fontWeight:600, marginBottom:10 }}>{c.title}</div>
              <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.9rem", lineHeight:1.75 }}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
