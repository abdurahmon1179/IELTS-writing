"use client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const feedbacks = [
  {
    type: "Grammar Error — Countable Noun",
    typeColor: "#F87171",
    original: '"many peoples believe"',
    improved: '"a significant proportion of individuals contend"',
    explain: "'People' is already plural — 'peoples' is incorrect. The upgraded phrase simultaneously fixes grammar and elevates your Lexical Resource score.",
    badge: "Band 9.0",
  },
  {
    type: "Vocabulary — Lexical Resource",
    typeColor: "#F59E0B",
    original: '"technology is very important for education"',
    improved: '"technological integration has become indispensable to modern pedagogy"',
    explain: "Replacing 'very important' with 'indispensable' and using 'pedagogy' demonstrates sophisticated academic range.",
    badge: "+0.5 Band",
  },
  {
    type: "Coherence — Paragraph Linking",
    typeColor: "#34D399",
    original: '"Also, they can watch educational videos"',
    improved: '"Furthermore, the proliferation of multimedia learning platforms enables students to engage with complex concepts"',
    explain: "Replace abrupt 'Also' with a cohesive linking phrase. This also expands your idea—a key Task Achievement requirement.",
    badge: "Band 9.0",
  },
];

export default function AIShowcase() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="showcase" ref={ref} style={{ padding:"100px 24px", position:"relative", zIndex:1 }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        {/* Header */}
        <div style={{
          textAlign:"center", marginBottom:16,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition:"all 0.65s ease",
        }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            color:"#34D399", fontSize:"0.75rem", fontWeight:700,
            letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:16,
          }}>
            <span style={{ width:24, height:1, background:"#34D399", display:"block" }} />
            AI Feedback Demo
            <span style={{ width:24, height:1, background:"#34D399", display:"block" }} />
          </div>
          <h2 style={{
            fontFamily:"'Playfair Display',serif",
            fontSize:"clamp(2rem,4vw,3rem)", fontWeight:700,
            letterSpacing:"-0.025em", lineHeight:1.15, marginBottom:12,
          }}>
            Watch the AI{" "}
            <span style={{ color:"#34D399" }}>Transform Your Writing</span>
          </h2>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"1.05rem", maxWidth:520, margin:"0 auto" }}>
            Every underline is an opportunity. Every suggestion is a Band point gained.
          </p>
        </div>

        {/* Editor mockup */}
        <div style={{
          marginTop:60,
          background:"rgba(2,20,14,0.85)",
          border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:24, overflow:"hidden",
          boxShadow:"0 40px 80px rgba(0,0,0,0.5)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition:"all 0.7s 0.1s ease",
        }}>
          {/* Topbar */}
          <div style={{
            background:"rgba(255,255,255,0.03)",
            borderBottom:"1px solid rgba(255,255,255,0.06)",
            padding:"14px 20px",
            display:"flex", alignItems:"center", gap:8,
          }}>
            {[["#FF5F56",""], ["#FFBD2E",""], ["#27C93F",""]].map(([c],i) => (
              <div key={i} style={{ width:12, height:12, borderRadius:"50%", background:c }} />
            ))}
            <span style={{
              marginLeft:12, fontSize:"0.78rem",
              color:"rgba(255,255,255,0.3)",
              fontFamily:"'DM Mono',monospace",
            }}>
              ielts-task2-essay.txt — IELTS Writing Master AI Editor
            </span>
            <div style={{ marginLeft:"auto" }}>
              <span style={{
                background:"rgba(16,185,129,0.15)",
                border:"1px solid rgba(16,185,129,0.3)",
                color:"#34D399", fontSize:"0.7rem", fontWeight:700,
                padding:"3px 10px", borderRadius:9999,
              }}>✦ Analysing…</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
            {/* Left — essay */}
            <div style={{
              padding:28,
              borderRight:"1px solid rgba(255,255,255,0.06)",
              fontSize:"0.9rem", lineHeight:1.9,
              color:"rgba(255,255,255,0.75)",
            }}>
              <div style={{
                display:"flex", alignItems:"center", gap:8,
                marginBottom:20, fontSize:"0.7rem", fontWeight:700,
                letterSpacing:"0.08em", textTransform:"uppercase",
                color:"rgba(255,255,255,0.28)",
              }}>
                📄 Student&apos;s Essay — Task 2
              </div>
              <p>
                Nowadays,{" "}
                <span className="underline-red">many peoples</span>{" "}
                believe that technology is{" "}
                <span className="underline-yellow">very important</span>{" "}
                for <span className="underline-red">education</span>.
                In my opinion, this view is{" "}
                <span className="underline-yellow">absolutely right</span>{" "}
                because technology gives many{" "}
                <span className="underline-yellow">good</span>{" "}
                things to students.
              </p>
              <br/>
              <p>
                First of all, students can{" "}
                <span className="underline-yellow">do research</span>{" "}
                on the internet.{" "}
                <span className="underline-red">Also,</span>{" "}
                they can watch{" "}
                <span className="underline-yellow">educational videos</span>{" "}
                which{" "}
                <span className="underline-red">is</span>{" "}
                very helpful for{" "}
                <span className="underline-yellow">very</span>{" "}
                difficult subjects.
              </p>
              <br/>
              <p>
                In conclusion, I{" "}
                <span className="underline-yellow">think</span>{" "}
                that technology is{" "}
                <span className="underline-yellow">good</span>{" "}
                for education.{" "}
                <span className="underline-red">The government should support it.</span>
              </p>
              <div style={{
                display:"flex", gap:10, alignItems:"center",
                paddingTop:16, marginTop:16,
                borderTop:"1px solid rgba(255,255,255,0.06)",
                flexWrap:"wrap",
              }}>
                {[
                  { label:"4 Grammar Errors", bg:"rgba(248,113,113,0.1)", border:"rgba(248,113,113,0.2)", color:"#F87171" },
                  { label:"5 Vocabulary Upgrades", bg:"rgba(245,158,11,0.1)", border:"rgba(245,158,11,0.2)", color:"#F59E0B" },
                ].map(t => (
                  <div key={t.label} style={{
                    background:t.bg, border:`1px solid ${t.border}`,
                    borderRadius:8, padding:"8px 14px",
                    fontSize:"0.78rem", fontWeight:600, color:t.color,
                  }}>{t.label}</div>
                ))}
              </div>
            </div>

            {/* Right — AI feedback */}
            <div style={{ padding:28, background:"rgba(0,0,0,0.18)" }}>
              <div style={{
                display:"flex", alignItems:"center", justifyContent:"space-between",
                marginBottom:18,
              }}>
                <div>
                  <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>
                    Estimated Band Score
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.4rem", fontWeight:700, color:"#F87171", lineHeight:1 }}>5.0</div>
                </div>
                <div style={{ textAlign:"right" }}>
                  <div style={{ fontSize:"0.7rem", color:"rgba(255,255,255,0.3)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:4 }}>
                    After AI Coaching
                  </div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"2.4rem", fontWeight:700, color:"#34D399", lineHeight:1 }}>7.5+</div>
                </div>
              </div>

              {feedbacks.map((f, i) => (
                <div key={i} style={{
                  background:"rgba(255,255,255,0.05)",
                  border:"1px solid rgba(255,255,255,0.08)",
                  borderRadius:14, padding:18, marginBottom:14,
                  backdropFilter:"blur(10px)",
                  transition:"all 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor="rgba(16,185,129,0.3)";
                  (e.currentTarget as HTMLElement).style.transform="translateX(3px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.transform="";
                }}>
                  <div style={{
                    fontSize:"0.7rem", fontWeight:700,
                    letterSpacing:"0.06em", textTransform:"uppercase",
                    color:f.typeColor, marginBottom:8,
                  }}>{f.type}</div>
                  <div style={{
                    fontSize:"0.82rem", color:"rgba(255,255,255,0.4)",
                    fontFamily:"'DM Mono',monospace",
                    padding:"8px 12px", background:"rgba(248,113,113,0.06)",
                    borderRadius:8, borderLeft:"2px solid #F87171",
                    lineHeight:1.6, marginBottom:10,
                    textDecoration:"line-through",
                    textDecorationColor:"rgba(248,113,113,0.5)",
                  }}>{f.original}</div>
                  <div style={{
                    fontSize:"0.82rem", color:"#6EE7B7",
                    fontFamily:"'DM Mono',monospace",
                    padding:"8px 12px", background:"rgba(16,185,129,0.06)",
                    borderRadius:8, borderLeft:"2px solid #10B981",
                    lineHeight:1.6,
                  }}>{f.improved}</div>
                  <div style={{ fontSize:"0.8rem", color:"rgba(255,255,255,0.42)", marginTop:10, lineHeight:1.6 }}>
                    {f.explain}{" "}
                    <span style={{
                      display:"inline-flex", alignItems:"center", gap:3,
                      background:"linear-gradient(135deg,rgba(245,158,11,0.18),rgba(252,211,77,0.08))",
                      border:"1px solid rgba(245,158,11,0.28)",
                      borderRadius:9999, padding:"2px 9px",
                      fontSize:"0.68rem", fontWeight:700, color:"#FCD34D",
                    }}>{f.badge} ✦</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
