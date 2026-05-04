"use client";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { LogOut, FileText, TrendingUp, Award, Sparkles } from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

interface Profile {
  full_name: string | null;
  email: string;
  plan: "free" | "mastery";
  essays_graded: number;
  band_score_start: number | null;
  band_score_current: number | null;
}

export default function DashboardClient({ user, profile }: { user: User; profile: Profile | null }) {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const name = profile?.full_name ?? user.email?.split("@")[0] ?? "Student";
  const plan = profile?.plan ?? "free";
  const essaysGraded = profile?.essays_graded ?? 0;

  return (
    <div style={{ minHeight:"100vh",background:"#022c22",fontFamily:"'DM Sans',sans-serif",color:"#e2f5ee" }}>
      {/* Topbar */}
      <header style={{ background:"rgba(2,44,34,0.8)",borderBottom:"1px solid rgba(255,255,255,0.07)",backdropFilter:"blur(20px)",padding:"0 max(24px,calc((100vw - 1200px)/2))",height:68,display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:50 }}>
        <Link href="/" style={{ display:"inline-flex",alignItems:"center",gap:10,textDecoration:"none" }}>
          <div style={{ width:34,height:34,borderRadius:10,background:"linear-gradient(135deg,#10B981,#047857)",display:"flex",alignItems:"center",justifyContent:"center" }}>
            <Sparkles size={16} color="#fff" />
          </div>
          <span style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.05rem",fontWeight:700,color:"#fff" }}>
            IELTS Writing <span style={{ color:"#34D399" }}>Master</span>
          </span>
        </Link>

        <div style={{ display:"flex",alignItems:"center",gap:14 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10,padding:"6px 14px",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:9999 }}>
            <div style={{ width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#34D399,#047857)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.78rem",fontWeight:700,color:"#fff" }}>
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize:"0.82rem",fontWeight:600,lineHeight:1.2 }}>{name}</div>
              <div style={{ fontSize:"0.68rem",color: plan==="mastery" ? "#34D399" : "rgba(255,255,255,0.35)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em" }}>
                {plan==="mastery" ? "✦ Mastery" : "Free"}
              </div>
            </div>
          </div>
          <button onClick={handleSignOut} style={{ display:"flex",alignItems:"center",gap:6,padding:"8px 14px",borderRadius:9999,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.09)",color:"rgba(255,255,255,0.55)",fontSize:"0.82rem",cursor:"pointer",transition:"all 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color="#F87171"; (e.currentTarget as HTMLElement).style.borderColor="rgba(248,113,113,0.3)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color="rgba(255,255,255,0.55)"; (e.currentTarget as HTMLElement).style.borderColor="rgba(255,255,255,0.09)"; }}>
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth:1200,margin:"0 auto",padding:"48px 24px" }}>
        {/* Welcome */}
        <div style={{ marginBottom:40 }}>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:800,lineHeight:1.2,marginBottom:8 }}>
            Xush kelibsiz, {name}! 👋
          </h1>
          <p style={{ color:"rgba(255,255,255,0.45)",fontSize:"0.95rem" }}>
            Bugun qaysi essayni tekshiramiz?
          </p>
        </div>

        {/* Stats cards */}
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16,marginBottom:40 }}>
          {[
            { icon:<FileText size={20} />,label:"Essays Graded",value:essaysGraded,color:"rgba(16,185,129,0.15)",border:"rgba(16,185,129,0.25)",iconColor:"#34D399" },
            { icon:<TrendingUp size={20} />,label:"Band Score",value: profile?.band_score_current ?? "—",color:"rgba(245,158,11,0.1)",border:"rgba(245,158,11,0.2)",iconColor:"#F59E0B" },
            { icon:<Award size={20} />,label:"Current Plan",value: plan==="mastery" ? "Mastery" : "Free",color:"rgba(129,140,248,0.1)",border:"rgba(129,140,248,0.2)",iconColor:"#818CF8" },
          ].map((s,i) => (
            <div key={i} style={{ background:s.color,border:`1px solid ${s.border}`,borderRadius:16,padding:"22px 24px",backdropFilter:"blur(10px)" }}>
              <div style={{ color:s.iconColor,marginBottom:12 }}>{s.icon}</div>
              <div style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.8rem",fontWeight:700,lineHeight:1,marginBottom:6 }}>{s.value}</div>
              <div style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.42)",fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background:"linear-gradient(135deg,rgba(6,78,59,0.5),rgba(4,120,87,0.25))",border:"1px solid rgba(16,185,129,0.2)",borderRadius:20,padding:"36px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:20 }}>
          <div>
            <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"1.5rem",fontWeight:700,marginBottom:8 }}>
              Essayingizni tekshiring
            </h2>
            <p style={{ color:"rgba(255,255,255,0.48)",fontSize:"0.9rem",maxWidth:420,lineHeight:1.65 }}>
              AI 30 soniyada band score beradi, grammatika xatolari va so&apos;z boyligi bo&apos;yicha batafsil tahlil qiladi.
            </p>
          </div>
          <button style={{ padding:"14px 32px",borderRadius:12,background:"linear-gradient(135deg,#10B981,#047857)",border:"none",color:"#fff",fontFamily:"'DM Sans',sans-serif",fontSize:"0.98rem",fontWeight:700,cursor:"pointer",boxShadow:"0 8px 24px rgba(16,185,129,0.3)",whiteSpace:"nowrap",transition:"all 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform="translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow="0 12px 32px rgba(16,185,129,0.45)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform=""; (e.currentTarget as HTMLElement).style.boxShadow="0 8px 24px rgba(16,185,129,0.3)"; }}>
            ✦ Essay Grading boshlash
          </button>
        </div>

        {/* Upgrade banner for free users */}
        {plan === "free" && (
          <div style={{ marginTop:20,background:"linear-gradient(135deg,rgba(245,158,11,0.08),rgba(252,211,77,0.04))",border:"1px solid rgba(245,158,11,0.2)",borderRadius:16,padding:"20px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16 }}>
            <div>
              <div style={{ fontWeight:600,marginBottom:4 }}>🚀 Mastery Planga o&apos;ting</div>
              <div style={{ fontSize:"0.85rem",color:"rgba(255,255,255,0.45)" }}>Cheksiz AI feedback, 21-kun bootcamp va Band 9.0 so&apos;z boyligi — barchasi 89,000 UZS/oy</div>
            </div>
            <Link href="/pricing" style={{ padding:"10px 22px",borderRadius:10,background:"linear-gradient(135deg,#F59E0B,#D97706)",color:"#fff",textDecoration:"none",fontWeight:700,fontSize:"0.875rem",whiteSpace:"nowrap" }}>
              Upgrade qilish →
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
