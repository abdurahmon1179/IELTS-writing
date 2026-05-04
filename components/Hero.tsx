"use client";
import { useEffect, useRef } from "react";
import { Zap, Play, ChevronDown } from "lucide-react";

const stats = [
  { num: 97, suffix: "%", label: "Accuracy vs Human Examiner" },
  { num: 1.4, suffix: "", label: "Average Band Increase", decimal: true },
  { num: 21, suffix: "", label: "Day Intensive Bootcamp" },
  { num: 12, suffix: "k+", label: "Essays Graded This Month" },
];

export default function Hero() {
  const countersRef = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated.current) {
          animated.current = true;
          stats.forEach((s, i) => {
            const el = document.getElementById(`stat-${i}`);
            if (!el) return;
            const start = performance.now();
            const duration = 1800;
            const update = (now: number) => {
              const t = Math.min((now - start) / duration, 1);
              const ease = 1 - Math.pow(1 - t, 3);
              const val = ease * s.num;
              el.textContent = (s.decimal ? val.toFixed(1) : Math.floor(val)) + s.suffix;
              if (t < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
          });
        }
      },
      { threshold: 0.4 }
    );
    if (countersRef.current) observer.observe(countersRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative", textAlign: "center", zIndex: 1,
      }}
    >
      {/* Ambient orbs */}
      {[
        { w:700, h:700, bg:"rgba(6,78,59,0.4)",  top:"-200px", right:"-200px", left:"auto", bottom:"auto" },
        { w:500, h:500, bg:"rgba(16,185,129,0.1)", bottom:"10%", left:"-150px", top:"auto", right:"auto" },
        { w:400, h:400, bg:"rgba(245,158,11,0.06)", top:"50%", left:"50%", bottom:"auto", right:"auto" },
      ].map((o, i) => (
        <div key={i} style={{
          position:"fixed", borderRadius:"50%",
          filter:"blur(120px)", pointerEvents:"none", zIndex:0,
          width:o.w, height:o.h,
          background:`radial-gradient(circle, ${o.bg} 0%, transparent 70%)`,
          top:o.top, right:o.right, bottom:o.bottom, left:o.left,
          transform: i===2 ? "translate(-50%,-50%)" : undefined,
        }} />
      ))}

      <div style={{ maxWidth:780, margin:"0 auto", position:"relative", zIndex:1 }}>
        {/* Eyebrow */}
        <div className="animate-fade-up" style={{
          display:"inline-flex", alignItems:"center", gap:8,
          background:"rgba(16,185,129,0.1)",
          border:"1px solid rgba(16,185,129,0.25)",
          borderRadius:9999, padding:"6px 16px",
          fontSize:"0.78rem", fontWeight:600,
          color:"#34D399", letterSpacing:"0.05em", textTransform:"uppercase",
          marginBottom:28,
        }}>
          <div className="animate-pulse-dot" style={{
            width:6, height:6, borderRadius:"50%", background:"#34D399",
          }} />
          AI-Powered IELTS Preparation — Built for Uzbekistan
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-100" style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:"clamp(2.6rem, 6vw, 5rem)",
          fontWeight:900, lineHeight:1.08,
          letterSpacing:"-0.03em", marginBottom:24,
        }}>
          Writing is the Hardest<br/>
          Part of IELTS.<br/>
          <span style={{
            background:"linear-gradient(135deg,#34D399,#F59E0B)",
            WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text",
          }}>Our AI Makes it the Easiest.</span>
        </h1>

        {/* Sub */}
        <p className="animate-fade-up delay-200" style={{
          fontSize:"clamp(1rem,2vw,1.2rem)",
          color:"rgba(255,255,255,0.55)",
          maxWidth:580, margin:"0 auto 40px",
          lineHeight:1.75,
        }}>
          Get instant band scores, detailed error analysis, and 21-day personalized writing drills designed to take you from Band 5 to Band 7+.
        </p>

        {/* CTAs */}
        <div className="animate-fade-up delay-300" style={{
          display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap",
        }}>
          <button style={{
            position:"relative",
            padding:"16px 36px", borderRadius:9999,
            background:"linear-gradient(135deg,#10B981,#047857)",
            border:"none", color:"#fff",
            fontFamily:"'DM Sans',sans-serif",
            fontSize:"1rem", fontWeight:600, cursor:"pointer",
            boxShadow:"0 8px 30px rgba(16,185,129,0.35)",
            display:"inline-flex", alignItems:"center", gap:8,
            transition:"all 0.25s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform="translateY(-2px)";
            (e.currentTarget as HTMLElement).style.boxShadow="0 16px 40px rgba(16,185,129,0.5)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform="";
            (e.currentTarget as HTMLElement).style.boxShadow="0 8px 30px rgba(16,185,129,0.35)";
          }}>
            {/* Glow ring */}
            <span className="animate-glow-pulse" style={{
              position:"absolute", inset:-3, borderRadius:9999,
              background:"linear-gradient(135deg,#34D399,#F59E0B)",
              zIndex:-1,
            }} />
            <Zap size={18} />&nbsp;Check My Essay for Free
          </button>

          <button style={{
            padding:"16px 32px", borderRadius:9999,
            background:"rgba(255,255,255,0.06)",
            border:"1px solid rgba(255,255,255,0.14)",
            color:"rgba(255,255,255,0.82)",
            fontFamily:"'DM Sans',sans-serif",
            fontSize:"1rem", fontWeight:500, cursor:"pointer",
            display:"inline-flex", alignItems:"center", gap:8,
            transition:"all 0.25s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.1)";
            (e.currentTarget as HTMLElement).style.transform="translateY(-1px)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.06)";
            (e.currentTarget as HTMLElement).style.transform="";
          }}>
            <Play size={16} />&nbsp;See How It Works
          </button>
        </div>

        {/* Stats */}
        <div ref={countersRef} className="animate-fade-up delay-400" style={{
          display:"flex", gap:48, justifyContent:"center", flexWrap:"wrap",
          marginTop:72, paddingTop:48,
          borderTop:"1px solid rgba(255,255,255,0.08)",
        }}>
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign:"center" }}>
              <div id={`stat-${i}`} style={{
                fontFamily:"'Playfair Display',serif",
                fontSize:"2.5rem", fontWeight:700,
                color:"#34D399", lineHeight:1,
              }}>
                {s.decimal ? s.num.toFixed(1) : s.num}{s.suffix}
              </div>
              <div style={{
                fontSize:"0.78rem", color:"rgba(255,255,255,0.4)",
                marginTop:6, fontWeight:500, letterSpacing:"0.03em",
              }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        color:"rgba(255,255,255,0.22)", fontSize:"0.68rem", letterSpacing:"0.1em",
        zIndex:1,
      }}>
        <span>SCROLL</span>
        <span className="animate-bounce-y"><ChevronDown size={18} /></span>
      </div>
    </section>
  );
}
