"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(
        error.message.includes("Invalid login credentials")
          ? "Email yoki parol noto'g'ri. Qaytadan urinib ko'ring."
          : error.message
      );
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "13px 16px 13px 46px",
    borderRadius: 12,
    background: focused === name ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${focused === name ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.10)"}`,
    color: "#e2f5ee",
    fontSize: "0.95rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "all 0.2s",
    boxShadow: focused === name ? "0 0 0 3px rgba(16,185,129,0.08)" : "none",
  });

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Left panel ── */}
      <div className="auth-left-panel" style={{
        flex: "0 0 45%",
        background: "linear-gradient(160deg,#022c22 0%,#064E3B 50%,#022c22 100%)",
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", padding: "48px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position:"absolute",top:"-150px",left:"-100px",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,0.13) 0%,transparent 70%)",filter:"blur(80px)",pointerEvents:"none",zIndex:0 }} />
        <div style={{ position:"absolute",bottom:"-80px",right:"-80px",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 70%)",filter:"blur(80px)",pointerEvents:"none",zIndex:0 }} />

        {/* Logo */}
        <div style={{ position:"relative",zIndex:1 }}>
          <Link href="/" style={{ display:"inline-flex",alignItems:"center",gap:10,textDecoration:"none" }}>
            <div style={{ width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,#10B981,#047857)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 20px rgba(16,185,129,0.3)" }}>
              <Sparkles size={20} color="#fff" />
            </div>
            <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.2rem",fontWeight:700,color:"#fff" }}>
              IELTS Writing <span style={{ color:"#34D399" }}>Master</span>
            </span>
          </Link>
        </div>

        {/* Center */}
        <div style={{ position:"relative",zIndex:1 }}>
          <div style={{ background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.10)",borderRadius:20,padding:"28px 32px",backdropFilter:"blur(16px)",marginBottom:28 }}>
            <div style={{ fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:16 }}>Your Progress After 21 Days</div>
            <div style={{ display:"flex",alignItems:"center",gap:24 }}>
              {[{ label:"Task Achievement",before:5.0,after:7.5 },{ label:"Lexical Resource",before:4.5,after:7.0 }].map((item,i) => (
                <div key={i}>
                  <div style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",marginBottom:6 }}>{item.label}</div>
                  <div style={{ display:"flex",alignItems:"center",gap:8 }}>
                    <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,color:"#F87171" }}>{item.before}</span>
                    <ArrowRight size={14} color="rgba(255,255,255,0.25)" />
                    <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,color:"#34D399" }}>{item.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <blockquote style={{ background:"rgba(16,185,129,0.07)",border:"1px solid rgba(16,185,129,0.18)",borderRadius:16,padding:"22px 24px",backdropFilter:"blur(12px)" }}>
            <p style={{ fontSize:"0.95rem",lineHeight:1.75,color:"rgba(255,255,255,0.75)",fontStyle:"italic",marginBottom:14 }}>
              &ldquo;I went from Band 5.5 to Band 7.0 in writing in just 3 weeks. The AI feedback was more detailed than my human tutor!&rdquo;
            </p>
            <div style={{ display:"flex",alignItems:"center",gap:10 }}>
              <div style={{ width:36,height:36,borderRadius:"50%",background:"linear-gradient(135deg,#34D399,#047857)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",fontWeight:700,color:"#fff" }}>D</div>
              <div>
                <div style={{ fontSize:"0.85rem",fontWeight:600 }}>Dilnoza T.</div>
                <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.38)" }}>Tashkent · IELTS 7.0 ✦</div>
              </div>
            </div>
          </blockquote>
        </div>

        {/* Stats */}
        <div style={{ display:"flex",gap:32,position:"relative",zIndex:1 }}>
          {[{ num:"12k+",label:"Active Students" },{ num:"97%",label:"Satisfaction Rate" },{ num:"4.9★",label:"App Rating" }].map((s,i) => (
            <div key={i}>
              <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.6rem",fontWeight:700,color:"#34D399",lineHeight:1 }}>{s.num}</div>
              <div style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.38)",marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 40px",background:"#022c22",position:"relative" }}>
        <div style={{ position:"absolute",top:"20%",right:"-100px",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }} />

        <div style={{ width:"100%",maxWidth:420,position:"relative",zIndex:1 }}>

          {/* Header */}
          <div style={{ marginBottom:36 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.22)",borderRadius:9999,padding:"5px 14px",fontSize:"0.72rem",fontWeight:700,color:"#34D399",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:20 }}>
              <span style={{ width:5,height:5,borderRadius:"50%",background:"#34D399" }} />
              Welcome back
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2.2rem",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.15,marginBottom:10 }}>
              Sign In to Your<br />
              <span style={{ background:"linear-gradient(135deg,#34D399,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Dashboard</span>
            </h1>
            <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.45)",lineHeight:1.6 }}>Continue your 21-day journey to Band 7+</p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background:"rgba(248,113,113,0.08)",border:"1px solid rgba(248,113,113,0.25)",borderRadius:12,padding:"12px 16px",marginBottom:20,display:"flex",alignItems:"center",gap:10 }}>
              <AlertCircle size={16} color="#F87171" style={{ flexShrink:0 }} />
              <span style={{ fontSize:"0.875rem",color:"#F87171" }}>{error}</span>
            </div>
          )}

          {/* Google */}
          <button onClick={handleGoogleSignIn} type="button" style={{ width:"100%",padding:"13px 20px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:"#e2f5ee",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,transition:"all 0.2s",marginBottom:20 }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.10)"; (e.currentTarget as HTMLElement).style.transform="translateY(-1px)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.06)"; (e.currentTarget as HTMLElement).style.transform=""; }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:24 }}>
            <div style={{ flex:1,height:1,background:"rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.3)" }}>or sign in with email</span>
            <div style={{ flex:1,height:1,background:"rgba(255,255,255,0.08)" }} />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block",fontSize:"0.8rem",fontWeight:600,color:"rgba(255,255,255,0.55)",marginBottom:8,letterSpacing:"0.02em" }}>Email address</label>
              <div style={{ position:"relative" }}>
                <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="dilnoza@example.com" required style={inputStyle("email")} />
              </div>
            </div>

            <div style={{ marginBottom:10 }}>
              <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
                <label style={{ fontSize:"0.8rem",fontWeight:600,color:"rgba(255,255,255,0.55)",letterSpacing:"0.02em" }}>Password</label>
                <a href="#" style={{ fontSize:"0.78rem",color:"#34D399",textDecoration:"none" }}>Forgot password?</a>
              </div>
              <div style={{ position:"relative" }}>
                <Lock size={16} color="rgba(255,255,255,0.3)" style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} />
                <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} placeholder="••••••••" required style={{ ...inputStyle("password"),paddingRight:46 }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.35)",padding:0,display:"flex",alignItems:"center" }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:24,marginTop:16 }}>
              <input type="checkbox" id="remember" style={{ accentColor:"#10B981",cursor:"pointer" }} />
              <label htmlFor="remember" style={{ fontSize:"0.85rem",color:"rgba(255,255,255,0.45)",cursor:"pointer" }}>Keep me signed in</label>
            </div>

            <button type="submit" disabled={loading} style={{ position:"relative",width:"100%",padding:"14px 20px",borderRadius:12,background: loading ? "rgba(16,185,129,0.5)" : "linear-gradient(135deg,#10B981,#047857)",border:"none",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.98rem",fontWeight:700,cursor: loading ? "not-allowed" : "pointer",boxShadow:"0 8px 24px rgba(16,185,129,0.25)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.25s" }}
            onMouseEnter={e => { if(!loading){ (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 12px 32px rgba(16,185,129,0.4)"; } }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 24px rgba(16,185,129,0.25)"; }}>
              {loading ? (
                <><span style={{ width:16,height:16,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite" }} /> Signing in…</>
              ) : (
                <>Sign In <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          <p style={{ textAlign:"center",marginTop:28,fontSize:"0.875rem",color:"rgba(255,255,255,0.4)" }}>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" style={{ color:"#34D399",fontWeight:600,textDecoration:"none" }}>Sign up free →</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) { .auth-left-panel { display: none !important; } }
      `}</style>
    </div>
  );
}
