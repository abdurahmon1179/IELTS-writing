"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight, User, Check, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const planOptions = [
  { id:"free", name:"Free Starter", price:"Free", desc:"1 essay grading · 3-day roadmap", color:"rgba(255,255,255,0.08)", borderActive:"rgba(255,255,255,0.35)" },
  { id:"mastery", name:"Mastery Plan", price:"89,000 UZS", desc:"21-day bootcamp · Unlimited AI", color:"rgba(16,185,129,0.08)", borderActive:"rgba(16,185,129,0.55)", popular:true },
];

const benefits = [
  "AI essay grading in under 30 seconds",
  "Band 9.0 vocabulary suggestions",
  "Personalized 21-day writing bootcamp",
  "Task 1 & Task 2 templates included",
];

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("mastery");
  const [focused, setFocused] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [form, setForm] = useState({ name:"", email:"", password:"" });

  const supabase = createClient();

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) setError(error.message);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (step === 1) {
      if (!form.name.trim()) { setError("Ismingizni kiriting"); return; }
      if (!form.email.trim()) { setError("Email kiriting"); return; }
      if (form.password.length < 8) { setError("Parol kamida 8 ta belgi bo'lishi kerak"); return; }
      setStep(2);
      return;
    }

    // Step 2 — create account
    setLoading(true);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name, plan: selectedPlan },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (signUpError) {
      setError(
        signUpError.message.includes("already registered")
          ? "Bu email allaqachon ro'yxatdan o'tgan. Sign in sahifasiga o'ting."
          : signUpError.message
      );
      setLoading(false);
      return;
    }

    // Insert profile row
    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        email: form.email,
        full_name: form.name,
        plan: selectedPlan as "free" | "mastery",
        essays_graded: 0,
        is_active: true,
      });
    }

    setLoading(false);

    // If email confirmation disabled → session exists → go to dashboard
    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    } else {
      router.push("/sign-up/check-email?email=" + encodeURIComponent(form.email));
    }
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: "100%",
    padding: "13px 16px 13px 46px",
    borderRadius: 12,
    background: focused === name ? "rgba(16,185,129,0.06)" : "rgba(255,255,255,0.05)",
    border: `1px solid ${focused === name ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.10)"}`,
    color: "#e2f5ee", fontSize: "0.95rem",
    fontFamily: "'DM Sans', sans-serif",
    outline: "none", transition: "all 0.2s",
    boxShadow: focused === name ? "0 0 0 3px rgba(16,185,129,0.08)" : "none",
  });

  return (
    <div style={{ minHeight:"100vh", display:"flex", fontFamily:"'DM Sans', sans-serif" }}>

      {/* Left panel */}
      <div className="auth-left-panel" style={{ flex:"0 0 45%",background:"linear-gradient(160deg,#022c22 0%,#064E3B 55%,#022c22 100%)",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"48px",position:"relative",overflow:"hidden" }}>
        <div style={{ position:"absolute",top:"-150px",left:"-100px",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,0.13) 0%,transparent 70%)",filter:"blur(80px)",pointerEvents:"none",zIndex:0 }} />
        <div style={{ position:"absolute",bottom:"-80px",right:"-80px",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 70%)",filter:"blur(80px)",pointerEvents:"none",zIndex:0 }} />

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

        <div style={{ position:"relative",zIndex:1 }}>
          <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:800,letterSpacing:"-0.025em",lineHeight:1.2,marginBottom:8 }}>
            Join 12,000+ students<br/>
            <span style={{ background:"linear-gradient(135deg,#34D399,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>scoring Band 7+</span>
          </h2>
          <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.45)",marginBottom:36,lineHeight:1.7 }}>Start your free trial today. No credit card required.</p>
          <div style={{ display:"flex",flexDirection:"column",gap:14,marginBottom:40 }}>
            {benefits.map((b,i) => (
              <div key={i} style={{ display:"flex",alignItems:"center",gap:12 }}>
                <div style={{ width:24,height:24,borderRadius:"50%",background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <Check size={13} color="#34D399" />
                </div>
                <span style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.7)" }}>{b}</span>
              </div>
            ))}
          </div>
          <div style={{ background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:16,padding:"20px 22px",backdropFilter:"blur(12px)" }}>
            <div style={{ fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:12 }}>Average results after 21 days</div>
            <div style={{ display:"flex",gap:20 }}>
              {[{ label:"Band Score ↑",value:"+1.4" },{ label:"Vocab Range",value:"+65%" },{ label:"Grammar Fix",value:"92%" }].map((m,i) => (
                <div key={i}>
                  <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.8rem",fontWeight:700,color:"#34D399",lineHeight:1 }}>{m.value}</div>
                  <div style={{ fontSize:"0.72rem",color:"rgba(255,255,255,0.35)",marginTop:4 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ position:"relative",zIndex:1,display:"flex",flexWrap:"wrap",gap:10 }}>
          {["🔒 Secure Payment","🇺🇿 Made for Uzbekistan","✨ Cancel Anytime"].map(t => (
            <span key={t} style={{ background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:9999,padding:"5px 14px",fontSize:"0.75rem",color:"rgba(255,255,255,0.5)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1,display:"flex",alignItems:"center",justifyContent:"center",padding:"48px 40px",background:"#022c22",position:"relative" }}>
        <div style={{ position:"absolute",top:"20%",right:"-100px",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(16,185,129,0.06) 0%,transparent 70%)",filter:"blur(60px)",pointerEvents:"none" }} />

        <div style={{ width:"100%",maxWidth:440,position:"relative",zIndex:1 }}>

          {/* Step indicator */}
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:32 }}>
            {[1,2].map(s => (
              <div key={s} style={{ display:"flex",alignItems:"center",gap:8 }}>
                <div style={{ width:28,height:28,borderRadius:"50%",background: step >= s ? "linear-gradient(135deg,#10B981,#047857)" : "rgba(255,255,255,0.08)",border: step >= s ? "none" : "1px solid rgba(255,255,255,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.78rem",fontWeight:700,color: step >= s ? "#fff" : "rgba(255,255,255,0.3)",transition:"all 0.3s",boxShadow: step===s ? "0 0 12px rgba(16,185,129,0.3)" : "none" }}>
                  {step > s ? <Check size={14} /> : s}
                </div>
                <span style={{ fontSize:"0.78rem",fontWeight:600,color: step >= s ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.28)" }}>
                  {s===1 ? "Account" : "Choose Plan"}
                </span>
                {s < 2 && <div style={{ width:32,height:1,background: step>1 ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.1)",marginLeft:4 }} />}
              </div>
            ))}
          </div>

          {/* Heading */}
          <div style={{ marginBottom:28 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:6,background:"rgba(16,185,129,0.1)",border:"1px solid rgba(16,185,129,0.22)",borderRadius:9999,padding:"5px 14px",fontSize:"0.72rem",fontWeight:700,color:"#34D399",letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:16 }}>
              <span style={{ width:5,height:5,borderRadius:"50%",background:"#34D399" }} />
              {step===1 ? "Create Account" : "Select Your Plan"}
            </div>
            <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:800,letterSpacing:"-0.03em",lineHeight:1.2,marginBottom:6 }}>
              {step===1 ? (<>Start Your <span style={{ background:"linear-gradient(135deg,#34D399,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Free Trial</span></>) : (<>Pick Your <span style={{ background:"linear-gradient(135deg,#34D399,#F59E0B)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>Learning Plan</span></>)}
            </h1>
            <p style={{ fontSize:"0.875rem",color:"rgba(255,255,255,0.42)",lineHeight:1.65 }}>
              {step===1 ? "No credit card required. Start grading in 60 seconds." : "You can upgrade or downgrade at any time."}
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background:"rgba(248,113,113,0.08)",border:"1px solid rgba(248,113,113,0.25)",borderRadius:12,padding:"12px 16px",marginBottom:18,display:"flex",alignItems:"center",gap:10 }}>
              <AlertCircle size={16} color="#F87171" style={{ flexShrink:0 }} />
              <span style={{ fontSize:"0.875rem",color:"#F87171" }}>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step===1 ? (
              <div>
                {/* Google */}
                <button type="button" onClick={handleGoogleSignUp} style={{ width:"100%",padding:"13px 20px",borderRadius:12,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",color:"#e2f5ee",fontFamily:"'DM Sans',sans-serif",fontSize:"0.9rem",fontWeight:500,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10,transition:"all 0.2s",marginBottom:20 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.10)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background="rgba(255,255,255,0.06)"; }}>
                  <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Continue with Google
                </button>
                <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:20 }}>
                  <div style={{ flex:1,height:1,background:"rgba(255,255,255,0.08)" }} />
                  <span style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.3)" }}>or with email</span>
                  <div style={{ flex:1,height:1,background:"rgba(255,255,255,0.08)" }} />
                </div>

                {/* Name */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:"0.8rem",fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:7 }}>Full Name</label>
                  <div style={{ position:"relative" }}>
                    <User size={16} color="rgba(255,255,255,0.3)" style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} />
                    <input type="text" value={form.name} onChange={e => setForm({...form,name:e.target.value})} onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} placeholder="Dilnoza Toshmatova" required style={inputStyle("name")} />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:"block",fontSize:"0.8rem",fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:7 }}>Email Address</label>
                  <div style={{ position:"relative" }}>
                    <Mail size={16} color="rgba(255,255,255,0.3)" style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} />
                    <input type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="dilnoza@example.com" required style={inputStyle("email")} />
                  </div>
                </div>

                {/* Password */}
                <div style={{ marginBottom:20 }}>
                  <label style={{ display:"block",fontSize:"0.8rem",fontWeight:600,color:"rgba(255,255,255,0.5)",marginBottom:7 }}>Password</label>
                  <div style={{ position:"relative" }}>
                    <Lock size={16} color="rgba(255,255,255,0.3)" style={{ position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",pointerEvents:"none" }} />
                    <input type={showPassword ? "text" : "password"} value={form.password} onChange={e => setForm({...form,password:e.target.value})} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} placeholder="Min. 8 characters" required minLength={8} style={{ ...inputStyle("password"),paddingRight:46 }} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position:"absolute",right:14,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.35)",padding:0,display:"flex",alignItems:"center" }}>
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {form.password.length > 0 && (
                    <div style={{ marginTop:8,display:"flex",gap:4 }}>
                      {[...Array(4)].map((_,i) => (
                        <div key={i} style={{ flex:1,height:3,borderRadius:9999,background: form.password.length > i*2+1 ? i<1 ? "#F87171" : i<2 ? "#F59E0B" : "#34D399" : "rgba(255,255,255,0.08)",transition:"background 0.3s" }} />
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ display:"flex",alignItems:"flex-start",gap:8,marginBottom:22 }}>
                  <input type="checkbox" id="terms" required style={{ accentColor:"#10B981",cursor:"pointer",marginTop:3,flexShrink:0 }} />
                  <label htmlFor="terms" style={{ fontSize:"0.82rem",color:"rgba(255,255,255,0.4)",lineHeight:1.6,cursor:"pointer" }}>
                    I agree to the <a href="#" style={{ color:"#34D399",textDecoration:"none" }}>Terms of Service</a> and <a href="#" style={{ color:"#34D399",textDecoration:"none" }}>Privacy Policy</a>
                  </label>
                </div>

                <button type="submit" style={{ position:"relative",width:"100%",padding:"14px 20px",borderRadius:12,background:"linear-gradient(135deg,#10B981,#047857)",border:"none",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.98rem",fontWeight:700,cursor:"pointer",boxShadow:"0 8px 24px rgba(16,185,129,0.25)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.25s" }}>
                  Continue <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div>
                <div style={{ display:"flex",flexDirection:"column",gap:14,marginBottom:24 }}>
                  {planOptions.map(plan => (
                    <div key={plan.id} onClick={() => setSelectedPlan(plan.id)} style={{ position:"relative",padding:"20px 22px",borderRadius:16,background: selectedPlan===plan.id ? plan.color : "rgba(255,255,255,0.04)",border:`1px solid ${selectedPlan===plan.id ? plan.borderActive : "rgba(255,255,255,0.09)"}`,cursor:"pointer",transition:"all 0.2s",boxShadow: selectedPlan===plan.id && plan.id==="mastery" ? "0 0 30px rgba(16,185,129,0.1)" : "none" }}>
                      {plan.popular && <div style={{ position:"absolute",top:-10,right:16,background:"linear-gradient(135deg,#10B981,#047857)",color:"#fff",fontSize:"0.66rem",fontWeight:700,padding:"3px 12px",borderRadius:9999 }}>✦ Recommended</div>}
                      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between" }}>
                        <div style={{ display:"flex",alignItems:"center",gap:12 }}>
                          <div style={{ width:20,height:20,borderRadius:"50%",border: selectedPlan===plan.id ? "none" : "1px solid rgba(255,255,255,0.2)",background: selectedPlan===plan.id ? "linear-gradient(135deg,#10B981,#047857)" : "transparent",display:"flex",alignItems:"center",justifyContent:"center" }}>
                            {selectedPlan===plan.id && <div style={{ width:7,height:7,borderRadius:"50%",background:"#fff" }} />}
                          </div>
                          <div>
                            <div style={{ fontWeight:600,fontSize:"0.95rem",marginBottom:2 }}>{plan.name}</div>
                            <div style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.4)" }}>{plan.desc}</div>
                          </div>
                        </div>
                        <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.1rem",fontWeight:700,color: plan.id==="mastery" ? "#34D399" : "rgba(255,255,255,0.75)" }}>{plan.price}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedPlan==="mastery" && (
                  <div style={{ background:"rgba(16,185,129,0.07)",border:"1px solid rgba(16,185,129,0.18)",borderRadius:12,padding:"12px 16px",marginBottom:20,fontSize:"0.82rem",color:"rgba(255,255,255,0.55)",lineHeight:1.6 }}>
                    💳 Hisob yaratilgandan so&apos;ng <strong style={{ color:"rgba(255,255,255,0.8)" }}>Payme</strong> yoki <strong style={{ color:"rgba(255,255,255,0.8)" }}>Click</strong> orqali to&apos;lov qilasiz.
                  </div>
                )}

                <button type="submit" disabled={loading} style={{ width:"100%",padding:"14px 20px",borderRadius:12,background: loading ? "rgba(16,185,129,0.5)" : "linear-gradient(135deg,#10B981,#047857)",border:"none",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.98rem",fontWeight:700,cursor: loading ? "not-allowed" : "pointer",boxShadow:"0 8px 24px rgba(16,185,129,0.25)",display:"flex",alignItems:"center",justifyContent:"center",gap:8,transition:"all 0.25s" }}>
                  {loading ? (<><span style={{ width:16,height:16,border:"2px solid rgba(255,255,255,0.3)",borderTop:"2px solid #fff",borderRadius:"50%",display:"inline-block",animation:"spin 0.7s linear infinite" }} /> Creating account…</>) : (<>{selectedPlan==="mastery" ? "Start Mastery Plan" : "Create Free Account"} <ArrowRight size={16} /></>)}
                </button>

                <button type="button" onClick={() => { setStep(1); setError(null); }} style={{ width:"100%",marginTop:10,padding:"10px",background:"none",border:"none",color:"rgba(255,255,255,0.35)",fontFamily:"'DM Sans',sans-serif",fontSize:"0.85rem",cursor:"pointer" }}>
                  ← Back
                </button>
              </div>
            )}
          </form>

          <p style={{ textAlign:"center",marginTop:22,fontSize:"0.875rem",color:"rgba(255,255,255,0.38)" }}>
            Already have an account?{" "}
            <Link href="/sign-in" style={{ color:"#34D399",fontWeight:600,textDecoration:"none" }}>Sign in →</Link>
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
